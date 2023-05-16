const express = require('express') // include express library
const mongoose = require('mongoose') // mongoose library for the database
const ShortUrl = require('./models/shortUrl')// importing the shortUrl database schema 
const app = express() // save express inside of app to run the application

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", { // connecting to MongoDB server
  //Mongodb connection
  useNewUrlParser: true,
});

app.set('view engine', 'ejs') // setting up the views to use the EJS view engine
app.use(express.urlencoded({ extended: false })) // set up to use the express url parameters
app.use(express.static("public")); 

// defining the home route for when the application starts 
app.get('/', async (req, res) => { 
  const shortUrls = await ShortUrl.find() // finding all the short urls in the database table
  res.render('index', { shortUrls: shortUrls}) // Displaying the UI of the application requested from index.ejs file and the short urls
})

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl }); // connecting to the database and save a new short url
  res.redirect("/"); // redirect the user to the home page after the short url has been created
});

app.get('/:shortUrl', async(req, res) => { 
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }) // using the searchOne method with the specified search filter 

  if(shortUrl === null) { // checking if the entered url is a valid url
    return res.sendStatus('404 Url Not Found') 
  }

  shortUrl.clicks++ //incrementing the number clicks 
  shortUrl.save() // saving the increment 

  res.redirect(shortUrl.full) // redirecting the user to the original url. 

});

app.listen(process.env.PORT || 3000); // listening on port 3000 