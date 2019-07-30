# API

All data returned by this API come in a json object. The routes arew as defined below:

The base url for development purposes is: 

```
https://decider-backend.herokuapp.com/
```
add the above string before every endpoint listed below:


## GET  /photos/:category/:location/:offset/
- Replace the category with the category you want. for now only the "all" category works. 
- Replace the location with a string of your location which can be in anty format
- Replace offset with a number representing how many objects to skip in the database

Response: Array of at most :count objects and their details. eg. 
```
{
    results: [
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
            "Mexican",
            "Bars"
        ],
        "imageUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/FyUPb_tsyC2FDi6pxJ1quw/o.jpg",
        "restaurantYelpId": "p-nAA9LHJc9KRH27FNe2Kw",
        "createdAt": "2019-07-19T17:23:05.351Z",
        "updatedAt": "2019-07-19T17:23:05.351Z",
        "objectId": "5CEEs0dprk"
    }
    .....
],
offset: 40,
count: 20
}

```
## GET /categories

Response: Returns an object that looks like the following.
```
{
    "results": [
        "Food Trucks",
        "Diners",
        "Ice Cream & Frozen Yogurt",
        "Breakfast & Brunch",
        "Asian Fusion",
        "Italian",
        "Coffee & Tea",
        "Bars",
        "Mexican",
        "Seafood",
    ]
}

```

## GET /restaurants/recommendations
- Takes location(string), likedPhotos(array), hatedPhotos(array) from the request body.
- Response: 3 top restaurants recommended for the user.
- Returns 3 top restaurants based on userSwipes and other restaurant parameters.

```
{
    "results": [
        {
            "hours": [],
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
            "hours": [],
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
            "hours": [],
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
}
```

## POST /restaurants/save
- Takes in the user's username (string) and restaurants yelpId(string) then saves the restaurant in the user's savedRestaurants column.
 
On success returns: 
```
{
    "success": "successfully saved restaurant"
}
```

## POST /restaurants/list
- Takes in ids (array of restaurant ids) as input
- Returns a detailed list of restaurants whose ids appear in the list 

```
{
    results =     [
                {
            address = "36088 Tollhouse Rd";
            category =             (
                Grocery,
                Bakeries,
                "Beer, Wine & Spirits"
            );
            city = "Shaver Lake";
            coordinates =             {
                latitude = "37.0667809";
                longitude = "-119.3571531";
            };
            country = US;
            coverUrl = "https://s3-media1.fl.yelpcdn.com/bphoto/H_Xap36LZ0KYZbbA096GBg/o.jpg";
            createdAt = "2019-07-19T17:26:03.859Z";
            hours = {},
            images = [
                    {
                    categories =                     (
                        Mexican,
                        Seafood,
                        Salad
                    );
                    createdAt = "2019-07-30T06:15:47.227Z";
                    imageUrl = "https://s3-media3.fl.yelpcdn.com/bphoto/Va4TNo2U1MAD3yNKfang-A/o.jpg";
                    objectId = uVqyZx3850;
                    restaurantYelpId = "HWpAVc-weWhomY7O---dXQ";
                    updatedAt = "2019-07-30T06:15:47.227Z";
                },
                    {
                    categories =                     (
                        Mexican,
                        Seafood,
                        Salad
                    );
                    createdAt = "2019-07-30T06:15:47.224Z";
                    imageUrl = "https://s3-media1.fl.yelpcdn.com/bphoto/ACkoFr8v-URyf048lEubkg/o.jpg";
                    objectId = 9ZFO2GDHsF;
                    restaurantYelpId = "HWpAVc-weWhomY7O---dXQ";
                    updatedAt = "2019-07-30T06:15:47.224Z";
                },
                    {
                    categories =                     (
                        Mexican,
                        Seafood,
                        Salad
                    );
                    createdAt = "2019-07-30T06:15:47.228Z";
                    imageUrl = "https://s3-media1.fl.yelpcdn.com/bphoto/PJNMqrJY9TS6mq6w-BsMdA/o.jpg";
                    objectId = LZI9KYK3mY;
                    restaurantYelpId = "HWpAVc-weWhomY7O---dXQ";
                    updatedAt = "2019-07-30T06:15:47.228Z";
                }
            );
            likeCount = 0;
            linkUrl = "https://www.yelp.com/biz/rubios-coastal-grill-sacramento-2?adjust_creative=3L8Y7mtIpK7UAyR0uorDHA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=3L8Y7mtIpK7UAyR0uorDHA";
            name = "Rubio's Coastal Grill";
            objectId = 9yRpcvSGWJ;
            phone = "+19164836643";
            priceRating = 1;
            rating = "3.5";
            reviewCount = 144;
            state = CA;
            unlikeCount = 0;
            updatedAt = "2019-07-30T06:15:47.198Z";
            yelpId = "HWpAVc-weWhomY7O---dXQ";
            zipcode = 95821;
        }
    ]
}

```

