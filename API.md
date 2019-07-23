#API

All data returned by this API come in a json object. The routes arew as defined below:

The base url for development purposes is: 

```
https://decider-backend.herokuapp.com/
```
add the above string before every endpoint listed below:


## GET  /photos/:category/:location/:offset/:count
- Replace the category with the category you want. for now only the "all" category works. 
- Replace the location with a string of your location which can be in anty format
- Replace offset with a number representing how many objects to skip in the database
- Replace count with the number of objects you want.

Response: Array of at most :count objects and their details. eg. 
```
[
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
]
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
        "Sunnyvale",
        "Palo Alto",
        "San Jose",
        "Shaver Lake",
        "Oakhurst",
        "Bass Lake",
        "Mammoth Lakes",
        "Menlo Park",
        "Stanford"
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


