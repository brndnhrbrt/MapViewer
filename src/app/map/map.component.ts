import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polyline, Polyline, layerGroup } from 'leaflet';

import { MapJsonService } from '../map-json.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  maxZoom: 18, minZoom: 3, attribution: '...',  })
    ],
    zoom: 4,
    center: latLng(46.879966, -121.726909)
  };

  layersControl = { overlays: {} };

  flipCoords(coords: any[]): any[] {
    coords.forEach(element => {
      element.forEach(sub => {
        sub.reverse();
      });
    });
    return coords;
  }

  implementCountryOutline(): void {
    this.mapService.getOutline5mJSON()
      .subscribe(json => {
        var group = layerGroup();
        var countryPoly: Polyline;
        var countryOutlineFeatures = [];
        var jsonFeatures = json.features;
        jsonFeatures.forEach(element => {
          countryOutlineFeatures.push(element.geometry.coordinates);
        });
        countryPoly = polyline(this.flipCoords(countryOutlineFeatures) , { color: 'red' });
        group.addLayer(countryPoly);
        this.layersControl.overlays['Country Outline'] = group;
      });
  }

  implementStates(): void {
    this.mapService.getStateOutline5mJSON()
      .subscribe(json => {
        var group = layerGroup();
        var jsonFeatures = json.features;
        jsonFeatures.forEach(element => {
          var newPoly: Polyline;
          var coords = element.geometry.coordinates;
          var flag = false;
          coords.forEach(sub => {
            if(sub.length > 2)
              flag = true;
          });
          if(!flag) {
            coords.forEach(sub => {
              newPoly = polyline(this.flipCoords(sub), { color: '#4dffa6', fillColor: '#b3ffd9', fill: true, fillOpacity: .7, opacity: 1 });
              group.addLayer(newPoly);
            });
          } else {
            newPoly = polyline(this.flipCoords(element.geometry.coordinates), { color: '#4dffa6', fillColor: '#b3ffd9', fill: true, fillOpacity: .7, opacity: 1 });
            group.addLayer(newPoly);
          }
          this.layersControl.overlays['States'] = group;
        });
      });
    }

    implementCounty(): void {
      this.mapService.getCountiesOutline5mJSON()
        .subscribe(json => {
          var group = layerGroup();
          var jsonFeatures = json.features;
          jsonFeatures.forEach(element => {
            var newPoly: Polyline;
            var coords = element.geometry.coordinates;
            var flag = false;
            coords.forEach(sub => {
              if(sub.length > 2)
                flag = true;
            });
            if(!flag) {
              coords.forEach(sub => {
                newPoly = polyline(this.flipCoords(sub), { color: '#8800cc', fillColor: '#e6b3ff', fill: true, fillOpacity: 0.3, opacity: 1 });
                group.addLayer(newPoly);
              });
            } else {
              newPoly = polyline(this.flipCoords(element.geometry.coordinates), { color: '#8800cc', fillColor: '#e6b3ff', fill: true, fillOpacity: 0.3, opacity: 1});
              group.addLayer(newPoly);
            }
            this.layersControl.overlays['Counties'] = group;
          });
        });
    }

    implementCongress(): void {
      this.mapService.getCongressOutline5mJSON()
        .subscribe(json => {
          var group = layerGroup();
          var jsonFeatures = json.features;
          jsonFeatures.forEach(element => {
            var newPoly: Polyline;
            var coords = element.geometry.coordinates;
            var flag = false;
            coords.forEach(sub => {
              if(sub.length > 2)
                flag = true;
            });
            if(!flag) {
              coords.forEach(sub => {
                newPoly = polyline(this.flipCoords(sub), { color: '#e67300', fillColor: '#ffcc99', fill: true, fillOpacity: 0.5, opacity: 1.0 });
                group.addLayer(newPoly);
              });
            } else {
              newPoly = polyline(this.flipCoords(element.geometry.coordinates), { color: '#e67300', fillColor: '#ffcc99', fill: true, fillOpacity: 0.5, opacity: 1.0 });
              group.addLayer(newPoly);
            }
            this.layersControl.overlays['Congressional'] = group;
          });
        });
    }

  constructor(private mapService: MapJsonService) { }

  ngOnInit() {
    this.implementCongress();
    this.implementCounty();
    this.implementStates();
    this.implementCountryOutline();
  }

}
