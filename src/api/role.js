import request from '@/utils/request'

// 角色列表
export function getRoleList(query) {
  return request.get('/roles' + query)
}

// 修改角色
export function updateRole(role) {
  return request.post('/roles/' + role.id, role)
}

// 新增角色
export function addRole(role) {
  return request.post('/roles', role)
}

// 删除角色
export function deleteRole(id) {
  return request.delete('/roles/' + id)
}
