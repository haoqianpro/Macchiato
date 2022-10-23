import request from '@/utils/request'

export async function login(phone, password) {
  return await request.post('/login', { phone, password })
}

export async function getUserList() {
  return await request.get('/users')
}

export async function updateUser(user) {
  return await request.post('/users/' + user.id, user)
}

export async function createUser(user) {
  return await request.post('/users', user)
}

export async function deleteUser(id) {
  return await request.delete('/users/' + id)
}
// 获取用户信息列表
export function getUserInfo(params) {
  return request({
    url: 'http://47.107.179.145:3389/users',
    method: 'get',
    params
  })
}
// 获取角色列表
export function getRole() {
  return request({
    url: 'http://47.107.179.145:3389/roles',
    method: 'get'
  })
}
// 新增用户
export function addUser(data) {
  return request({
    url: 'http://47.107.179.145:3389/users',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteUserInfo(id) {
  return request({
    url: `http://47.107.179.145:3389/users/${id}`,
    method: 'delete'
  })
}
// 编辑用户
export function editUser(data) {
  return request({
    url: `http://47.107.179.145:3389/users/${data.id}`,
    method: 'post',
    data
  })
}