## GET /restaurants/:id
- Input the id of the restaurant you want details for

Response: Returns an object that looks like the following.
```
{
    "hours": [
        {
            ...
        }
    ],
    "category": [
        "Cajun/Creole",
        "American (New)",
        "Lounges"
    ],
    "coordinates": {
        "latitude": 37.4450225830078,
        "longitude": -122.161323547363
    },
    "name": "NOLA Restaurant & Bar",
    "rating": 3.5,
    "priceRating": 2,
    "likeCount": 0,
    "unlikeCount": 0,
    "phone": "+16503282722",
    "yelpId": "jwaXc3VVGDFQu1aCoiXwdw",
    "address": "535 Ramona St",
    "city": "Palo Alto",
    "state": "CA",
    "zipcode": "94301",
    "country": "US",
    "coverUrl": "https://s3-media2.fl.yelpcdn.com/bphoto/tna5SSdgZq3fFxoi4-Xx7A/o.jpg",
    "linkUrl": "https://www.yelp.com/biz/nola-restaurant-and-bar-palo-alto?adjust_creative=3L8Y7mtIpK7UAyR0uorDHA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=3L8Y7mtIpK7UAyR0uorDHA",
    "reviewCount": 2730,
    "createdAt": "2019-07-19T17:27:23.938Z",
    "updatedAt": "2019-07-19T17:27:23.938Z",
    "objectId": "ThpAl2946B",
    "images": [
        "https://s3-media2.fl.yelpcdn.com/bphoto/tna5SSdgZq3fFxoi4-Xx7A/o.jpg",
        "https://s3-media2.fl.yelpcdn.com/bphoto/pM_vZ2M2pPFhGiMgIDoi8g/o.jpg",
        "https://s3-media1.fl.yelpcdn.com/bphoto/0GjPaWleSr1VjjtYYLzM5Q/o.jpg"
    ]

}

```
## GET /cities
- takes no input

- returns a list of cities whose resrtaurants are in our database. Looks like the following:

```
{
    "results": [
        "Sunnyvale, CA",
        "Palo Alto, CA",
        "San Jose, CA",
        "Shaver Lake, CA",
        "Oakhurst, CA",
        "Bass Lake, CA",
        "Mammoth Lakes, CA",
        "Menlo Park, CA",
        "Stanford, CA"
    ]
}
```
## POST /register

- takes in username, email, password and confirmation as part of request body
- if query is successful you get back:

```
{
    "success": "user was registered successfully",
    "user": {
        "username": "ale",
        "email": "ale@abc.com",
        "createdAt": "2019-07-22T23:43:07.332Z",
        "sessionToken": "r:f9da29ae45f91aa3d8ed5cfc3346dee5",
        "updatedAt": "2019-07-22T23:43:07.332Z",
        "objectId": "LVmja20BmX"
    }
}

```

If query is unsuccesful you get the following return

```
{
    "error": "error description here"
}

```

## POST /login

- takes in username and password as part of request body
- if query is successful you get back:

```
{
    "success": "succesfully logged in",
    "user": {
        "username": "ale",
        "email": "ale@abc.com",
        "createdAt": "2019-07-22T23:43:07.332Z",
        "updatedAt": "2019-07-22T23:43:07.332Z",
        "ACL": {
            "*": {
                "read": true
            },
            "LVmja20BmX": {
                "read": true,
                "write": true
            }
        },
        "sessionToken": "r:6d047ead37eb10e91d6740d3ec7b76c7",
        "objectId": "LVmja20BmX"
    }

```

If query is unsuccesful you get the following return

```
{
    "error": "error description here"
}

```

## GET /currentUser

- takes in no parameter or body
- if query is successful you get back:

```
{
    "user": {
        "username": "ale",
        "email": "ale@abc.com",
        "createdAt": "2019-07-22T23:43:07.332Z",
        "updatedAt": "2019-07-22T23:43:07.332Z",
        "ACL": {
            "*": {
                "read": true
            },
            "LVmja20BmX": {
                "read": true,
                "write": true
            }
        },
        "sessionToken": "r:6d047ead37eb10e91d6740d3ec7b76c7",
        "objectId": "LVmja20BmX"
    }
}

```

## POST /logout

- takes in no parameters

- on success:
```
{
    "success": "logout was successful"
}

```

on failure:

```
{
    "error": "error description here"
}

```



