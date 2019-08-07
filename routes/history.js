const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig, recommendationsSample, likedSample, hatedSample, MAX_RATING} = require('../config')
const {history} = require('../data')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/history/:userId', (req, res) => {
    const { userId } = req.params

    const History = Parse.Object.extend("Recommendations")
    const historyQuery = new Parse.Query(History)
    historyQuery.equalTo("userId", userId)
    historyQuery.find().then(restaurants => {

        console.log(restaurants)
            async function fetchHistory() {
                let usersHistoryArray = []
                let restaurantsIdsArray = []

                for(restaurant of restaurants) {
                    restaurantsIdsArray.push(restaurant.get("restaurantYelpId"))
                }
                
                usersHistoryArray = await fetchRestaurants(usersHistoryArray, restaurantsIdsArray)

                return usersHistoryArray
            }
            
        async function saveHistory() {
            const finalArray = await fetchHistory()
            res.json({
                userHistory: finalArray
            })
        }

        saveHistory()
    })
}) 


function fetchRestaurants(usersHistoryArray, restaurants) {
    return new Promise(resolve => {

        const RestaurantModel = Parse.Object.extend("Restaurants")
        const restaurantQuery = new Parse.Query(RestaurantModel)
        restaurantQuery.containedIn("yelpId", restaurants)
        restaurantQuery.find().then(results => { 
            console.log(restaurants)
            results = JSON.stringify(results)
            results = JSON.parse(results)
            usersHistoryArray.push(results)
            
            resolve(usersHistoryArray)
        })

    })
}

function fetchRestaurantsOfOneDate(ids, usersHistoryArray, historyDict) {
    return new Promise(resolve => {
        const RestaurantModel = Parse.Object.extend("Restaurants")
        const restaurantQuery = new Parse.Query(RestaurantModel)
        restaurantQuery.containedIn("yelpId", ids)
        restaurantQuery.find().then(results => {
            results = JSON.stringify(results)
            results = JSON.parse(results)
            historyDict["restaurants"] = results
            usersHistoryArray.push(historyDict)
            resolve(usersHistoryArray)
        })
    })
    
}

router.get('/historyTest', (req, res) => {
    res.json(history)
})

module.exports = router