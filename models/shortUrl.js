const mongoose = require('mongoose') 
const shortId = require('shortid') // library that creates a unique short identifier   


const shortUrlSchema = new mongoose.Schema({ // creating the schema/rules for the database collection
  full:{
    type: String, 
    required: true 
  },
  short:{
    type: String,
    required: true,
    default: shortId.generate // generates a unique short identifier 
  },
  clicks: {
    type: Number, 
    required: true, 
    default: 0
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema) // exporting this module to be imported in the server.js to connect to the database. 