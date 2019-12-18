// 搜索 云村 mlog

module.exports = (query, request) => {
  const data = {
    keyword: query.keywords,
    limit: query.limit,
    offset: query.offset
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/search/resource/mlog`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: `/api/search/resource/mlog`
    }
  )
}