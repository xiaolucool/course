<template>
    <div class="user">
        <!-- 标题 -->
        <van-nav-bar title="个人信息" />
        <van-cell-group class="user-info">
            <van-cell :title="userInfo.BJMC" />
            <van-cell :title="userInfo.XH" :label="userInfo.XM" />
        </van-cell-group>
        <van-cell-group class="box">
            <van-cell title="Test" />
            <van-cell title="Test" label="xxxxxxx" />
            <van-cell title="Test" label="xxxxxxx" />
            <van-cell title="Test" label="xxxxxxx" />
            <van-cell title="Test" label="xxxxxxx" />
        </van-cell-group>
        <div class="btn">
            <van-button @click="logout" color="linear-gradient(to right, #ff6034, #ee0a24)" block>退出登录</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const router = useRouter()

export interface UserInfo {
    BJMC: string,
    XNMC: string,
    KXKXXQ: string,
    XKKGXQ: string,
    XKKG: string,
    XH_ID: string,
    XH: string,
    XQMMC: string,
    JFZT: 0,
    XM: string,
    XQM: string,
    XNM: string,
    KCMS: number
}
let userInfo = ref<UserInfo>() as Ref<UserInfo>
const getUserInfo = () => {
    const { xsxx } = JSON.parse(localStorage.getItem('courses') || '[]')
    userInfo.value = xsxx
}
getUserInfo()

// 退出登录
const logout = () => {
    handleAction()
}
// 选择窗口
const handleAction = () => {
    showConfirmDialog({
        title: '退出登录',
        message: '退出登录将清空所有数据',
    })
        .then(() => {
            localStorage.removeItem('courses')
            localStorage.removeItem('user')
            router.push('/login')
        })
        .catch(() => {
        })
}
</script>

<style scoped lang="scss">
.user {
    background-color: #f5f5f5;
    height: 100vh;
}

.user-info,
.box,
.btn {
    margin: 5px;
    border-radius: 5px;
}
</style>