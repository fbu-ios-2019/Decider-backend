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
                results: [... categorySet]
            })
        })
    }

    fetchCategories()
  
    
})

module.exports = router