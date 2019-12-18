// 城市代码

const express = require("express")
const router = express.Router()
const mysql = require('mysql')

router.get("/", (req, res) => {
  let data = {
    prov: 'null',
    city: 'null'
  }
  let reg = new RegExp(/特别行政区|自治区|壮族|回族|维吾尔/, 'g')

  let link = mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password : '',
    database : 'cloud_music'
  })

  link.connect()

  new Promise((resolve, reject) => {
    // 省查询
    link.query('SELECT name FROM area_code WHERE code = ' + req.query.prov, (error, results, fields) => {
      if (error) throw error
      if (results.length !== 0) {
        data.prov = results[0].name.replace(reg, '')
        if (/110000|120000|310000|500000/.test(req.query.prov)) {
          data.prov = '直辖市'
        } else if (/810000|820000/.test(req.query.prov)) {
          data.prov = '特别行政区'
        }
      }
      resolve()
    })
  }).then(() => {
    // 市查询
    link.query('SELECT name FROM area_code WHERE code = ' + req.query.city, (error, results, fields) => {
      if (error) throw error
      if (results.length !== 0) {
        data.city = results[0].name
        if (/110/.test(req.query.city.toString().substr(0, 3))) {
          data.city = '北京市'
        } else if (/120/.test(req.query.city.toString().substr(0, 3))) {
          data.city = '天津市'
        } else if (/310/.test(req.query.city.toString().substr(0, 3))) {
          data.city = '上海市'
        } else if (/500/.test(req.query.city.toString().substr(0, 3))) {
          data.city = '重庆市'
        }
      } else {
        if (/810/.test(req.query.city.toString().substr(0, 3))) {
          data.city = '香港'
        } else if (/820/.test(req.query.city.toString().substr(0, 3))) {
          data.city = '澳门'
        }
      }
      res.send(data)
    })
  })
})

module.exports = router
