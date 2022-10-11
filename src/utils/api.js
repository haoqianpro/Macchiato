function getFundData(fundCode) {
  const script = document.createElement('script')
  script.src = `http://fundgz.1234567.com.cn/js/${fundCode}.js?rt=1463558676006`
  document.head.append(script)
}

for (let i = 0; i < 50; i++) {
  getFundData(r[i][0])
}
