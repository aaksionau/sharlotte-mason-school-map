import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-auto-complete-search',
  template: `
      <input class="input"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext
        >
    `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  @Input() componentCity: string = '';

  autocompleteInput: string = '';
  queryWait: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.autocompleteInput = changes['componentCity'].currentValue;
  }
  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: ['locality']
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }


}