// 艺术家专辑

module.exports = (query, request) => {
  const data = {
    limit: query.limit,
    offset: query.offset
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/artist/albums/${query.id}`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: `/api/artist/albums/${query.id}`
    }
  )
}