export class Marker { 
    constructor(
        public lat: number,
        public lng: number,
        public text: string
    ) { 
    }
    public position: google.maps.LatLng = new google.maps.LatLng(this.lat, this.lng);
    public label: google.maps.MarkerLabel = { text: this.text, color: 'red' };
    public options: google.maps.MarkerOptions = { animation: google.maps.Animation.DROP };
}