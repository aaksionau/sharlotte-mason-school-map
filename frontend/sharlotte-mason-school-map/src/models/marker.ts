import { HomeSchool } from "./homeSchool";

export class Marker {
    constructor(
        public lat: number,
        public lng: number,
        public text: string,
        public school: HomeSchool
    ) {
    }
    public options: google.maps.MarkerOptions = {
        animation:
            google.maps.Animation.DROP,
        //icon: './../assets/images/school.svg',

        shape: {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: "poly",
        },
    };
    public position: google.maps.LatLng = new google.maps.LatLng(this.lat, this.lng);
}