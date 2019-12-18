

module.exports = (query, request) => {
  const data = {
    encodeType: query.encodeType,
    ids: '[' + query.ids + ']',
    level: query.level
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/song/enhance/player/url/v1`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/song/enhance/player/url/v1'
    }
  )
}