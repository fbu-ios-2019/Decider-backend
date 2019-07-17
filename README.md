This is the backend repo for the Decider application.

To run the server follow the instructions below
- make sure you have node installed by runnning node --version. If not follow instructions online on how to download node.js
- run npm i
- run npm install -g parse-server mongodb-runner
- run mongodb-runner start
- run node index.js

To add a sample object to the parse server run the following command on a different terminal

curl -X POST \
-H "X-Parse-Application-Id: decider-fbu" \
-H "Content-Type: application/json" \
-d '{"score":1337,"playerName":"Maria Pestana","cheatMode":false}' \
http://localhost:1337/parse/classes/GameScore


To retrieve a sample object with id objectId run the following command and replace <objectId> with the actual ID of the object.
curl -X GET \
  -H "X-Parse-Application-Id: decider-fbu" \
  http://localhost:1337/parse/classes/GameScore/<objectId>

To run the parse darshboard do this command in a different terminal window and follow the url returned.
  parse-dashboard --appId decider-fbu --masterKey mmk --serverURL "https://decider-fbu.herokuapp.com/parse"
