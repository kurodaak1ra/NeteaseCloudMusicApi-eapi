// 歌单广场主数据

module.exports = (query, request) => {
  const data = {
    count: query.count || 1,
    songId: query.sid,
    playlistId: query.pid,
    startMusicId: query.mid,
    type: 'fromPlayAll' || 'fromPlayOne'
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/playmode/intelligence/list`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/playmode/intelligence/list'
    }
  )
}
