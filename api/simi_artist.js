// 相似歌手

module.exports = (query, request) => {
  const data = {
    artistid: query.id
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/discovery/simiArtist`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/discovery/simiArtist'
    }
  )
}
