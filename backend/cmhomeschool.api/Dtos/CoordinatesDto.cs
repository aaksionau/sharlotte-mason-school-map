using GoogleMaps.LocationServices;

namespace SharlotteMason.Dtos
{
    public class CoordinatesDto
    {
        public CoordinatesDto(MapPoint point)
        {
            Latitude = point.Latitude;
            Longitude = point.Longitude;
        }
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }
    }
}