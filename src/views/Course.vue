<script setup lang="ts">
import kb from '@/components/kb.vue'
import type { CourseModel } from '@/stores/course'
import { ref, type Ref } from 'vue'
import { weekTitle } from '@/stores/course' // 格式化周
import { getCourseList, getLastRequestTime, login } from '@/api/course'
import { showSuccessToast, showFailToast, showConfirmDialog } from 'vant'
import { startLoading, endLoading } from '@/utils/loading'

export interface User {
    id: string,
    passwd: string
}

let show = ref(false)
let cItem = ref<CourseModel>() as Ref<CourseModel>
let lastTime = ref('') // 上次刷新时间
let showRefresh = ref(false)

const handleShowActionSheet = (courseItem: CourseModel) => {
    show.value = true
    cItem.value = courseItem
    console.log('handleShowActionSheet', cItem.value);
}

// 获取上次刷新时间
const lastRequestTime = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    try {
        const time = await getLastRequestTime({
            id: user.id,
            passwd: user.passwd
        })
        lastTime.value = time
        handleAction(user)
        console.log('lastRequestTime', lastTime.value);
    } catch (error) {
        showRefresh.value = !showRefresh.value
        showFailToast('获取上次刷新时间失败')
    }

}

// 选择窗口
const handleAction = (user: User) => {
    showConfirmDialog({
        title: '刷新课表',
        message: `上次刷新：${lastTime.value}`,
    })
        .then(() => {
            startLoading('课表刷新')
            onLogin(user)
            console.log('confirm')
        })
        .catch(() => {
            endLoading()
            showRefresh.value = !showRefresh.value
            console.log('cancel')
        })
}

// 登录爬取
const onLogin = async (user: User) => {
    try {
        await login({
            id: user.id,
            passwd: user.passwd
        })
        getCourse(user)
    } catch (error) {
        endLoading()
        console.log('登录失败')
        showRefresh.value = !showRefresh.value
        showFailToast('登录失败')
    }
}

// 更新本地缓存
const getCourse = async (user: User) => {
    console.log('更新课表')
    try {
        const list = await getCourseList({
            id: user.id,
            passwd: user.passwd
        })
        endLoading()
        console.log('课表更新成功')
        localStorage.setItem('courses', JSON.stringify(list))
        showSuccessToast('课表更新成功')
    } catch (error) {
        endLoading()
        console.log('课表更新失败');
        showRefresh.value = !showRefresh.value
        console.log('课表更新失败')
        showFailToast('课表更新失败')
    }
}

// 课表刷新
const refresh = async () => {
    showRefresh.value = !showRefresh.value
    lastRequestTime()
    endLoading()
}
</script>

<template>
    <div>
        <kb :showRefresh="showRefresh" @course-item-click="handleShowActionSheet" @refresh="refresh" />
        <!-- 弹出层 -->
        <van-popup v-model:show="show" closeable close-icon="close" position="bottom" :style="{ height: '30%' }">
            <van-cell-group>
                <van-cell title="课程详情" />
                <div class="item">
                    <div class="item-key">
                        <div class="item-key-name"
                            :style="[`background-color: ${cItem.color}`, `color: ${cItem.color}`]">&nbsp;</div>
                    </div>
                    <div class="item.value">{{ cItem.title }}</div>
                </div>
                <div class="item">
                    <div class="item-key"><van-icon name="location-o" /></div>
                    <div class="item.value">{{ cItem.location }}</div>
                </div>
                <div class="item">
                    <div class="item-key"><van-icon name="clock-o" /></div>
                    <div class="item.value">星期{{ weekTitle[cItem.week - 1] }} 第{{ cItem.start }} - {{ cItem.duration }}节
                    </div>
                </div>
            </van-cell-group>
        </van-popup>
        <!--  -->
    </div>
</template>

<style scoped lang="scss">
.item {
    padding: 10px;
    display: flex;
    // justify-content: space-between;
    align-items: center;

    .item-key {
        height: 25px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.item-key-name {
    width: 5px;
    height: 100%;
    border-radius: 10px;
}
</style>