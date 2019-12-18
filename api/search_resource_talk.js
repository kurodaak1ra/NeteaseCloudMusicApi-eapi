// 搜索 云村 主题

module.exports = (query, request) => {
  const data = {
    keyword: query.keywords
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/search/resource/talk`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: `/api/search/resource/talk`
    }
  )
}