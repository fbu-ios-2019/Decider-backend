const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const Parse = require('parse/node').Parse;
const app = express()
const port = process.env.PORT || 1337

const photosRouter = require('./routes/photos')
const helperRouter = require('./routes/helper')
const restaurantsRouter = require('./routes/restaurants')
const authRouter = require('./routes/user')
const {parseConfig, corsConfig, yelpRoutes} = require('./config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

// cors
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

// parse body contents using body parser
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(photosRouter)
app.use(helperRouter)
app.use(restaurantsRouter)
app.use(authRouter)

app.get('/', (req, res) => {
    

    async function getGameScore() {
        const GameScore = Parse.Object.extend("GameScore")
        const query = new Parse.Query(GameScore)
        let data = await query.find()
        data = JSON.stringify(data)
        data = JSON.parse(data)
        for (item of data) {
            console.log(item.playerName)
        }

        return res.json(data)
    }
   
    return getGameScore()
    
})

let savedRestaurants = []

async function getRestaurants() {
    const dbRestaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(dbRestaurants)
    let restaurants = await query.find()
    data = JSON.stringify(restaurants)
    data = JSON.parse(data)
    for (item of data) {
        savedRestaurants.push(item.yelpId)
    }
}

getRestaurants()


app.get('/crawl/:category/:location', (req, res) => {
    const {category, location} = req.params || {}
    const request = require('request')
    const options = {
        url: yelpRoutes.businessUrl,
        headers: {
            'Authorization': 'Bearer '+ yelpRoutes.apiKey
        },
        qs: {
            categories: category,
            location,
            term: "restaurants"
        }
    
    }
    request(options, (error, response, body) => {
        try {
            if (!error && response.statusCode == 200) {
                const results = JSON.parse(body)
                for (result of results.businesses) {
                    
                    if (savedRestaurants.includes(result.id)) {
                        console.log("already exists")
                    } else {
                        savedRestaurants.push(result.id)
                        fetchOne(result.id)
                    }

                    async function fetchOne(id) {
                        let newRestaurant = await fetchData(id)

                        let cuisines = []
                        for (cuisine of newRestaurant.categories) {
                            cuisines.push(cuisine.title)
                        }
                        let Restaurants = Parse.Object.extend("Restaurants")
                        let restaurant = new Restaurants()
                        restaurant.save({
                            name: newRestaurant.name,
                            rating: newRestaurant.rating,
                            priceRating: newRestaurant.price.length,
                            hours: newRestaurant.hours ? newRestaurant.hours : [],
                            likeCount: 0,
                            unlikeCount: 0,
                            category: cuisines,
                            phone: newRestaurant.phone,
                            yelpId: newRestaurant.id,
                            address: newRestaurant.location.address1,
                            city: newRestaurant.location.city,
                            state: newRestaurant.location.state,
                            zipcode: newRestaurant.location.zip_code,
                            country: newRestaurant.location.country,
                            coverUrl: newRestaurant.image_url,
                            linkUrl: newRestaurant.url,
                            reviewCount: newRestaurant.review_count,
                            coordinates: newRestaurant.coordinates
                        }).then(() => {
                            console.log("restaurant saved")

                            for (imageUrl of newRestaurant.photos) {
                                let Photos = Parse.Object.extend("Photos")
                                let photo = new Photos()
                                photo.save({
                                    imageUrl,
                                    restaurantYelpId: newRestaurant.id,
                                    categories: cuisines
                                }).then(() => {
                                    console.log("photo saved")
                                }, error => {
                                    console.log(error)
                                })
                            }

                        }, error => {
                            console.log(error)
                        })
                        
                    }

                }
                return res.json(results)
            } else{
                console.log(response.body);
            }
        } catch(error) {
            throw new Error(error)
        }
    })
})

function fetchData(id) {
    return new Promise(resolve => {
        const restaurantOptions = {
            url: yelpRoutes.restaurantDetails + id,
            headers: {
                'Authorization': 'Bearer '+ yelpRoutes.apiKey
            }
        }

        const detailsRequest = require('request')
        detailsRequest(restaurantOptions, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body)
                resolve(data)
            } else {
                resolve(response)
            }
        })
    })
}

app.listen(port, () => console.log(`Server running on port ${port}!`))