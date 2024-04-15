import { showLoadingToast, closeToast } from 'vant'

let showLoading = false // 是否显示loading
let second = 0 // 计时
const endLoading = () => {
    showLoading = false
}
const startLoading = (title: string) => {
    const toast = showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: `${title} 0 秒`,
    })
    showLoading = true
    toast.message = `${title} 0 秒`;
    second = 0
    const timer = setInterval(() => {
        second++
        if (showLoading) {
            toast.message = `${title} ${second} 秒`;
        } else {
            clearInterval(timer)
            closeToast()
        }
    }, 1000);
}

export { startLoading, endLoading }
