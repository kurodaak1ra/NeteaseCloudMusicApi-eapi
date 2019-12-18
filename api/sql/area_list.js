// 省市二级菜单联动

const express = require("express")
const router = express.Router()
const mysql = require('mysql')

router.get("/", (req, res) => {
  let data = {}
  let reg = new RegExp(/特别行政区|自治区|壮族|回族|维吾尔/, 'g')

  let link = mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password : '',
    database : 'cloud_music'
  })

  link.connect()

  new Promise((resolve, reject) => {
    link.query('SELECT name, code FROM area_code', (error, results, fields) => {
      if (error) throw error
      results.forEach(element => {
        if (element.code === 100000 || element.code === 1000000) return
        if (element.code.toString().length === 6) {
          if (element.code.toString().substr(-4) === '0000') parent = element.code
          // 省份数据
          if (element.code.toString().substr(-4) === '0000' && !/北京市|天津市|上海市|重庆市|香港|澳门/.test(element.name)) {
            data[element.code] = {
              'code': element.code,
              'name': element.name.replace(reg, ''),
              'children': [] 
            }
          }
          // 一级市
          if (element.code.toString().substr(-4) != '0000' && element.code.toString().substr(-3) % 100 === 0 && !/北京市|天津市|上海市|重庆市|市辖区/.test(element.name)) {
            data[parent]['children'].push({
              'code': element.code,
              'name': element.name
            })
          }
          // 直辖市
          if (element.code.toString().substr(-4) === '0000' && /北京市|天津市|上海市|重庆市/.test(element.name)) {
            if (!('0' in data)) {
              data['0'] = {
                'code': 0,
                'name': '直辖市',
                'children': [] 
              }
            }
            data['0']['children'].push({
              'code': element.code,
              'name': element.name
            })
          }
          // 特别行政区
          if (/香港|澳门/.test(element.name)) {
            if (!('1' in data)) {
              data['1'] = {
                'code': 1,
                'name': '特别行政区',
                'children': []
              }
            }
            data['1']['children'].push({
              'code': element.code,
              'name': element.name.replace(reg, '')
            })
          }
        } else {
          // 海外
          if (!('1000000' in data)) {
            data[1000000] = {
              'code': 1000000,
              'name': '海外',
              'children': [] 
            }
          }
          data[1000000]['children'].push({
            'code': element.code,
            'name': element.name
          })
        }
      })
      resolve()
    })
  }).then(() => {
    res.send(data)
  })
})

module.exports = router
