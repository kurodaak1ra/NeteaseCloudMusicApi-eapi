// 获取用户大学

module.exports = (query, request) => {
  const data = {
    userId: query.uid
  }
  
  return request(
    'POST', `http://interface3.music.163.com/eapi/college/usercollege/get`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/college/usercollege/get'
    }
  )
}
