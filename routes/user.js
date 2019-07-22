const router = require('express').Router()
const Parse = require('parse/node').Parse;
const {parseConfig} = require('../config')

Parse.initialize(parseConfig.appId, "", parseConfig.masterKey)
Parse.serverURL = parseConfig.serverURL
Parse.User.enableUnsafeCurrentUser()

router.post('/register', (req, res) => {
    const {username, password, email} = req.body || {} 

    // Check whether the username already exists
    const User = Parse.Object.extend("User")
    const query = new Parse.Query(User)
    query.equalTo("username", username)
    query.first().then(userExists => {
        if (userExists) {
            res.json({
                error: "username already exists"
            })
        } 
        
        // make new user if username doesn't exist
        const newUser = new Parse.User()
        newUser.set("username", username)
        newUser.set("password", password)
        newUser.set("email", email)
        
        try {
            newUser.signUp().then(data => {
                signedUpUser = JSON.stringify(data)
                signedUpUser = JSON.parse(signedUpUser)
                res.json({
                    success: "user was registered successfully",
                    user: signedUpUser
                })
            })
        } catch (error) {
            res.json({
                error: error.code + ": " + error.message
            })
        }


    })
    
})

router.post('/login', (req, res) => {
    const {username, password} = req.body || {}
    try {
        Parse.User.logIn(username, password).then(data => {
            loggedInUser = JSON.stringify(data)
            loggedInUser = JSON.parse(loggedInUser)
            res.json({
                success: "succesfully logged in",
                user: loggedInUser
            })
        })
    } catch (error) {
        res.json({
            error: error.code + ": " + error.message
        })
    }
    

})

router.get('/currentUser', (req, res) => {
    const currentUser = Parse.User.current()


    if (currentUser) {
        res.json({
            user: currentUser
        })
    } else {
        res.json({
            error: "no user logged in"
        })
    }
})

router.post('/logout', (req, res) => {
    Parse.User.logOut().then(() => {
        const currentUser = Parse.User.current()

        if (!currentUser) {
            res.json({
                success: "logout was successful"
            })
        } else {
            res.json({
                error: "failed to logout"
            })
        }
    })
})

 module.exports = router