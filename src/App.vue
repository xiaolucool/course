<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { getCourseList } from '@/api/course'
import { showFailToast, showSuccessToast } from 'vant'

const router = useRouter()
const path = ref('')
onMounted(() => {
  // 初始化时获取当前路由
  path.value = router.currentRoute.value.path
  // 监听路由变化
  watchEffect(() => {
    path.value = router.currentRoute.value.path
  })
})

// 更新本地缓存
const getCourse = async () => {
  const courses = JSON.parse(localStorage.getItem('courses') || '{}')
  if (courses) {
  } else {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    console.log('更新课表')
    try {
      const list = await getCourseList({
        id: user.id,
        passwd: user.passwd
      })
      localStorage.setItem('courses', JSON.stringify(list))
      showSuccessToast('课表更新成功')
    } catch (error) {
      showFailToast('课表更新失败')
    }
  }
}
getCourse()

const active = ref(0);

</script>
<template>
  <div>
    <RouterView />
    <van-tabbar v-if="path != '/login'" v-model="active" active-color="#ee0a24" route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/course" icon="calendar-o">课表</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<style scoped></style>
