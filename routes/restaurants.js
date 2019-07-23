const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/restaurants/:id', (req, res) => {
    const {id} = req.params || {}
    async function fetchRestaurant() {
        const Restaurants = Parse.Object.extend("Restaurants")
        const query = new Parse.Query(Restaurants)
        query.equalTo("yelpId", id)
       
        query.first().then(restaurant => {
            restaurant = JSON.stringify(restaurant)
            restaurant = JSON.parse(restaurant)
            
            
            const Photos = Parse.Object.extend("Photos")
            const photosQuery = new Parse.Query(Photos)
            photosQuery.equalTo("restaurantYelpId", restaurant.yelpId)
            photosQuery.find().then(photos =>{
                photos = JSON.stringify(photos)
                photos = JSON.parse(photos)
                restaurantPhotos = []
                for (photo of photos) {
                    restaurantPhotos.push(photo.imageUrl)
                }

                res.json({
                    ...restaurant,
                    images: restaurantPhotos
                })
            })
        })
    }
    fetchRestaurant()
  
    
})

module.exports = router