import { Component, OnInit, ViewChild, ApplicationRef, NgZone, Input } from '@angular/core';
import { tileLayer, latLng, layerGroup, polyline, Polyline, LatLngExpression, polygon, circle, LeafletEvent } from 'leaflet';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from '../data.service';

import { Feature } from '../models/feature';
import { Coordinate } from '../models/coordinate';
import { stat } from 'fs';
import { NgClass } from '@angular/common';
import { globalAgent } from 'http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ state }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="info-panel">
        <li class="languageList" *ngFor="let language of languageArray">
            {{ language.cat }} - <b>Est. Population: {{ language.est }}</b>
        </li>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  closeResult: string;

  showLanguages: Boolean = false;
  languageArray: String[];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  maxZoom: 18, minZoom: 3, attribution: '...',  })
    ],
    zoom: 4,
    center: latLng(39, -86)
  };

  layersControl = { overlays: {} };

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    // public activeModal: NgbActiveModal,
    public zone: NgZone
  ) { }

  ngOnInit() {
    this.implementUSOutline();
    this.implementUSStates();
    this.implementUSCounties();
    this.implementUSCongressional();
  }

  open(languageArray: String[], title: String) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.languageArray = languageArray;
    modalRef.componentInstance.state = title;
  }

  mapClicked(feature: Feature): void {
    this.dataService.getFeatures(feature.state, feature.county).subscribe(data => {
      var stringArray: any[] = [];
      if(data != null) {
        var Name = data[1][3];
        console.log(data);
        var flag = true;
        data.forEach(element => {
          if(!flag) {
            var est = element[1];
            var cat = element[2];
            var together = { est: String, cat: String};
            together.est = est;
            together.cat = cat;
            stringArray.push(together);
          }
          flag = false;
        });
        this.zone.run(() => this.open(stringArray, Name));
      } else {
        this.zone.run(() => this.open(null, "No data could be found..."));
      }
    });
  }

  implementUSOutline(): void {
    this.dataService.getUSOutline()
    .subscribe(resp => {
      var group = layerGroup();
      var features: Feature[] = this.dataService.parseOutlineData(resp);      
      features.forEach(feature => {
        var coords = this.dataService.simplifyData(feature);
        var featurePoly = polyline(coords, { color: 'red' });
        group.addLayer(featurePoly);
      });
      this.layersControl.overlays['Country Outline'] = group;
    });
  }

  implementUSStates(): void {
    this.dataService.getStates()
    .subscribe(resp => {
      var group = layerGroup();
      var features: Feature[] = this.dataService.parseData(resp);      
      features.forEach(feature => {
        var coords = this.dataService.simplifyData(feature);
        var featurePoly = polyline(coords, { color: '#4dffa6', fillColor: '#b3ffd9', fill: true, fillOpacity: .7, opacity: 1 });
        featurePoly.on('click', res => {
          this.mapClicked(feature);
        });
        group.addLayer(featurePoly);
      });
      this.layersControl.overlays['States'] = group;
    });
  }
  
  implementUSCounties(): void {
    this.dataService.getCounties()
    .subscribe((resp) => {
      var group = layerGroup();
      var features: Feature[] = this.dataService.parseData(resp);      
      features.forEach((feature) => {
        var coords = this.dataService.simplifyData(feature);
        var featurePoly = polyline(coords, { color: '#8800cc', fillColor: '#e6b3ff', fill: true, fillOpacity: 0.3, opacity: 1 });
        featurePoly.on('click', res => {
          this.mapClicked(feature);
        });
        group.addLayer(featurePoly);
      });
      this.layersControl.overlays['Counties'] = group;
    });
  }
  
  implementUSCongressional(): void {
    this.dataService.getCongressional()
    .subscribe(resp => {
      var group = layerGroup();
      var features: Feature[] = this.dataService.parseData(resp);      
      features.forEach(feature => {
        var coords = this.dataService.simplifyData(feature);
        var featurePoly = polyline(coords, { color: '#e67300', fillColor: '#ffcc99', fill: true, fillOpacity: 0.5, opacity: 1.0 });
        featurePoly.on('click', res => {
          this.mapClicked(feature);
        });
        group.addLayer(featurePoly);
      });
      this.layersControl.overlays['Congressional Districts'] = group;
    });
  }

}
