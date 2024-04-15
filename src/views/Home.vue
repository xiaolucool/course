<template>
    <div class="home">
        <!-- 标题 -->
        <van-nav-bar title="课表" />
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>test1</van-swipe-item>
            <van-swipe-item>test2</van-swipe-item>
            <van-swipe-item>test3</van-swipe-item>
            <van-swipe-item>test4</van-swipe-item>
        </van-swipe>
        <!-- 通知 -->
        <van-notice-bar class="notice-bar" left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />
        <!-- 业务宫格 -->
        <div class="my-grid">
            <van-cell title="快捷服务" />
            <van-grid :column-num="3">
                <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="业务" />
            </van-grid>
        </div>
        <!-- 今日课程 -->
        <van-cell-group>
            <van-cell :title="`你好：张三 共2节课`" :value="`${dayTime}`" />
            <van-cell title="上午课程" value="内容" label="描述信息" />
            <van-cell title="下午课程" value="内容" label="描述信息" />
        </van-cell-group>

    </div>
</template>

<script setup lang="ts">
import dayTime from '@/utils/day'

</script>

<style scoped lang="scss">
.home {
    background-color: #f5f5f5;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

.my-swipe, .my-grid, .notice-bar {
    margin: 5px;
    border-radius: 5px;
}
</style>