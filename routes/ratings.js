const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL


router.post('/rating/like/:id', (req, res) => {
    const {id} = req.params

    if (!id) {
        res.json({
            error: " no id provided"
        })
    }

   
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.equalTo("yelpId", id)
    query.first().then(restaurant => {
        let likeCount = restaurant.get("likeCount")
        restaurant.set("likeCount", likeCount + 1)
        restaurant.save().then(() => {
            res.json({
                success: "restaurant liked"
            })
        })
        


    })
    
})

router.post('/rating/unlike/:id', (req, res) => {
    const {id} = req.params

    if (!id) {
        res.json({
            error: " no id provided"
        })
    }

   
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.equalTo("yelpId", id)
    query.first().then(restaurant => {
        let likeCount = restaurant.get("likeCount")
        restaurant.set("likeCount", likeCount - 1)
        restaurant.save().then(() => {
            res.json({
                success: "restaurant unliked"
            })
        })
        
    })
    
})

router.post('/rating/hate/:id', (req, res) => {
    const {id} = req.params

    if (!id) {
        res.json({
            error: " no id provided"
        })
    }

   
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.equalTo("yelpId", id)
    query.first().then(restaurant => {
        let unlikeCount = restaurant.get("unlikeCount")
        restaurant.set("unlikeCount", unlikeCount + 1)
        restaurant.save().then(() => {
            res.json({
                success: "restaurant hated"
            })
        })
        


    })
    
})

router.post('/rating/unhate/:id', (req, res) => {
    const {id} = req.params

    if (!id) {
        res.json({
            error: " no id provided"
        })
    }

   
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.equalTo("yelpId", id)
    query.first().then(restaurant => {
        let unlikeCount = restaurant.get("unlikeCount")
        restaurant.set("unlikeCount", unlikeCount - 1)
        restaurant.save().then(() => {
            res.json({
                success: "restaurant unhated"
            })
        })
        


    })
    
})

module.exports = router