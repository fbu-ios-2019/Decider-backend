const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig, recommendationsSample, likedSample, hatedSample, MAX_RATING} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.post('/restaurants/recommendations', (req, res) => {
    const location = req.body.location
    let likedPhotos = req.body.likedPhotos
    let hatedPhotos = req.body.hatedPhotos

    likedPhotos = likedPhotos.length ? likedPhotos.split(","): ""
    hatedPhotos = hatedPhotos.length ? hatedPhotos.split(","): ""

    let inputDict = {}
    
    for (id of likedPhotos) {
        if (!(id in inputDict)) {
            inputDict[id] = {
                liked: 0,
                hated: 0
            }
            
        }
        inputDict[id]["liked"] = (inputDict[id]["liked"] || 0) + 1
    }
    for (id of hatedPhotos) {
        if (!(id in inputDict)) {
            inputDict[id] = {
                liked: 0,
                hated: 0
            }
        }
        inputDict[id]["hated"] = (inputDict[id]["hated"] || 0) + 1
    }

    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.equalTo("city", location)
    query.descending("reviewCount")
    query.find().then(results => {
        results = JSON.stringify(results)
        results = JSON.parse(results)
        const mostReviews = results[0]["reviewCount"]
        
        for (i = 0; i < results.length; i++) {
            restaurant = results[i];
            ratingParams = {    
                photosLikedCount: inputDict[restaurant.yelpId] ? inputDict[restaurant.yelpId]["liked"] : 0,
                photosHatedCount: inputDict[restaurant.yelpId] ? inputDict[restaurant.yelpId]["hated"] : 0,
                restaurantLikes: restaurant.likeCount,
                restaurantDislikes: restaurant.unlikeCount,
                rating: restaurant.rating,
                reviewCount: restaurant.reviewCount
            }

            let pricePreference = calculatePriceScore(req.body.pricePreference, restaurant.priceRating)
            restaurantScore = weightedScore(ratingParams, mostReviews, pricePreference, req.body.userPreference)
            restaurant["score"] = restaurantScore;
            
        }

        results.sort((a, b) => {return b["score"] - a["score"]})
        results = results.slice(0, 3)

        // Receive user's ID
        const userId = req.body.userId

        // Save recommendations
        saveRecommendationsToDatabase(results, userId)
    
        res.json({results})
    }) 
}) 



function saveRecommendationsToDatabase(results, userId) {
    const Recommendations = Parse.Object.extend("Recommendations")
    const recommendationsQuery = new Parse.Query(Recommendations)

    for(i = 0; i < results.length; i++) {
        const result = results[i]
        recommendationsQuery.equalTo("userId", userId)
        recommendationsQuery.equalTo("restaurantYelpId", result["yelpId"])
        recommendationsQuery.find().then(existingRecommendations => {
            if(existingRecommendations.length === 0) {
                const Recommendations = Parse.Object.extend("Recommendations")
                const recommendations = new Recommendations
                saveRecommendations(recommendations, userId, result)
            }

        })
    }
}

async function saveRecommendations(recommendations, userId, result) {
    recommendations.set("userId", userId)
    recommendations.set("restaurantYelpId", result["yelpId"])
    await saveThenRecommendations(recommendations)
}

function saveThenRecommendations(recommendations) {
    return new Promise(resolve => {
        recommendations.save().then(recommendationsSaved => {
            resolve()
        })
    })
}

router.post('/restaurants/save', (req, res) => {
    const {yelpId} = req.body || ""
    const {username} = req.body || ""

    const User = Parse.Object.extend("User")
    const userQuery = new Parse.Query(User)
    userQuery.equalTo("username", username)
    userQuery.first().then(userObject => {
        userObject.addUnique("savedRestaurants", yelpId)
        userObject.save().then(() => {
        res.json({
            success: "successfully saved restaurant"
        })
    })
    })
})

router.post('/restaurants/list', (req,res) => {
    let {ids} = req.body || {}
    idArray = ids.split(",")
    
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.containedIn("yelpId", idArray)
    query.find().then(results => {
        results = JSON.stringify(results)
        results = JSON.parse(results)

        
        for (let i = 0; i < results.length; i++) {
            result = results[i]
            const Photos = Parse.Object.extend("Photos")
            const photoQuery = new Parse.Query(Photos)
            photoQuery.equalTo("restaurantYelpId", result.yelpId)
            photoQuery.find().then(photos => {
                photos = JSON.stringify(photos)
                photos = JSON.parse(photos)
                let pictures = []
                for (photo of photos) {
                    pictures.push(photo.imageUrl)
                }
                result["images"] = pictures
                if (i === results.length - 1) {
                    res.json({results})
                }
            })
        } 
    })
})

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


function calculatePriceScore(userPricePreference, restaurantPriceRating) {
    let priceWeight = 0

    if(restaurantPriceRating <= userPricePreference) {
        priceWeight = 1
        return priceWeight
    } 

    priceWeight = 1 - (restaurantPriceRating - userPricePreference) * 0.25
    return priceWeight

}


function weightedScore(data, mostReviews, pricePreference, userPreference) {

    const preferencesArray = userPreference.split(',')

    const weightArray = [40, 25, 15, 10, 10]
    const {photosLikedCount, photosHatedCount, restaurantLikes, restaurantDislikes, rating, reviewCount} = data

    const userSwipeScore = (photosLikedCount + photosHatedCount) == 0 ? 0 : (photosLikedCount/(photosLikedCount + photosHatedCount)) * weightArray[preferencesArray.indexOf("review count")]
    const internalRatingScore = (restaurantLikes + restaurantDislikes) == 0 ? 0: (restaurantLikes/(restaurantLikes + restaurantDislikes)) * weightArray[preferencesArray.indexOf("others likes/dislikes")]
    const yelpRatingScore = (rating/MAX_RATING) * weightArray[preferencesArray.indexOf("rating")]
    const reviewCountScore = (reviewCount/ mostReviews) * weightArray[preferencesArray.indexOf("review count")]
    const pricePreferenceScore = pricePreference * weightArray[preferencesArray.indexOf("price")]
    
    const restaurantScore = userSwipeScore + internalRatingScore + yelpRatingScore + reviewCountScore + pricePreferenceScore
    return restaurantScore
}


module.exports = router