// 举报

module.exports = (query, request) => {
  query.type = {
    0: 'R_SO_4_',   //  歌曲
    1: 'R_MV_5_',   //  MV
    2: 'A_PL_0_',   //  歌单
    3: 'R_AL_3_',   //  专辑
    4: 'A_DJ_1_',   //  电台
    5: 'R_VI_62_',  //  视频
    6: 'A_EV_2_'    //  动态
  }[query.type]

  const data = {
    commentId: query.id,
    reason: query.reason,
    threadId: query.type + query.cid,
    type: '-1'
  }

  console.log(data)

  return request(
    'POST', `http://interface3.music.163.com/eapi/report/reportcomment`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/report/reportcomment'
    }
  )
}
