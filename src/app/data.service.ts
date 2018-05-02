import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tileLayer, latLng, layerGroup, polyline, Polyline, LatLngExpression, LatLng } from 'leaflet';

import { Feature } from './models/feature';
import { Coordinate } from './models/coordinate';
import { element } from 'protractor';
import { stat } from 'fs';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getUSOutline(): Observable<any> {
    return this.http.get('assets/us-outline.json');
  }

  getStates(): Observable<any> {
    return this.http.get('assets/us-states.json');
  }

  getCounties(): Observable<any> {
    return this.http.get('assets/us-counties.json');
  }

  getCongressional(): Observable<any> {
    return this.http.get('assets/us-congressional.json');
  }

  getFeatures(state: String, county: String): Observable<any> {
    var apikey = "6f8d0efdb21db8c1839c503b804f63327e504932";
    var baseURL = "https://api.census.gov/data/2013/language?get=LAN7,EST,LANLABEL,NAME";
    var forState = "&for=state:";
    var inState = "&in=state:";
    var forCounty = "&for=county:";
    var addKey = "&key=" + apikey;
    var finalUrl = "";
    if(county != null && county != undefined) {
      finalUrl = baseURL + forCounty + county + inState + state + addKey;
    } else {
      finalUrl = baseURL + forState + state + addKey;
    }
    return this.http.get(finalUrl);
  }

  parseOutlineData(data: any): Feature[] {
    var featuresArray: Feature[] = [];
    data.features.forEach(feature => {
      var coordinates = feature.geometry.coordinates;
      var newFeature = new Feature();
      coordinates.forEach(coordinate => {
        var newCoordinate: Coordinate = { longitude: coordinate[0], latitude: coordinate[1] };
        newFeature.coordinates.push(newCoordinate);
      });
      featuresArray.push(newFeature);
    });
    return featuresArray;
  }

  parseData(data: any): Feature[]  {
    var featuresArray: Feature[] = [];
    data.features.forEach(feature => {
      var coordinates = feature.geometry.coordinates;
      coordinates.forEach(coordinate => {
        if(coordinate.length > 2) {
          var newFeature = new Feature();
          if(feature.properties.STATE != null && feature.properties.STATE != "") {
            newFeature.state = feature.properties.STATE;
          }
          if(feature.properties.COUNTY != null && feature.properties.COUNTY != "") {
            newFeature.county = feature.properties.COUNTY;
          }

          coordinate.forEach(subCoordinate => {
              var newCoordinate: Coordinate = { longitude: subCoordinate[0], latitude: subCoordinate[1] };
              newFeature.coordinates.push(newCoordinate); 
          });
          featuresArray.push(newFeature);
        } else {
          var newFeature = new Feature();
          if(feature.properties.STATE != null && feature.properties.STATE != "") {
            newFeature.state = feature.properties.STATE;
          }
          if(feature.properties.COUNTY != null && feature.properties.COUNTY != "") {
            newFeature.county = feature.properties.COUNTY;
          }
          coordinate.forEach(subCoordinateSet => {
            subCoordinateSet.forEach(subCoordinate => {
              var newCoordinate: Coordinate = { longitude: subCoordinate[0], latitude: subCoordinate[1] };
              newFeature.coordinates.push(newCoordinate);
            });
          });
          featuresArray.push(newFeature);
        }
      });
    });
    return featuresArray;
  }

  simplifyData(feature: Feature): LatLng[] {
    var numarray: LatLng[]= [];
    feature.coordinates.forEach(coordinate => {
      numarray.push(latLng(coordinate.latitude, coordinate.longitude));
    });
    return numarray;
  }

}
