const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UrlSchema = new Schema({
  longUrl: {
    type: String, // data type: String
    required: true, // 必填欄位
  },
  shortUrl: {
    type: String,
  },
})
module.exports = mongoose.model('Url', UrlSchema)
