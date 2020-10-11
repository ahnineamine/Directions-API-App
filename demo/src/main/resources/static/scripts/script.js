var polyline;
function send() {
    //Get input values of the two points
    var fromlat = document.getElementById('fromlat').value;
    var fromlong = document.getElementById('fromlong').value;
    var tolat = document.getElementById('tolat').value;
    var tolong = document.getElementById('tolong').value;

    if (fromlat && fromlong && tolat && tolong) {
        var urlgetGoogleDirections = "http://localhost:9000/getGoogleDirections?";
        var urlgetDistance = "http://localhost:9000/getDistance?";

        //Send Promise containg the 2 fetch requests
        Promise.all([
                fetch(urlgetGoogleDirections + new URLSearchParams({
                    fromLat: fromlat,
                    fromLong: fromlong,
                    toLat: tolat,
                    toLong: tolong,
                }), {
                    method: "GET",
                })
                .then(response => response.json()),

                fetch(urlgetDistance + new URLSearchParams({
                    fromLat: fromlat,
                    fromLong: fromlong,
                    toLat: tolat,
                    toLong: tolong,
                }), {
                    method: "GET",
                })
                .then(response => response.json())
            ])
            .then(function(allresponses) {

                const response1 = allresponses[0]
                const response2 = allresponses[1]

                //Show the distance results in textarea
                document.getElementById('fetched').value = "Distance: " + response1["distance"] + "\n" + "Haversine distance: " + response2["distance"] + " km"

                //Initiate new object Map in order to display polyline
                var map = new google.maps.Map(
                    document.getElementById("map"), {
                        center: new google.maps.LatLng(Number(fromlat), Number(fromlong)),
                        zoom: 7,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                // Decode the recieved encoded polyline
                var path = google.maps.geometry.encoding.decodePath(response1['poly']);

                // Initialize object Polyline
                polyline = new google.maps.Polyline({
                    path: path,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map
                });

                // Display polyline on map
                polyline.setMap(map);
                google.maps.event.addDomListener(window, "load", send);
            });
    } else {
        alert("Please make sure to enter the coordinates in the right format");
    }
}

function reset() {

    //Basically just reset all element to initiate an other request

    document.getElementById('tolat').value = "";
    document.getElementById('tolong').value = "";
    document.getElementById('fromlat').value = "";
    document.getElementById('fromlong').value = "";
    document.getElementById('fetched').value = "";

    if (polyline) {
        polyline.setMap(null);
    }

    if (marker) {
        marker.setMap(null);
        marker = null;
    }
    initMap();
}

// Initiate the default map (on Linz *wink* *wink*)
var map;
function initMap() {
    var Linz = {
        lat: 48.3069,
        lng: 14.2858
    };
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 10,
            center: Linz
        });

    // Upon clicking on location in the map geocode the adresse (location, city, whatever ...) to the corresponding coordinates
    geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

var marker;
function placeMarker(location) {
    //once Marker is set, check if its the first time to fill the 'from coordinates', otherwise fill the 'to coordiantes' and launch the send() function 
    //N.B: the submit button is only there in case somebody enteres the coordinates manually
    if (marker) {
        marker.setPosition(location);
        document.getElementById('tolat').value = location.lat();
        document.getElementById('tolong').value = location.lng();
        send();
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map

        });
        document.getElementById('fromlat').value = location.lat();
        document.getElementById('fromlong').value = location.lng();
    }
}