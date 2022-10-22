import request from '@/utils/request'

export async function getRoleList() {
  return await request.get('/roles')
}
