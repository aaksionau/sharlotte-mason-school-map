using System.Net;
using GoogleMaps.LocationServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SharlotteMason.Dtos;

namespace SharlotteMason.Services
{
    public interface IGoogleGeoLocationService
    {
        CoordinatesDto GetCoordinates(HomeSchoolDto homeSchool);
    }

    public class GoogleGeoLocationService : IGoogleGeoLocationService
    {
        private readonly IConfiguration configuration;
        private readonly ILogger<GoogleGeoLocationService> log;

        public GoogleGeoLocationService(
            IConfiguration configuration,
            ILogger<GoogleGeoLocationService> log)
        {
            this.configuration = configuration ?? throw new System.ArgumentNullException(nameof(configuration));
            this.log = log ?? throw new System.ArgumentNullException(nameof(log));
        }

        public CoordinatesDto GetCoordinates(HomeSchoolDto homeSchool)
        {
            try
            {
                var gls = new GoogleLocationService(apikey: this.configuration.GetValue<string>("GoogleAPIKey"));
                var address = new AddressData()
                {
                    City = homeSchool.CityName,
                    State = homeSchool.State
                };

                var latlong = gls.GetLatLongFromAddress(address);

                return new CoordinatesDto(latlong);
            }
            catch (WebException ex)
            {
                this.log.LogError($"Google Maps API error for address: {homeSchool.CityName}, {homeSchool.State}", ex.Message);
            }
            return new CoordinatesDto(new MapPoint());
        }
    }
}