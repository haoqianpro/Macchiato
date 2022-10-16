import axios from 'axios'

export async function getOnsInfo() {
  const res = await axios.get(
    'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'
  )
  return res.data
}

export async function getLine() {
  const res = await axios.get(
    'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayListNew,chinaDayAddListNew&limit=30'
  )
  return res.data
}
