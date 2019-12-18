// 歌词

module.exports = (query, request) => {
  const data={
    id:query.id,
    kv: 0,
    lv: 10,
    tv: 0
  }
  return request(
    'POST', `http://interface3.music.163.com/eapi/song/lyric`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/song/lyric'
    }
  )
}