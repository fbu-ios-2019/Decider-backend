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
    historyQuery.limit(1)
    historyQuery.find().then(restaurants => {
        let usersHistoryArray = []
        async function fetchHistory() {
           
            for(restaurant of restaurants) {
                function getData() { 
                    return new Promise(resolve => {
                        let historyDict = {}
                        const allIds = restaurant.get("restaurants")
                        const date = restaurant.createdAt

                        historyDict["date"] = date

                        async function fetchOne(allIds) {
                            const result =  await fetchRestaurantsOfOneDate(allIds)
                            historyDict["restaurants"] = result
                            usersHistoryArray.push(historyDict)
                            console.log(result)
                        }

                        fetchOne(allIds)
                        // .log(historyDict)
                        resolve()
                    })
                    
                }
                
                await getData()
                console.log(usersHistoryArray.length)
                
            }
        }

        fetchHistory()
        console.log("Complete user history")
        // console.log(usersHistoryArray)
        res.json({
            userHistory: usersHistoryArray
        })
    })
}) 

function fetchRestaurantsOfOneDate(ids) {
    return new Promise(resolve => {
        const RestaurantModel = Parse.Object.extend("Restaurants")
        const restaurantQuery = new Parse.Query(RestaurantModel)
        restaurantQuery.containedIn("yelpId", ids)
        restaurantQuery.find().then(results => {
            results = JSON.stringify(results)
            results = JSON.parse(results)
            resolve(results)
        })
    })
    
}

router.get('/historyTest', (req, res) => {
    res.json(history)
})

module.exports = router