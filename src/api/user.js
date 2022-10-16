import request from '@/utils/request'

export async function login(username, password) {
  const res = await request.post('/login', { username, password })
  return res.data
}
