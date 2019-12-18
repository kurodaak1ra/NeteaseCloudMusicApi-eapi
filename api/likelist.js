// 喜欢的歌曲(无序)

// module.exports = (query, request) => {
//   const data = {
//     uid: query.uid
//   }
//   return request(
//     'POST', `https://music.163.com/weapi/song/like/get`, data,
//     {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
//   )
// }

module.exports = (query, request) => {
  return request(
    'POST', `http://interface3.music.163.com/eapi/song/like/get`, {},
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/song/like/get'
    }
  )
}