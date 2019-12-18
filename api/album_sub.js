// 已收藏专辑列表

module.exports = (query, request) => {
  const data = {
    id: query.id
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/album/${query.t == 1 ? 'sub' : 'unsub'}`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: `/api/album/${query.t == 1 ? 'sub' : 'unsub'}`
    }
  )
}
