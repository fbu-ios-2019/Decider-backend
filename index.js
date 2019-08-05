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
const historyRouter = require('./routes/history')
const ratingRouter = require('./routes/ratings')
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
app.use(historyRouter)
app.use(ratingRouter)

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
            // term: "restaurants"
        }
    
    }
    // Query for Yelp API
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
                'Authorization': 'Bearer ' + yelpRoutes.apiKey
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

// Function to add images for objects that already on the database
async function updateImages() {
    // Fetch restaurants
    const Restaurants = Parse.Object.extend("Restaurants")
    const restaurantQuery = new Parse.Query(Restaurants)
    restaurantQuery.skip(100)
    restaurantQuery.find().then(restaurants => {
        // Iterate through all given restaurants
        for(restaurant of restaurants) {
            yelpId = restaurant.get("yelpId")
            
            fetchOneRestaurant(yelpId)

            async function fetchOneRestaurant(yelpId) {
                let images = await fetchImages(restaurant, yelpId)
            }
        }
    })
}

// Function to fetch images from a specific restaurant and save it to the restaurant
function fetchImages(restaurant, yelpId) {
    return new Promise (resolve => {
        const Photos = Parse.Object.extend("Photos")
        const photosQuery = new Parse.Query(Photos)
        // Only query the photos that have the matching restaurant id
        photosQuery.equalTo("restaurantYelpId", yelpId)
        photosQuery.find().then(photos => {
            // Store images in array
            let photosArray = []
            for(photo of photos) {
                photosArray.push(photo.get("imageUrl"))
            }

            // Update restaurant object and save it on database
            restaurant.set("images", photosArray)
                restaurant.save().then(restaurant => {
                    console.log("Save successful")
                })

            resolve(photosArray)
        })
    })
}


// Call function to update images for restaurants in the database
// updateImages()

// Function to add the name of the restaurant for each photo in the Photos table on the database
async function updateNames() {
    // Fetch restaurants
    const Restaurants = Parse.Object.extend("Restaurants")
    const restaurantQuery = new Parse.Query(Restaurants)
    restaurantQuery.skip(100)
    restaurantQuery.find().then(restaurants => {
        // Iterate through all given restaurants
        for(restaurant of restaurants) {
            yelpId = restaurant.get("yelpId")
            name = restaurant.get("name")
            
            fetchOneRestaurant(name, yelpId)

            async function fetchOneRestaurant(name, yelpId) {
                await fetchPhotos(name, yelpId)
            }
        }
    })
}


// Function to fetch images from a specific restaurant and save it to the restaurant
function fetchPhotos(name, yelpId) {
    return new Promise (resolve => {
        const Photos = Parse.Object.extend("Photos")
        const photosQuery = new Parse.Query(Photos)
        // Only query the photos that have the matching restaurant id
        photosQuery.equalTo("restaurantYelpId", yelpId)
        photosQuery.find().then(photos => {
            // Save name in corresponding photo
            for(photo of photos) {
                photo.set("restaurantName", name)
                photo.save().then(photo => {
                    console.log("Save successful")
                })
            }
            resolve()
        })
    })
}


// Call function to update names for restaurants in the database
// updateNames()


app.listen(port, () => console.log(`Server running on port ${port}!`))