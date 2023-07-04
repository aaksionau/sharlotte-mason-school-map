import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { HomeSchool } from 'src/models/homeSchool';
import { Marker } from 'src/models/marker';
import { MarkerGroup } from 'src/models/markerGroup';

@Component({
  selector: 'app-homeschool-map',
  templateUrl: './homeschool-map.component.html',
  styleUrls: ['./homeschool-map.component.css']
})
export class HomeschoolMapComponent implements OnInit, OnChanges {
  @Input() homeSchools: HomeSchool[];
  @Input() isMapView: boolean;
  @ViewChild(MapInfoWindow, { static: false }) info?: MapInfoWindow;

  constructor() {
    this.homeSchools = [];
    this.updateMap();
    this.isMapView = true;
    this.currentSchools = [];
  }
  currentSchools: HomeSchool[];
  cityName: string = '';
  zoom = 9;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 21,
    center: this.getLocation()
  }
  groupMarkers: MarkerGroup[] = [];
  markers: Marker[] = [];
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateMap();
  }

  updateMap(): void {
    this.markers = [];
    this.groupMarkers = [];
    let mappedMarkers = this.homeSchools.map(s => new Marker(s.latitude, s.longitude, s.cityName, s));
    let groupedMarkers = this.groupBy((mappedMarkers as Array<Marker>), (s: Marker) => s.text);
    groupedMarkers.forEach((value, key) => {
      if (value.length > 1) {
        this.groupMarkers.push(new MarkerGroup(key, value.length, value[0].position, value.map(s => s.school)));
      } else {
        let data = value[0];
        let marker = new Marker(data.lat, data.lng, data.text, data.school);
        this.markers.push(marker);
      }
    })
  }
  groupBy(list: Array<any>, keyGetter: Function): Map<string, Marker[]> {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  getSchools() {
    return this.currentSchools;
  }
  getLocation(): google.maps.LatLng | undefined {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      })
    }

    return new google.maps.LatLng(44.9706674, -93.3438783);
  }
  openInfo(marker: MapMarker, schools: HomeSchool[]) {
    this.currentSchools = schools;
    this.info?.open(marker);
  }
}
