const express = require('express')
const router = express.Router()
const UrlModel = require('../../models/shortURLMap')

router.get('/:shortUrl', async (req, res) => {
  const shorten = req.params.shortUrl
  await UrlModel.findOne({ shortUrl: shorten }, (err, doc) => {
    if (doc) {
      res.redirect(doc.longUrl)
    } else {
      res.send('Invalid short URL')
    }
  })
})

module.exports = router
