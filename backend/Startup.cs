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
        }
    }
}