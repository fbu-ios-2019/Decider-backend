
module.exports = {
    parseConfig: {
        databaseURI: 'mongodb://heroku_p33bj8tq:lum7rifhlummlg7u3e0me4p1m5@ds135217.mlab.com:35217/heroku_p33bj8tq', // Connection string for your MongoDB database
        appId: 'decider-fbu',
        masterKey: 'mmk', // Keep this key secret!
        serverURL: 'http://decider-fbu.herokuapp.com/parse' // Don't forget to change to https if needed
    },
    corsConfig: {
        origin: true,
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200
    },
    yelpRoutes: {
        businessUrl:  "https://api.yelp.com/v3/businesses/search",
        restaurantDetails: "https://api.yelp.com/v3/businesses/",
        clientID: "3L8Y7mtIpK7UAyR0uorDHA",
        apiKey: "9ZrSONpYvK3nAJwiX7nAG6iBI_WXk5s6vXoRXePg_U0w1bE77OtMyg81aDjxwUA7snF2Obwq7g4zQNL0r1Qdz2TEiCayadj9bDLDlZcmynb7kxWpUGHTkZUC8woxXXYx",
    }


}