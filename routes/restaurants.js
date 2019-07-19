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
            res.json(restaurant)
        })
    }
    fetchRestaurant()
  
    
})

module.exports = router