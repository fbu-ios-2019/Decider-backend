const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL

router.get('/register', (req, res) => {
    const {username, password, confirmation, email} = req.body || {} 
    console.log(req.body)
})

module.exports = router