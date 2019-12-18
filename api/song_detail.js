// 歌曲详情

module.exports = (query, request) => {
  query.ids = query.ids.split(/\s*,\s*/)
  const data = {
    c: '[' + query.ids.map(id => ('{"id":' + id + '}')).join(',') + ']',
    ids: '[' + query.ids.join(',') + ']'
  }
  return request(
    'POST', `https://music.163.com/weapi/v3/song/detail`, data,
    {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
  )
}

// module.exports = (query, request) => {
//   query.ids = query.ids.split(/\s*,\s*/)
//   const data = {
//     c: '[' + query.ids.map(id => ('{"id":' + id + ',"v":0}')).join(',') + ']'
//   }
//   return request(
//     'POST', `http://interface3.music.163.com/eapi/v3/song/detail`, data,
//     {
//       crypto: 'eapi',
//       cookie: query.cookie,
//       proxy: query.proxy,
//       url: '/api/v3/song/detail'
//     }
//   )
// }