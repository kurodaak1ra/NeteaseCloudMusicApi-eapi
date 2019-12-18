// 已收藏专辑列表

module.exports = (query, request) => {
  const data = {
    limit: query.limit || 25,
    offset: query.offset || 0,
    total: true
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/album/sublist`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/album/sublist'
    }
  )
}