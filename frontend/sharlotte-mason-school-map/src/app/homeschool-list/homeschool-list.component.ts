import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { Child } from 'src/models/child';
import { HomeSchool } from 'src/models/homeSchool';
import { Marker } from 'src/models/marker';
import { MarkerGroup } from 'src/models/markerGroup';
import { HomeschoolService } from 'src/services/homeschool.service';

@Component({
  selector: 'app-homeschool-list',
  templateUrl: './homeschool-list.component.html',
  styleUrls: ['./homeschool-list.component.css']
})
export class HomeschoolListComponent implements OnInit, OnChanges {

  constructor(private homeSchoolService: HomeschoolService) { }
  homeSchools: HomeSchool[] = [];
  markers: MarkerGroup[] = [];
  groupedSchools: any;
  emailTo: string = '';
  nameTo: string = '';
  cityName: string = '';
  zoom = 10;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  showModal: boolean = false;
  ngOnInit(): void {
    this.getLocation();
    this.getHomeSchools(this.cityName);
  }
  sendEmail(emailTo: string, nameTo: string): void { 
    this.emailTo = emailTo;
    this.nameTo = nameTo;
    this.showModal = true;
  }
  getHomeSchools(city: string | any): void {
    this.cityName = city;
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        let mappedSchools = schools.map(s => new HomeSchool().mapSchool(s));
        if (!city) {
          this.homeSchools = mappedSchools;
        } else {
          this.homeSchools = mappedSchools.filter(s => s.cityName.toLowerCase() === city.toLowerCase());
        }
        this.updateMap();
      });
  }
  changeStatus(isVisible: boolean): void { 
    this.showModal = isVisible;
  }
  updateMap(): void {
    this.markers = [];
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        let mappedMarkers = this.homeSchools.map(s => new Marker(s.latitude, s.longitude, s.cityName));
        let groupedMarkers = this.groupBy((mappedMarkers as Array<Marker>), (s: Marker) => s.text);
        groupedMarkers.forEach((value, key) => { 
          this.markers.push(new MarkerGroup(key, value.length, value[0].position));
        })
      });
  }


  ngOnChanges(changes: SimpleChanges) {
    this.cityName = changes['cityName'].currentValue;
    this.getHomeSchools(this.cityName);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    } else {
      this.center = {
        lat: 44.977753,
        lng: -93.2650108,
      }
    }
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
}
