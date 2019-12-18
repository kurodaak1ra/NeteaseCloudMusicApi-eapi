// batch api

module.exports = (query, request) => {
  if (!query.hasOwnProperty('batch')) return request( '', '', {}, {} )
  const batch = query.batch.split(/\s*,\s*/)

  // banner 请求参数
  // const bannerParas = {
  //   adextjson: {
  //     op: 3,
  //     pid: 4002,
  //     network: 1,
  //     dev_type: 1,
  //     terminal: 'G8142',
  //     manufacturer: 'Sony',
  //     imei: '357008081954846',
  //     adReqId: '317557977_1564732445670_4615',
  //     android_id: 'MzU3MDA4MDgxOTU0ODQ2CTAyOjAwOjAwOjAwOjAwOjAwCTQwNjIwMWM2OWU5MDg1ZDIJQ0I1MTJFRVlVUw%3D%3D',
  //     newAgent: 'Mozilla/5.0 (Linux; Android 9; G8142 Build/47.2.A.10.80; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 NeteaseMusic/6.2.5.1562739387',
  //     resolution: { width: 1080, height: 1798 },
  //     lbs: { latitude: '4.9E-324', longitude: '4.9E-324' }
  //   },
  //   carrier: 'unicom',
  //   clientType: 'android',
  //   withProgramInfo: true
  // }

  query.type = {
    0: 'R_SO_4_',   //  歌曲
    1: 'R_MV_5_',   //  MV
    2: 'A_PL_0_',   //  歌单
    3: 'R_AL_3_',   //  专辑
    4: 'A_DJ_1_',   //  电台
    5: 'R_VI_62_',  //  视频
    6: 'A_EV_2_'    //  动态
  }[query.type]

  // API
  const dataObj = {
    // my-collect
    'subcount-all': {url: '/api/subcount/all', paras: ''},                                                                    // 我的收藏 -> 收藏统计
    'album-sublist': {url: '/api/album/sublist', paras: `{'limit':${query.limit},'offset':${query.offset}}`},                 // 专辑
    'artist-sublist': {url: '/api/artist/sublist', paras: `{'limit':${query.limit},'offset':${query.offset}}`},               // 艺术家
    'video-sublist': {url: '/api/cloudvideo/allvideo/sublist', paras: `{'limit':${query.limit},'offset':${query.offset}}`},   // 视频
    'topic-sublist': {url: '/api/topic/sublist', paras: `{'limit':${query.limit},'offset':${query.offset}}`},                 // 专栏
    'topic-hot': {url: '/api/topic/hot', paras: `{'limit':3,'offset':0}`},                                                    // 专栏推荐
    'mlog-mylike-bytime': {url: '/api/mlog/mylike/bytime/get', paras: `{'limit':500,'time':-1}`},                             // Mlog
    'mlog-talk-myfollows': {url: '/api/mlog/talk/myfollows/get', paras: `{'limit':3,'time':-1}`},                             // Mlog
    // mine
    'subcount-v1': {url: '/api/subcount/v1', paras: ''},                                                                            // 我的 -> 收藏统计
    'user-playlist': {url: '/api/user/playlist', paras: `{'limit':${query.limit},'offset':${query.offset},'uid':${query.uid}}`},    // 用户歌单
    // artist
    // 'artist-albums': {url: `/api/artist/albums/${query.arid}`, paras: `{'limit':'1','offset':'0','order':'time'}`},
    // 'artist-detail-dynam00ic': {url: '/api/artist/detail/dynamic', paras: `{'id':'${query.arid}','type':'artist'}`},                  // 艺术家动态
    'artist-follow-count': {url: '/api/artist/follow/count/get', paras: `{'id':'${query.arid}'}`},
    'artist-head-info': {url: '/api/artist/head/info/get', paras: `{'id':'${query.arid}'}`},
    // 'artist-introduction': {url: '/api/artist/introduction', paras: `{'id':'${query.arid}'}`},
    'artist-top-song': {url: '/api/artist/top/song', paras: `{'id':'${query.arid}','top':'${query.limit}','work_type':-1,'order':'hot'}`},      // 热门单曲 50
    'artist-song-honor': {url: '/api/charts/artist/song/honor/get', paras: `{'artistId':'${query.arid}'}`},
    'similar-artist': {url: '/api/v1/similar/artist/get', paras: `{'id':'${query.arid}'}`},
    // 'artist-detail-v4': {url: '/api/artist/detail/v4', paras: `{'id':'${query.arid}'}`},                                            // 艺术家详情
    // found
    'banner-get-v3': {url: '/api/banner/get/v3', paras: ''},
    'personalized-block-old-v2': {url: '/api/personalized/block/old/v2', paras: `{'refresh':true}`},    // 新歌新碟
    // album
    'album-detail-dynamic': {url: '/api/album/detail/dynamic', paras: `{'id':${query.alid}}`},          // 专辑动态信息
    // info
    'resource-commentInfo-list': {url: '/api/resource/commentInfo/list', paras: `{'resourceIds':[${query.mid}],'resourceType':4,'fixliked':true,'needupgradedinfo':true}`},
    // comments
    'resource-comments': {url: `/api/v1/resource/comments/${query.type + query.coid}`, paras: `{'resourceId':${query.coid},'resourceType':'0','limit':${query.limit},'offset':${query.offset},'beforeTime':'0','compareUserLocation':'true','showInner':'false'}`},
    'comment-floor': {url: '/api/resource/comment/floor/get', paras: `{'time':'0','threadId':'${query.type + query.coid}','limit':${query.limit},'offset':${query.offset},'parentCommentId':${query.id},'commentId':0}`},
    // user
    'mymlog': {url: '/api/mlog/mymlog/get', paras: `{'limit':2,'targetUserId':${query.uid},'time':-1}`},
    'pendant-user': {url: '/api/pendant/user/get', paras: `{'userId':${query.uid}}`},
    'user-detail': {url: `/api/v1/user/detail/${query.uid}`, paras: `{'all':true}`},
    'vip-info': {url: '/api/music-vip-membership/client/vip/info', paras: `{'userId':${query.uid}}`},
    'full-background': {url: '/api/user/page/pretend/info', paras: `{'userId':${query.uid}}`},
    'playlist-favorite': {url: '/api/user/playlist/favorite', paras: `{'userId':${query.uid}}`},
    'dj-radio': {url: '/api/djradio/get/byuser/v1', paras: `{'userId':${query.uid},'limit':3,'offset':0}`},
    'playlist-create': {url: '/api/user/playlist/create', paras: `{'userId':${query.uid},'limit':3,'offset':0}`},
    'playlist-collect': {url: '/api/user/playlist/collect', paras: `{'userId':${query.uid},'limit':3,'offset':0}`}
  }
  
  // 请求参数
  let data = {}
  
  // 遍历追加请求参数
  for (let i = 0; i < batch.length; i++) {
    if (dataObj.hasOwnProperty(batch[i])) data[dataObj[batch[i]].url] = dataObj[batch[i]].paras
  }

  // console.log(data)
  
  // 请求
  return request(
    'POST', `http://interface3.music.163.com/eapi/batch`, data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/batch'
    }
  )
}
