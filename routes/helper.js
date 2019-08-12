const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/categories', (req, res) => {

    async function fetchCategories() {
        const Restaurants = Parse.Object.extend("Restaurants")
        const query = new Parse.Query(Restaurants)
        query.select("category")
        query.find().then(results => {
            let data = JSON.stringify(results)
            data = JSON.parse(data)
            let categorySet= new Set()
            for (item of data) {
                for (field of item.category) {
                    categorySet.add(field)
                }
            }

            res.json({
                results: ["All", ... categorySet]
            })
        })
    }
    fetchCategories()
})

router.get('/cities', (req, res) => {
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.select("city", "state")
    query.find().then(results => {
        let data = JSON.stringify(results)
        data = JSON.parse(data)
        let citySet = new Set()
        for (item of data) {
            citySet.add(item.city + ", " + item.state)
        }
        res.json({
            results: [... citySet]
        })
    })
})


router.get('/data/like',(req, res) => {
    const Restaurants = Parse.Object.extend('Restaurants')
    const restaurantQuery = new Parse.Query(Restaurants)
<<<<<<< HEAD
    restaurantQuery.descending('unlikeCount')
    restaurantQuery.find().then(results => {
        for (result of results) {
            const likeCount = Math.round(Math.random() * 3) + 5
            const unlikeCount =  5 - Math.round(Math.random() * 3)
=======
    restaurantQuery.ascending('unlikeCount')
    restaurantQuery.find().then(results => {
        for (result of results) {
            const likeCount = Math.round(Math.random() * 7) + 1
            const unlikeCount =  Math.round(Math.random() * 7) + 1
>>>>>>> a5e8e2a23cdbaf7144a12d83f3f13647be384628
            const id = result.get('yelpId')
            
            async function incrementForOne (id, likeCount, unlikeCount) {
                await saveForOne(id, likeCount, unlikeCount )
            }

            incrementForOne(id, likeCount, unlikeCount)

        }
        res.json({
            results
        })
    })
})


function saveForOne (id, likeCount, unlikeCount) {
    return new Promise(resolve => {
        const Restaurants = Parse.Object.extend('Restaurants')
        const query = new Parse.Query(Restaurants)
        query.equalTo("yelpId", id)
        query.first().then(place => {
            place.set("likeCount", likeCount)
            place.set("unlikeCount", unlikeCount)
            place.save().then(() => {
                resolve()
            })
            
    
        }) 
    })
    
}

module.exports = router