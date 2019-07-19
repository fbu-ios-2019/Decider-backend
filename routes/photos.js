const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/photos/:category/:location/:offset/:count', (req, res) => {
    const {category, location, offset, count} = req.params || {}

    async function fetchPhotos() {
        const Photos = Parse.Object.extend("Photos")
        const query = new Parse.Query(Photos)
        query.skip(parseInt(offset, 10))
        query.limit(parseInt(count, 10)) 
        if (category === 'all') {
            let dbPhotos = await query.find()
            dbPhotos = JSON.stringify(dbPhotos)
            dbPhotos = JSON.parse(dbPhotos)
            res.json(dbPhotos)
        }

    }
    fetchPhotos()
  
    
})

module.exports = router