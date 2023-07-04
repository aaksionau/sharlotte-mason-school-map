import { HomeSchool } from "./homeSchool";

export class MarkerGroup {
    constructor(
        public cityName: string,
        public quantity: number,
        public position: google.maps.LatLng,
        public homeSchools: HomeSchool[]
    ) { }
    public label: google.maps.MarkerLabel = { text: this.quantity.toString(), color: '#333' };
    public options: google.maps.MarkerOptions = { animation: google.maps.Animation.DROP };
    public icon: any = this.getIcon()
    public getIcon() {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            fillColor: '#fadb07',
            strokeOpacity: 1,
            strokeWeight: 1,
            strokeColor: '#333',
            scale: 15
        };
    }
}