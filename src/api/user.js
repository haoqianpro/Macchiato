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
