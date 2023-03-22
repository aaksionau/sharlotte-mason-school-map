import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  constructor() { 
    this.homeSchools = [];
    this.updateMap();
    this.isMapView = true;
  }

  cityName: string = '';
  zoom = 5;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 21,
    minZoom: 3,
    center: this.getLocation()
  }
  markers: MarkerGroup[] = [];
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateMap();
  }

  updateMap(): void {
    this.markers = [];
    let mappedMarkers = this.homeSchools.map(s => new Marker(s.latitude, s.longitude, s.cityName));
    let groupedMarkers = this.groupBy((mappedMarkers as Array<Marker>), (s: Marker) => s.text);
    groupedMarkers.forEach((value, key) => { 
      this.markers.push(new MarkerGroup(key, value.length, value[0].position));
    })
  }
  groupBy(list: Array <any> , keyGetter: Function): Map<string, Marker[]> {
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
  getLocation(): google.maps.LatLng | undefined {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        return new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      })
    }

    return new google.maps.LatLng(43.5777766, -90.8534552);
  }
}
