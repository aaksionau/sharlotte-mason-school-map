export class Marker { 
    constructor(
        public lat: number,
        public lng: number,
        public text: string
    ) { 
    }
    public position: google.maps.LatLng = new google.maps.LatLng(this.lat, this.lng);
}