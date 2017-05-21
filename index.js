const express = require('express')
const got = require('got')
const jsonpath = require('jsonpath')
const cors = require('cors')
const app = express()
app.use(cors())
const env = require('dotenv').config()

const options = {
  headers: {
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY
  },
}
app.get('/notes/:q', function(req, res){
  const apiUrl = `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${req.params.q}`

  got(apiUrl, options)
	.then(response => {
    const responseJson = JSON.parse(response.body)
    res.json(responseJson)
	})
	.catch(error => {
		console.log(error.response.body);
	})
})
app.listen(3000)
