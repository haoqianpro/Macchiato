import request from '@/utils/request'

export async function login(username, password) {
  const res = await request.post('/login', { username, password })
  return res.data
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
export function deleteUser(id) {
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
