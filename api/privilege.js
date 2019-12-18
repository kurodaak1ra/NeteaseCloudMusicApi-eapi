// 专辑收藏

module.exports = (query, request) => {
  const data = {
    ids: `[${query.ids}]`
  };
  return request(
    "POST", `http://interface3.music.163.com/eapi/song/enhance/privilege`, data,
    {
      crypto: "eapi",
      cookie: query.cookie,
      proxy: query.proxy,
      url: '/api/song/enhance/privilege'
    }
  );
};
