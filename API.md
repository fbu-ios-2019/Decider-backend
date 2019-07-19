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