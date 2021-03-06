using backend.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using SharlotteMason.Services;

[assembly: FunctionsStartup(typeof(SharlotteMason.Startup))]
namespace SharlotteMason
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddScoped<ITableStorageService, TableStorageService>();
            builder.Services.AddScoped<IGoogleGeoLocationService, GoogleGeoLocationService>();
            builder.Services.AddScoped<IEmailSender, EmailSender>();
            builder.Services.AddLogging();
        }
    }
}