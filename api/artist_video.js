// 歌手相关MV

module.exports = (query, request) => {
  const data = {
    artistId: query.id,
    limit: query.limit || 10,
    offset: query.offset || 0
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/artist/video`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/artist/video'
    }
  )
}