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

            async function fetchHistory() {
                    let usersHistoryArray = []
                    
                    for(restaurant of restaurants) {
                        let historyDict = {}
                        const allIds = restaurant.get("restaurants")
                        const date = restaurant.createdAt
        
                        historyDict["date"] = date
                        usersHistoryArray = await fetchRestaurantsOfOneDate(allIds, usersHistoryArray, historyDict)
                    }
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