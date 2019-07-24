const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/restaurants/recommendations', (req, res) => {
    res.json({
        results: [
            {
                "hours": [
                ],
                "category": [
                    "Food Trucks",
                    "Tacos"
                ],
                "coordinates": {
                    "latitude": 37.40108,
                    "longitude": -122.10658
                },
                "name": "Mamacitas Tacos",
                "rating": 4.5,
                "priceRating": 1,
                "likeCount": 0,
                "unlikeCount": 0,
                "phone": "+16502766215",
                "yelpId": "yHaqUG1YndrtbpEfKCUZzw",
                "address": "555 Showers Dr",
                "city": "Mountain View",
                "state": "CA",
                "zipcode": "94040",
                "country": "US",
                "coverUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/En6_9hpAmOANW4dz4ZA4AQ/o.jpg",
                "linkUrl": "https://www.yelp.com/biz/mamacitas-tacos-mountain-view?adjust_creative=3L8Y7mtIpK7UAyR0uorDHA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=3L8Y7mtIpK7UAyR0uorDHA",
                "reviewCount": 178,
                "createdAt": "2019-07-24T00:29:30.367Z",
                "updatedAt": "2019-07-24T00:29:30.367Z",
                "objectId": "AS4cemxD1e",
                "images": [
                    "https://s3-media3.fl.yelpcdn.com/bphoto/En6_9hpAmOANW4dz4ZA4AQ/o.jpg",
                    "https://s3-media4.fl.yelpcdn.com/bphoto/p70TQ9cU8ZO0xttSw3f58g/o.jpg",
                    "https://s3-media2.fl.yelpcdn.com/bphoto/xhBK7BN08uYi49nh4EDv-A/o.jpg"
                ]
            },
            {
                "hours": [

                ],
                "category": [
                    "Asian Fusion",
                    "Seafood",
                    "Poke"
                ],
                "coordinates": {
                    "latitude": 37.42574,
                    "longitude": -122.14643
                },
                "name": "Poki Bowl",
                "rating": 4,
                "priceRating": 2,
                "likeCount": 0,
                "unlikeCount": 0,
                "phone": "+16505613027",
                "yelpId": "we0184VxKVmzAZkq-KTKtQ",
                "address": "2305 El Camino Real",
                "city": "Palo Alto",
                "state": "CA",
                "zipcode": "94306",
                "country": "US",
                "coverUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/Gh_N66VxOIwQPK0gK3s9KQ/o.jpg",
                "linkUrl": "https://www.yelp.com/biz/poki-bowl-palo-alto?adjust_creative=3L8Y7mtIpK7UAyR0uorDHA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=3L8Y7mtIpK7UAyR0uorDHA",
                "reviewCount": 152,
                "createdAt": "2019-07-19T17:35:27.003Z",
                "updatedAt": "2019-07-19T17:35:27.003Z",
                "objectId": "7mbleW4dDm",
                "images": [
                    "https://s3-media2.fl.yelpcdn.com/bphoto/bHIpNPX7ltfWVVECLFFERA/o.jpg",
                    "https://s3-media4.fl.yelpcdn.com/bphoto/Gh_N66VxOIwQPK0gK3s9KQ/o.jpg",
                    "https://s3-media1.fl.yelpcdn.com/bphoto/_ii9fUwp9kVVNBmirfrs6A/o.jpg"
                ]
            },
            {
                "hours": [
                    
                ],
                "category": [
                    "Desserts",
                    "American (Traditional)"
                ],
                "coordinates": {
                    "latitude": 37.32398,
                    "longitude": -121.9474
                },
                "name": "The Cheesecake Factory",
                "rating": 3,
                "priceRating": 2,
                "likeCount": 0,
                "unlikeCount": 0,
                "phone": "+14082460092",
                "yelpId": "uSM6f2uZrrQK4SOp4zEpOA",
                "address": "3041 Stevens Creek Blvd",
                "city": "Santa Clara",
                "state": "CA",
                "zipcode": "95050",
                "country": "US",
                "coverUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/573Sq_oepXrSD8-D2GoSOw/o.jpg",
                "linkUrl": "https://www.yelp.com/biz/the-cheesecake-factory-santa-clara-2?adjust_creative=3L8Y7mtIpK7UAyR0uorDHA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=3L8Y7mtIpK7UAyR0uorDHA",
                "reviewCount": 1995,
                "createdAt": "2019-07-24T00:29:46.605Z",
                "updatedAt": "2019-07-24T00:29:46.605Z",
                "objectId": "9U2JLTAdQh",
                "images": [
                    "https://s3-media2.fl.yelpcdn.com/bphoto/6TPRe5uAzWEW_RsE23VthA/o.jpg",
                    "https://s3-media4.fl.yelpcdn.com/bphoto/qAWw0IRJ8yUmgru2zAFnHg/o.jpg",
                    "https://s3-media4.fl.yelpcdn.com/bphoto/573Sq_oepXrSD8-D2GoSOw/o.jpg"
                ]
            }
        ]
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


module.exports = router