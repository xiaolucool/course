import {post,get} from '@/utils/request'

//  登录接口
export const login =(data: object) => {
    return post('/course/refresh', data)
}
// 获取课程列表
export const getCourseList =(data: object) => {
    return post('/course', data)
}

// 获取上次刷新时间
export const getLastRequestTime =(data: object) => {
    return post('/course/time', data)
}


// 获取登录信息
export const getLoginInfo =(data:string) => {
    return get(`/my/getUserInfo?username=${data}`)
}

// 获取用户列表信息
export const getUserList =(page:number=1,pageSize:number=5,roleId:number=0) => {
    return get(`/my/userList?page=${page}&pageSize=${pageSize}&roleId=${roleId}`)
}

// 删除用户信息
export const delUser=(id:number)=>{
    return get(`/my/deleteUser?id=${id}`)
}

// 新增用户信息
export const addUser=(data:object)=>{
    return post('/my/addUser',data)
}

// 编辑用户信息
export const editUser=(data:object)=>{
    return post('/my/editUser',data)
}