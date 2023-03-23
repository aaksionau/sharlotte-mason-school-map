using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SharlotteMason.Dtos;
using SharlotteMason.Entities;
using SharlotteMason.Helpers;
using SharlotteMason.Services;

namespace SharlotteMason.Functions
{
    public class SaveHomeSchool
    {
        private readonly ITableStorageService tableStorageService;
        private readonly IGoogleGeoLocationService googleGeoLocationService;
        private readonly IEmailSender emailSender;

        public SaveHomeSchool(
            ITableStorageService tableStorageService,
            IGoogleGeoLocationService googleGeoLocationService, 
            IEmailSender emailSender)
        {
            this.tableStorageService = tableStorageService;
            this.googleGeoLocationService = googleGeoLocationService ?? throw new ArgumentNullException(nameof(googleGeoLocationService));
            this.emailSender = emailSender ?? throw new ArgumentNullException(nameof(emailSender));
        }
        [FunctionName("SaveHomeSchool")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            ValidationWrapper<HomeSchoolDto> httpResponseBody = await req.GetBodyAsync<HomeSchoolDto>();

            if (!httpResponseBody.IsValid)
                return new BadRequestObjectResult($"Invalid input: {string.Join(",", httpResponseBody.ValidationResults.Select(s => s.ErrorMessage).ToArray())}");

            var data = httpResponseBody.Value;

            if(string.IsNullOrEmpty(data.Id))
                data.Id = Guid.NewGuid().ToString();

            var entity = new HomeSchool(data.Id, data);
            entity.AddChildren(data.Children);

            var coordinates = this.googleGeoLocationService.GetCoordinates(data);
            entity.SetCoordinates(coordinates);

            await tableStorageService.InsertOrMergeAsync(entity);

            string pathToTemplate = Path.Combine(context.FunctionAppDirectory, "emails", "homeSchoolDetails.html");
            var emailMessage = new EmailMessage(entity, pathToTemplate);
            await this.emailSender.SendMessage(emailMessage);


            return new OkObjectResult(entity.Id);
        }
    }
}
