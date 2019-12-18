// 获取歌手前五十首

module.exports = (query, request) => {
  const data = {
    id: query.id,
    order: 'hot',
    top: query.limit,
    work_type: '-1'
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/artist/top/song`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/artist/top/song'
    }
  )
}