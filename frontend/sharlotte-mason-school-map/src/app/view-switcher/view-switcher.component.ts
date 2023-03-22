import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.css']
})
export class ViewSwitcherComponent implements OnInit {

  constructor() { }
  @Output() onSwitch = new EventEmitter<boolean>();
  isMapView: boolean = true;
  ngOnInit(): void {
  }

  switchView(view:string){
    this.isMapView = view == "map"? true : false;
    this.onSwitch.emit(this.isMapView);
  }
}
