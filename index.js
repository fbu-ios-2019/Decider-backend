const bodyParser = require('body-parser')
const ParseServer = require('parse-server').ParseServer;
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 1337

const api = new ParseServer({
    databaseURI: 'mongodb://heroku_p33bj8tq:lum7rifhlummlg7u3e0me4p1m5@ds135217.mlab.com:35217/heroku_p33bj8tq', // Connection string for your MongoDB database
    appId: 'decider-fbu',
    masterKey: 'mmk', // Keep this key secret!
    serverURL: 'http://decider-fbu.herokuapp.com/parse' // Don't forget to change to https if needed
  });

const yelpRoutes = {
    businessUrl:  "https://api.yelp.com/v3/businesses/search",
    clientID: "Z1M9PVNRNrHm-KIFnA2eHw",
    apiKey: "lyUcXUepfXrwaCC3nygsdSF5_5HfaAEVSA3NJwdMF5caoMJrJ4qngfAJLKovawiCcHxNjNQY9mBEFUuRVzCoueutimkoG9JEZIt1V0p9rcWcxpfAeKUd8IeUarQvXXYx",
}

const corsConfig = {
    origin: true,
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
  }
  

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// cors
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

// parse body contents using body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/restaurants/:category/:location', (req, res) => {
       
        const {category, location} = req.params || {}
        
        const request = require('request')

        const options = {
            url: yelpRoutes.businessUrl,
            headers: {
                'Authorization': 'Bearer lyUcXUepfXrwaCC3nygsdSF5_5HfaAEVSA3NJwdMF5caoMJrJ4qngfAJLKovawiCcHxNjNQY9mBEFUuRVzCoueutimkoG9JEZIt1V0p9rcWcxpfAeKUd8IeUarQvXXYx'
            },
            qs: {
                categories: category,
                location
            }
        
        }

    request(options, (error, response, body) => {
        try {
            if (!error && response.statusCode == 200) {
                const results = JSON.parse(body);
                return res.json(results)

            } else if(error) {
                console.log(error);
            } else {
                console.log(response);
            }
                

        } catch(error) {
            throw new Error(error)
        }
    })

})

app.listen(port, () => console.log(`Server running on port ${port}!`))