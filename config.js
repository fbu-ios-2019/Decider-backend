
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
        clientID: "Z1M9PVNRNrHm-KIFnA2eHw",
        apiKey: "lyUcXUepfXrwaCC3nygsdSF5_5HfaAEVSA3NJwdMF5caoMJrJ4qngfAJLKovawiCcHxNjNQY9mBEFUuRVzCoueutimkoG9JEZIt1V0p9rcWcxpfAeKUd8IeUarQvXXYx",
    },
    MAX_RATING: 5,
    recommendationsSample: {
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
    },
    likedSample: [
        {
            "categories": [
                "Food Trucks",
                "Mexican"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/WDnHycO5QTCn9zSgQQnaOQ/o.jpg",
            "restaurantYelpId": "9tVJwdzAtNzCTBfk3O8hfw",
            "createdAt": "2019-07-19T17:23:05.439Z",
            "updatedAt": "2019-07-19T17:23:05.439Z",
            "objectId": "PS7Y0coAiG"
        },
        {
            "categories": [
                "Mexican",
                "Bars"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/6n6NV7_YkeQpqhgpIM6Qrg/o.jpg",
            "restaurantYelpId": "BiveG6i0TX1NniYtES1aZg",
            "createdAt": "2019-07-19T17:23:05.370Z",
            "updatedAt": "2019-07-19T17:23:05.370Z",
            "objectId": "2TJTGMcxDa"
        },
        {
            "categories": [
                "Mexican",
                "Bars"
            ],
            "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/q09igJkmGUybfv1No9U2qQ/o.jpg",
            "restaurantYelpId": "BiveG6i0TX1NniYtES1aZg",
            "createdAt": "2019-07-19T17:23:05.367Z",
            "updatedAt": "2019-07-19T17:23:05.367Z",
            "objectId": "V87VKDNGvT"
        },
        {
            "categories": [
                "Mexican"
            ],
            "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/MUT3UFJ3H6RAuZkxEj9Atw/o.jpg",
            "restaurantYelpId": "gJkm1zRpOyrXydsC-rt8vQ",
            "createdAt": "2019-07-19T17:23:05.406Z",
            "updatedAt": "2019-07-19T17:23:05.406Z",
            "objectId": "QLZsvIczFk"
        },
        {
            "categories": [
                "Mexican",
                "Food Trucks"
            ],
            "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/BCKFf8WYh5KRfXNQVhavOA/o.jpg",
            "restaurantYelpId": "HqhIK6XXP3AObuT01X544w",
            "createdAt": "2019-07-19T17:23:05.443Z",
            "updatedAt": "2019-07-19T17:23:05.443Z",
            "objectId": "P6jRD5sT7D"
        },
        {
            "categories": [
                "Mexican",
                "Seafood",
                "Salad"
            ],
            "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/AHPct1YV9Xm7sA-0H1oKMw/o.jpg",
            "restaurantYelpId": "DGXJgURG610d_LBOLTjsoQ",
            "createdAt": "2019-07-19T17:23:05.366Z",
            "updatedAt": "2019-07-19T17:23:05.366Z",
            "objectId": "xQcyD85zIp"
        },
        {
            "categories": [
                "Mexican",
                "Seafood",
                "Salad"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/rc13T6G4iT2udJApjVsASQ/o.jpg",
            "restaurantYelpId": "DGXJgURG610d_LBOLTjsoQ",
            "createdAt": "2019-07-19T17:23:05.381Z",
            "updatedAt": "2019-07-19T17:23:05.381Z",
            "objectId": "XuBUsiKQDb"
        },
        {
            "categories": [
                "Mexican"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/19BSlN9YBftz5O_WDunqlg/o.jpg",
            "restaurantYelpId": "gJkm1zRpOyrXydsC-rt8vQ",
            "createdAt": "2019-07-19T17:23:05.410Z",
            "updatedAt": "2019-07-19T17:23:05.410Z",
            "objectId": "RN6e4cO6S3"
        },
        {
            "categories": [
                "Mexican",
                "Seafood",
                "Salad"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/jjxsZtuYHdjlwuPXFo2yvA/o.jpg",
            "restaurantYelpId": "DGXJgURG610d_LBOLTjsoQ",
            "createdAt": "2019-07-19T17:23:05.380Z",
            "updatedAt": "2019-07-19T17:23:05.380Z",
            "objectId": "G8jf95YVHj"
        },
        {
            "categories": [
                "Mexican",
                "Bars"
            ],
            "imageUrl": "https://s3-media4.fl.yelpcdn.com/bphoto/wSLfZE_MM8TwB35VOXWFfA/o.jpg",
            "restaurantYelpId": "BiveG6i0TX1NniYtES1aZg",
            "createdAt": "2019-07-19T17:23:05.365Z",
            "updatedAt": "2019-07-19T17:23:05.365Z",
            "objectId": "EFSHB1rxQB"
        },
        {
            "categories": [
                "Mexican",
                "Bars"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/FyUPb_tsyC2FDi6pxJ1quw/o.jpg",
            "restaurantYelpId": "p-nAA9LHJc9KRH27FNe2Kw",
            "createdAt": "2019-07-19T17:23:05.351Z",
            "updatedAt": "2019-07-19T17:23:05.351Z",
            "objectId": "5CEEs0dprk"
        }

    ],
    hatedSample: [
        {
            "categories": [
                "Food Trucks",
                "Mexican"
            ],
            "imageUrl": "https://s3-media1.fl.yelpcdn.com/bphoto/Tam9xV4oIV_s0vsu_DHgYw/o.jpg",
            "restaurantYelpId": "9tVJwdzAtNzCTBfk3O8hfw",
            "createdAt": "2019-07-19T17:23:05.437Z",
            "updatedAt": "2019-07-19T17:23:05.437Z",
            "objectId": "H3PJYilkvK"
        },
        {
            "categories": [
                "Mexican"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/JlAThDV-REcSluV_nz_CuA/o.jpg",
            "restaurantYelpId": "JSuAdCv0qQ4Y0CQpFTCmkw",
            "createdAt": "2019-07-19T17:23:05.409Z",
            "updatedAt": "2019-07-19T17:23:05.409Z",
            "objectId": "YOFuavamVk"
        },
        {
            "categories": [
                "Mexican"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/G7b8-1rbuLrs7hzX2RzEqw/o.jpg",
            "restaurantYelpId": "JSuAdCv0qQ4Y0CQpFTCmkw",
            "createdAt": "2019-07-19T17:23:05.400Z",
            "updatedAt": "2019-07-19T17:23:05.400Z",
            "objectId": "F4Y3zkS0Aq"
        },
        {
            "categories": [
                "Grocery",
                "Mexican"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/idSfw36z_Q3AuLVRL3JYkA/o.jpg",
            "restaurantYelpId": "o49gY8fL0e0-2rW8dhaoQQ",
            "createdAt": "2019-07-19T17:23:05.442Z",
            "updatedAt": "2019-07-19T17:23:05.442Z",
            "objectId": "rRqdpFJcZc"
        },
        {
            "categories": [
                "Mexican"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/uO-DrIADh57o7hvSyCpyRA/o.jpg",
            "restaurantYelpId": "gJkm1zRpOyrXydsC-rt8vQ",
            "createdAt": "2019-07-19T17:23:05.402Z",
            "updatedAt": "2019-07-19T17:23:05.402Z",
            "objectId": "zu9PL8dG70"
        },
        {
            "categories": [
                "Mexican",
                "Bars"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/e94wUzVstLUHsm_fwGpaJQ/o.jpg",
            "restaurantYelpId": "p-nAA9LHJc9KRH27FNe2Kw",
            "createdAt": "2019-07-19T17:23:05.355Z",
            "updatedAt": "2019-07-19T17:23:05.355Z",
            "objectId": "HkKtpcO1TK"
        },
        {
            "categories": [
                "Mexican"
            ],
            "imageUrl": "https://s3-media3.fl.yelpcdn.com/bphoto/hqMyiQVBVwfcz8jPpkgN6A/o.jpg",
            "restaurantYelpId": "JSuAdCv0qQ4Y0CQpFTCmkw",
            "createdAt": "2019-07-19T17:23:05.398Z",
            "updatedAt": "2019-07-19T17:23:05.398Z",
            "objectId": "4WZTEnQgFy"
        },
        {
            "categories": [
                "Mexican",
                "Bars"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/GCO2mrI8FCt0AzBWYAlhhQ/o.jpg",
            "restaurantYelpId": "p-nAA9LHJc9KRH27FNe2Kw",
            "createdAt": "2019-07-19T17:23:05.348Z",
            "updatedAt": "2019-07-19T17:23:05.348Z",
            "objectId": "FYGkdGKmCL"
        },
        {
            "categories": [
                "Food Trucks",
                "Mexican"
            ],
            "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/aA3-VCiqIB_choNNNdQEYQ/o.jpg",
            "restaurantYelpId": "9tVJwdzAtNzCTBfk3O8hfw",
            "createdAt": "2019-07-19T17:23:05.440Z",
            "updatedAt": "2019-07-19T17:23:05.440Z",
            "objectId": "C6kRQDoOKD"
        }
        
    ]


}