<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
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
