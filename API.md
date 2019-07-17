#API

All data returned by this API come in a json object. The routes arew as defined below:

The base url for development purposes is: 

```
http://localhost:1337
```
add the above string before every endpoint listred below:


## GET  /restaurants/<category>/<location>
Replace the restaurant type (cuisine available with the type you want eg. Mexican, Thai etc)

Response: Array of 5 restaurants and their details. eg. 
```
{
    "results": [
    {
        
        "id": "WavvLdfdP6g8aZTtbBQHTw",
        "alias": "gary-danko-san-francisco",
        "name": "Gary Danko",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg"
    },
    {
        "id": "23dLdfdP6g8aZTtbBQHTz",
        "alias": "maria-pancakes-san-francisco",
        "name": "Pancake house",
        "image_url": "https://www.wonderparenting.com/wp-content/uploads/2019/04/cinnamon-banana-pancakes-wonderparenting.jpeg"
    },

    {
        "id": "ZenvLfddP6g5aXItbBQDHq",
        "alias": "kate-tasties-sunnyvale",
        "name": "kate tasties",
        "image_url": "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
    ]
}
```