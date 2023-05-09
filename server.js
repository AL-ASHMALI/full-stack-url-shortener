const express = require('express') // include express
const mongoose = require('mongoose') 
const ShortUrl = require('./models/shortUrl')// importing the shortUrl model 
const app = express() // save express inside of app to run the application

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {
  //Mongodb connection
  useNewUrlParser: true,
});

app.set('view engine', 'ejs') // set up to use the ejs view engine
app.use(express.urlencoded({ extended: false })) // set up to use the express url parameters 


app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls})
})

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get('/:shortUrl', async(req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

  if(shortUrl === null) {
    return res.sendStatus('404 Url Not Found')
  }

  shortUrl.clicks++ 
  shortUrl.save() 

  res.redirect(shortUrl.full)

});

app.listen(process.env.PORT || 3000);   