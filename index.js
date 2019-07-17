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
    try{

        const {location, category} = req.params || {}
        return res.json(
            {
                "results": [
                    {
                        
                        "id": "WavvLdfdP6g8aZTtbBQHTw",
                        "alias": "gary-danko-san-francisco",
                        "name": "Gary Danko",
                        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg"
                    },
                    {
                        "id": "23dLdfdP6g8aZTtbBQHTz",
                        "alias": "maria-pancakes-san-francisco",
                        "name": "Pancake house",
                        "image_url": "https://www.wonderparenting.com/wp-content/uploads/2019/04/cinnamon-banana-pancakes-wonderparenting.jpeg"
                    },
                
                    {
                        "id": "ZenvLfddP6g5aXItbBQDHq",
                        "alias": "kate-tasties-sunnyvale",
                        "name": "kate tasties",
                        "image_url": "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    ]
            }
            
        )

    } catch(error) {
        throw new Error(error)
    }
})

app.listen(port, () => console.log(`Server running on port ${port}!`))