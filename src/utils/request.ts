import axios from 'axios'
// import router from '../router'
// import { ElMessage } from 'element-plus'
// import { userStore } from '../store'
// import {baseURL_dev} from '../config/baseURL.ts'

//初始化一个axios对象
const instance = axios.create({
    baseURL: '/api',
    timeout: 60000
});
// TODO 2. 携带token
// const useStore = userStore()
const token = localStorage.getItem('token')
// 请求拦截器
instance.interceptors.request.use(
    (config) => {

      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    (err) => Promise.reject(err)
  )
  
  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      if(res.data.code === 401){
      //   useStore.removeToken()
      //   useStore.removeUser()
      //   ElMessage.error('登录Token过期，请重新登录')
      //   router.push('/login')
      }
      return res
    },
    (err) => {
      console.log(err);
      
      // TODO 5. 处理401错误
      // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
      if (err.response.status === 401) {
        
      //   router.push('/login')
      }
  
      // 错误的默认情况 => 只要给提示
      // ElMessage.error(err.response.data.message || '服务异常')
      return Promise.reject(err)
    }
  )

//get 请求
export const get=async (url:string,params:object={})=>{
    let  {data} = await  instance.get(url,params)
    return data
}
//post 请求
export const post=async (url:string,params:object={})=>{
    let  {data} = await  instance.post(url,params)
    return data
}
