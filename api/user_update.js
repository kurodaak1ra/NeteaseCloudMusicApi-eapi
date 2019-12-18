// 用户信息修改

module.exports = (query, request) => {
  const data = {
    city: query.city,
    gender: query.gender,
    province: query.prov,
    birthday: query.birthday,
    nickname: query.nickname,
    signature: query.signature
  }
  return request(
    "POST", `http://interface3.music.163.com/eapi/user/profile/update`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/user/profile/update'
    }
  )
}