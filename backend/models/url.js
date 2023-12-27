const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now  },
  });
  
  const UrlModel = mongoose.model('Url', urlSchema);
  
  module.exports = UrlModel;