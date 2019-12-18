// 搜索建议

// module.exports = (query, request) => {
//   const data = {
//     s: query.keywords || ''
//   }
//   let type = query.type == 'mobile' ? 'keyword' : 'web'
//   return request(
//     'POST', `https://music.163.com/weapi/search/suggest/` + type, data,
//     { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
//   )
// }

module.exports = (query, request) => {
  const data = {
    // lastKeyword: '只因你太美',
    lastTime: 0,
    limit: query.limit,
    type: query.type,
    s: query.keywords
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/search/suggest/keyword`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/search/suggest/keyword'
    }
  )
}
