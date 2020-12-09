# Animals in need

Animal in need locator allows users to share the location of animals in need they might find anywhere using google places where a cat head emoji is placed on google maps. Users can then find the animal in need location on the map.
https://animalsinneedlocator.herokuapp.com/

## Motivation

People find volunrable animals all te times but in many cases they dont know what to do or how to reach out for help. This app is a MVP(minimum viable product) and can serve the purpose better with added feautres.

## Features

- Sign-up
- Log-in
- Logout
- Authentication(JWT)
- Add animal in need (description and location from google plaes autocomplete)
- Google maps
- Google places
- Change passwrod

## Screenshots

[![sign-up.png](https://i.postimg.cc/0NwSxXTW/sign-up.png)](https://postimg.cc/jWR24cdP)

[![log-in.png](https://i.postimg.cc/SsbMK7qy/log-in.png)](https://postimg.cc/zLpBthVM)

[![map.png](https://i.postimg.cc/fRFdGQrS/map.png)](https://postimg.cc/G4F9DVrb)

## Tech/framework used

- React for front End
- Sequelize as ORM
- GraphQL for API calls
- JWT for authentication

## How to use

- change Config.json file for development
- change client/src/index.js prod to dev
- add goole api key
