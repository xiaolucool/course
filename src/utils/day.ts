let date = new Date()

// 获取时间：时分秒
// const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
// const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
// const secound = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
// this.datetime = hour + ':' + minute + ':' + secound

// 获取日期：年月日
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const nowDate = month + "月" + day + "日"
const nowYear = year + "年"

// 获取星期几
const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
const nowWeek = weeks[new Date().getDay()];

const dayTime: string = nowYear + nowDate + " " + nowWeek

export default dayTime 
