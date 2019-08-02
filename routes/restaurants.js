const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig, recommendationsSample, likedSample, hatedSample, MAX_RATING} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.post('/restaurants/recommendations', (req, res) => {
    const location = req.body.location ? req.body.location : "Sunnyvale"
    let likedPhotos = req.body.likedPhotos ? req.body.likedPhotos : likedSample
    let hatedPhotos = req.body.hatedPhotos ? req.body.hatedPhotos : hatedSample

    let inputDict = {}
    
    for (photo of likedPhotos) {
        if (!(photo.restaurantYelpId in inputDict)) {
            inputDict[photo.restaurantYelpId] = {
                liked: 0,
                hated: 0
            }
            
        }
        inputDict[photo.restaurantYelpId]["liked"] = (inputDict[photo.restaurantYelpId]["liked"] || 0) + 1
    }
    for (photo of hatedPhotos) {
        if (!(photo.restaurantYelpId in inputDict)) {
            inputDict[photo.restaurantYelpId] = {
                liked: 0,
                hated: 0
            }
        }
        inputDict[photo.restaurantYelpId]["hated"] = (inputDict[photo.restaurantYelpId]["hated"] || 0) + 1
    }

    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.equalTo("city", location)
    query.descending("reviewCount")
    query.find().then(results => {
        results = JSON.stringify(results)
        results = JSON.parse(results)
        const mostReviews = results[0]["reviewCount"]
        
        fetchPhotosCompleted = false;

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
            restaurantScore = weightedScore(ratingParams, mostReviews)
            restaurant["score"] = restaurantScore;
            console.log(restaurant)
        }

        results.sort((a, b) => {return b["score"] - a["score"]})
        results = results.slice(0, 3)
        res.json({results})
    })
}) 

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
    ids = JSON.parse(ids)
    
    const Restaurants = Parse.Object.extend("Restaurants")
    const query = new Parse.Query(Restaurants)
    query.containedIn("yelpId", ids)
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


function weightedScore(data, mostReviews) {
    const {photosLikedCount, photosHatedCount, restaurantLikes, restaurantDislikes, rating, reviewCount} = data
    const userSwipeScore = (photosLikedCount + photosHatedCount) == 0 ? 0: (photosLikedCount/(photosLikedCount + photosHatedCount))*40
    const internalRatingScore = (restaurantLikes + restaurantDislikes) == 0 ? 0:(restaurantLikes/(restaurantLikes + restaurantDislikes))*20
    const yelpRatingScore = (rating/MAX_RATING)*25
    const reviewCountScore = (reviewCount/ mostReviews) * 15

    const restaurantScore = userSwipeScore + internalRatingScore + yelpRatingScore + reviewCountScore
    
    return restaurantScore
}


module.exports = router