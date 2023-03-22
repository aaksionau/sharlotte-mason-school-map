import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, ViewChild } from '@angular/core';
import citiesJson from './usaCities.json';
@Component({
  selector: 'app-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
  styleUrls: ['./auto-complete-search.component.css']
})
export class AutoCompleteSearchComponent implements OnInit {

  constructor() {
    this.componentCity = '';
  }
  keyword = 'City';
  cities: Array<string> = citiesJson.filter(s => s.state == 'Minnesota').map(item => item.city);
  @ViewChild('auto') auto: any;
  @Output() emitData = new EventEmitter<string>();
  @Input() componentCity: string;
  @ViewChild('autocompleteField') autocompleteField: any;
  ngOnInit(): void {
  }
  selectEvent(item: string) {
    this.emitData.emit(item);
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.auto)
      this.auto.close();

    this.componentCity = changes['componentCity'].currentValue;
    if(this.autocompleteField)
      this.autocompleteField.initialValue = this.componentCity;
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:void){
    // do something when input is focused
  }
}
