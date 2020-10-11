package com.googleapi.directions.service.controllers;

import com.googleapi.directions.service.models.Information;
import com.google.maps.*;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
public class DistanceController {
    //Google API key
    private static final String API_KEY = "AIzaSyCXHLbuGcEMsO5uReok4iMWyNn6JAstprU";
    //Initiate Geo API context
    private static final GeoApiContext context = new GeoApiContext.Builder().apiKey(API_KEY).build();

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(path = "/getGoogleDirections", method = RequestMethod.GET )
    public Information getDirections(@RequestParam double fromLat, @RequestParam double fromLong, @RequestParam double toLat, @RequestParam double toLong) throws IOException {

        LatLng departure = new LatLng(fromLat, fromLong);
        LatLng arrival = new LatLng(toLat, toLong);

        try {
            //send request to Directions API
            DirectionsApiRequest req = DirectionsApi.newRequest(context);

            DirectionsApi.RouteRestriction routeRestriction = DirectionsApi.RouteRestriction.TOLLS;

            DirectionsResult Directions = req.origin(departure)
                    .destination(arrival)
                    .mode(TravelMode.DRIVING)
                    .avoid(routeRestriction)
                    .language("en-EN")
                    .await();

            //Get the overview polyline and distance from response
            if (Directions.routes.length > 0){

                String distance = Directions.routes[0].legs[0].distance.humanReadable;
                String poly = Directions.routes[0].overviewPolyline.getEncodedPath();

                //return Object Information (Spring takes cares of serialization)
                return new Information(poly, distance);

            }

            }catch (ApiException e) {
            System.out.println(e.getMessage());
            } catch (Exception e) {
            System.out.println(e.getMessage());
            }

        return null;
    }
    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(path = "/getDistance", method = RequestMethod.GET )
    public Information getHaversineDistance(@RequestParam double fromLat, @RequestParam double fromLong, @RequestParam double toLat, @RequestParam double toLong){

        double dLat = Math.toRadians(toLat - fromLat);
        double dLon = Math.toRadians(toLong - fromLong);

        // convert to radians
        fromLat = Math.toRadians(fromLat);
        toLat = Math.toRadians(toLat);

        // apply formulae
        double a = Math.pow(Math.sin(dLat / 2), 2) +
                Math.pow(Math.sin(dLon / 2), 2) *
                        Math.cos(fromLat) *
                        Math.cos(toLat);
        double rad = 6371;
        double c = 2 * Math.asin(Math.sqrt(a));

        double haversine = rad * c;

        return new Information(null, String.valueOf(haversine));
    }

    }
