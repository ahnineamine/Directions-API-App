# Directions-API-App
A demo Map Application based on Google's Directions API/Javascript API.  
  
## Features  
  
The application utilizes Google's Javascript API to display a map on a predetermined location.  
Selecting two points from the map will automatically set them as the ```to``` and ```from``` locations respectively and as such draw a polyline between the two points in addition to displaying the distance and the Haversine distance.  
The coordinates of the locations can also be submitted manually through a form.  

## Project Structure  
  
The project contains two major blocks:  
  
### Backend  
  
Spring Boot REST service with the following two methods:  
  
```GET /getGoogleDirections?fromLat=...&fromLong=...&toLat=...&toLong=...```  
  
* Calls the google directions api to calculate the directions between the coordinates specified in the request parameters.  
* Returns a json object with two fields:  
```poly``` : the overview polyline of the route that should later be displayed in the frontend and  
```distance``` : The driving distance of the route in kilometers  
  
```GET /getDistance?fromLat=...&fromLong=...&toLat=...&toLong=...```  
* Returns the haversine distance between the from and to coordinates in a json format  
  
### Frontend  
A screen that consists of input fields for the two points (to and from) and a map (google
maps, leaflet, etc.) and an output label. Clicking to two points on the map in sequence should also
set them as ```to``` and ```from``` coordinates, respectively. When two points are input, the application
should call both REST services and display the results: The polyline from getGoogleDirections
should be drawn on the map, and the two distances should be displayed in a text box.  
  
## How to  
Running the ```Application.java``` will launch the application, rendering it accessible via port 9000.  
Accessing ```http://localhost:9000``` will display the index page.  
  
## Project's source tree 
```
├───main
│   ├───java
│   │   └───com
│   │       └───googleapi
│   │           └───directions
│   │               ├───config
│   │               └───service
│   │                   ├───controllers
│   │                   └───models
│   └───resources
│       ├───static
│       │   ├───images
│       │   ├───scripts
│       │   └───style
│       └───templates
└───test
    ├───java
    │   └───com
    │       └───googleapi
    │           └───directions
    └───resources
```
