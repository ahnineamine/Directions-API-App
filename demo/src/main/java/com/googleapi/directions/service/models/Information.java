package com.googleapi.directions.service.models;

public class Information {

    String poly;
    String distance;

    public Information(String poly, String distance) {
        this.poly = poly;
        this.distance = distance;
    }

    public String getPoly() {
        return poly;
    }

    public void setPoly(String poly) {
        this.poly = poly;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "Information{" +
                "poly='" + poly + '\'' +
                ", distance='" + distance + '\'' +
                '}';
    }
}
