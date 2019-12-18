// 歌单详情

module.exports = (query, request) => {
  const data = {
    id: query.id,
    s: query.s || 5,
    n: 1000,
    t: 0
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/v6/playlist/detail`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/v6/playlist/detail'
    }
  )
}
