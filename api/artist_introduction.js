// 歌手介绍

module.exports = (query, request) => {
  const data = {
    id: query.id
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/artist/introduction`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/artist/introduction'
    }
  )
}
