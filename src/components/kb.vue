<template>
  <header>
    <van-sticky :offset-top="0">
      <!-- <div class="top">{{ `第${store.currentWeekIndex + 1}周${!store.isStart ? '(未开学)' : ''}` }}</div> -->
      <van-nav-bar>
        <template #title>
          <div>第{{ store.currentWeekIndex + 1 }}周{{ !store.isStart ? '(未开学)' : '' }}</div>
        </template>
        <template #right>
          <!-- <van-icon name="search" size="18" /> -->
          <van-icon v-if="!showRefresh" @click="emit('refresh')" name="replay" size="18" />
          <van-icon v-else class="turn" name="replay" size="18" />
        </template>
      </van-nav-bar>
      <div class="week">
        <div class="month">{{ month }}月</div>
        <div class="day" v-for="(item, index) in currentWeekDayArray" :key="index"
          :style="[`color: ${isCurrentWeek(index) ? '#000' : ''}`, `background-color: ${isCurrentWeek(index) ? '#EFEFEF' : ''}`]">
          <div class="day-week">{{ weekTitle[index] }}</div>
          <div class="day-time">{{ item }}</div>
        </div>
      </div>
    </van-sticky>
  </header>
  <main @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <!-- 时间 -->
    <template v-for="(courseTime, courseIndex) in courseTimeList" :key="courseIndex">
      <div class="course-time">
        <div class="font-medium">
          {{ courseIndex + 1 }}
        </div>
        <div class="time">
          {{ courseTime.s }}<br>{{ courseTime.e }}
        </div>
      </div>
    </template>
    <!-- 课表 -->
    <template v-for="(courseItem, _courseIndex) of deleteWeekCourse" :key="_courseIndex">
      <div class="course-item"
        :style="[getCoursePosition(courseItem), `background-color:${store.hasConflictCourseByMap(courseItem)[0].color}`]"
        @click="emit('courseItemClick', courseItem)">
        <div>
          <div class="course-title">
            {{ store.hasConflictCourseByMap(courseItem)[0].title }}
          </div>
          <div class="break-all">
            <!-- <div class="text-8px i-carbon-location-current" /> -->
            {{ store.hasConflictCourseByMap(courseItem)[0].location }}
          </div>
          <div v-if="store.hasConflictCourseByMap(courseItem).length > 1" />
        </div>
      </div>
    </template>
  </main>
  <!-- 返回按钮 -->
  <div class="floating-bubble" v-if="store.currentWeekIndex !== store.originalWeekIndex"
    @click="store.setCurrentWeekIndex(store.originalWeekIndex)"><van-icon name="revoke" size="18" /></div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCourseStore, courseTimeList } from '../stores/course'
import { weekTitle } from '../stores/course' // 引入周数对于中文数字 
import type { CourseModel } from '../stores/course'
import courses from '../utils/courses' // 课表数据
const weeks = ref([])
weeks.value = []

const { showRefresh } = defineProps(['showRefresh'])
const store = useCourseStore()
// 设置开学时间
const someDate = new Date('2024-02-19');
someDate.getTime();
store.setStartDay(someDate)
// 当前月份
const month = store.currentMonth
// 获取星期对应日期
const currentWeekDayArray = store.currentWeekDayArray

const emit = defineEmits(['courseItemClick', 'refresh'])

// 格式化课表
store.setCourseList(courses as CourseModel[])

/**
 * get course position
 * @param item course item
 * @returns css style
 */
function getCoursePosition(item: CourseModel) {
  return {
    'grid-row': `${item.start} / ${item.start + item.duration}`,
    'grid-column': `${item.week + 1} / ${item.week + 1 + 1}`,
  }
}

//同时删除课程
const deleteWeekCourse = computed(() => {
  const weekCourse: CourseModel[] = Array.from(store.weekCourseList)
  if (weekCourse.length <= 1)
    return weekCourse
  for (let i = 1; i < weekCourse.length; i++) {
    const { start, week } = weekCourse[i]
    const { start: prevStart, week: prevWeek } = weekCourse[i - 1]
    if (start === prevStart && week === prevWeek) {
      weekCourse.splice(i, 1)
      i--
    }
  }
  return weekCourse
})
/**
 * 获取当前周
 * @param weekIndex 周索引
 */
const isCurrentWeek = (weekIndex: number) => {
  if (!store.isStart)
    return false
  // if (!store.originalWeekIndex || !store.currentWeekIndex || !store.originalWeekWeekIndex)
  if (!store.originalWeekIndex || !store.currentWeekIndex)
    return false
  return store.originalWeekIndex === store.currentWeekIndex && store.originalWeekWeekIndex === weekIndex
}


const startX = ref(0)
const startY = ref(0)
const towardsX = ref(0)
const towardsY = ref(0)

function resetTouchStatus() {
  startX.value = 0
  startY.value = 0
  towardsX.value = 0
  towardsY.value = 0
}

function handleTouchStart(e: TouchEvent) {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
}

function handleTouchMove(e: TouchEvent) {
  towardsX.value = e.touches[0].clientX - startX.value
  towardsY.value = e.touches[0].clientY - startY.value
}

function handleTouchEnd() {
  let currentWeekIndexTemp = store.currentWeekIndex
  if (towardsX.value === 0 || Math.abs(towardsY.value) > 50)
    return
  if (towardsX.value > 50) {
    if (currentWeekIndexTemp === 0)
      return
    currentWeekIndexTemp--
  }
  else if (towardsX.value < -50) {
    if (currentWeekIndexTemp === store.weekNum - 1)
      return
    currentWeekIndexTemp++
  }
  store.setCurrentWeekIndex(currentWeekIndexTemp)
  resetTouchStatus()
}

</script>

<style scoped>
header {
  .top {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .week {
    /* border-bottom: 1px solid #eee; */
    background: white;
    font-size: 14px;
    display: grid;
    grid-template-columns: 0.7fr repeat(7, 1fr);
    grid-gap: 0.25rem;
    gap: 0.25rem;
    color: #999;

    .month {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &>div {
      flex: 1;
    }

    .day {
      text-align: center;
      border: 1px solid #eee;
      border-radius: 5px;
    }
  }
}

main {
  /* min-height: 90vh; */
  margin-top: 5px;
  display: grid;
  grid-gap: 0.25rem;
  gap: 0.25rem;
  grid-auto-flow: column;
  grid-template-columns: 0.7fr repeat(7, 1fr);
  grid-template-rows: repeat(13, minmax(0, 1fr));
  margin-bottom: 10vh;

  .course-time {
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 12px;

    .time {
      font-size: 12px;
      color: #999;
    }
  }
}

.break-all,
.course-title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.course-item {
  border-radius: 5px;
  color: white;
}

/* 浮动按钮 */
.floating-bubble {
  background: #1989fa;
  color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: fixed;
  /* left: 0; */
  /* top: 0; */
  bottom: 20vh;
  right: 10px;
  /* transform: translate3d(303px, 500px, 0px); */
}
.turn {
  animation: turn 1s linear infinite;
}
@keyframes turn {
    0% {
        transform: rotate(0deg);
    }

    20% {
        transform: rotate(72deg);
    }

    40% {
        transform: rotate(144deg);
    }

    60% {
        transform: rotate(216deg);
    }

    80% {
        transform: rotate(288deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>