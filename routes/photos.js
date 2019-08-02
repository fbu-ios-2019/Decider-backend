const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/photos/:category/:location/:offset/', (req, res) => {
    let {category, location, offset} = req.params || {}
    offset = parseInt(offset, 10)

    async function fetchPhotos() {
        const Photos = Parse.Object.extend("Photos")
        const Restaurants = Parse.Object.extend("Restaurants")
        const restaurantQuery = new Parse.Query(Restaurants)
        restaurantQuery.equalTo("city", location)
        restaurantQuery.select("yelpId")

        const query = new Parse.Query(Photos)
        query.matchesKeyInQuery("restaurantYelpId", "yelpId", restaurantQuery)
        query.skip(offset)
        query.limit(20) 
        if (category !== 'All') {
            query.equalTo("categories", category)
        }
        let dbPhotos = await query.find()
        dbPhotos = JSON.stringify(dbPhotos)
        dbPhotos = JSON.parse(dbPhotos)
        results = shuffle(dbPhotos)
        res.json({
            results,
            offset: offset + dbPhotos.length,
            count: dbPhotos.length
        })

    }
    fetchPhotos()
  
    
})

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

module.exports = router