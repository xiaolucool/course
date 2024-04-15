<template>
    <div class="login">
        <van-nav-bar title="登录" />
        <van-notice-bar class="notice-bar" mode="closeable">
            请输入12位教务系统账号，和正确密码
        </van-notice-bar>

        <van-form class="login-form" @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="id" name="id" label="用户名" placeholder="用户名"
                    :rules="[{ pattern, message: '请输入正确内容' }]" />
                <van-field v-model="passwd" type="password" name="passpwd" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login, getCourseList } from '@/api/course'
import { showSuccessToast, showFailToast, showLoadingToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const id = ref('')
const passwd = ref('')
const pattern = /\d{6}/;
const onSubmit = async (values: object) => {
    showLoadingToast({
        message: '登录中...',
        forbidClick: true,
    })
    getLogin()
}
// 登录
const getLogin = async () => {
    try {
        localStorage.setItem('user', JSON.stringify({
            id: id.value,
            passwd: passwd.value
        }))
        await login({
            id: id.value,
            passwd: passwd.value
        })
        getCourse()
        showSuccessToast('登录成功')
    } catch (error) {
        showFailToast('登录失败')
    }

}
// 更新课表
const getCourse = async () => {
    console.log('更新课表');
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    try {
        const list = await getCourseList({
            id: user.id,
            passwd: user.passwd
        })
        localStorage.setItem('courses', JSON.stringify(list))
        showSuccessToast('课表获取成功')
        router.push('/course')
    } catch (error) {
        showFailToast('课表获取失败')
    }
}


</script>

<style scoped lang="scss">
.login {
    background-color: #f5f5f5;
    height: 100vh;
}

.login-form,
.notice-bar {
    margin: 5px;
    border-radius: 5px;
}

.login-form {
    background: white;
    padding-bottom: 10px;
}
</style>