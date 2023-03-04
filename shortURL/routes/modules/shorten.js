const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const UrlModel = require('../../models/shortURLMap')

function generateShortUrl() {
  return crypto.randomBytes(4).toString('hex')
}

// 查詢原始網址對應的短網址
async function findShortUrl(longUrl) {
  const url = await UrlModel.findOne({ longUrl: longUrl }).lean().exec()
  return url ? url.shortUrl : null
}

// 創建新URL
const createURL = () => {
  const shortUrl = generateShortUrl()
  const url = new UrlModel({ longUrl: longUrl, shortUrl: shortUrl })
  url.save((err) => {
    if (err) {
      console.error(err)
      res.send('Error occurred while shortening URL')
    } else {
      const shortUrl = `http://localhost:3000/${url.shortUrl}`
      res.render('result', { shortUrl: shortUrl })
    }
  })
}

// 處理表單提交
router.post('/', async (req, res) => {
  // 處理表單數據並生成短網址
  const longUrl = req.body.longUrl
  const existingShortUrl = await findShortUrl(longUrl)
  if (existingShortUrl) {
    // 短網址已存在，直接使用
    res.render('result', {
      shortUrl: `http://localhost:3000/result/${existingShortUrl}`,
      cryp: existingShortUrl,
    })
  } else {
    // 創建新的短網址
    const shortUrl = generateShortUrl()
    const url = new UrlModel({ longUrl: longUrl, shortUrl: shortUrl })
    url.save((err) => {
      if (err) {
        console.error(err)
        res.send('Error occurred while shortening URL')
      } else {
        const shortUrl = `http://localhost:3000/result/${url.shortUrl}`
        res.render('result', { shortUrl: shortUrl, cryp: url.shortUrl })
      }
    })
  }
})

module.exports = router
