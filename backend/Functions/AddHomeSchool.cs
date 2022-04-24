using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SharlotteMason.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SharlotteMason.Helpers;
using SharlotteMason.Services;

namespace SharlotteMason.Functions
{
    public class AddHomeSchool
    {
        private readonly ITableStorageService tableStorageService;

        public AddHomeSchool(ITableStorageService tableStorageService)
        {
            this.tableStorageService = tableStorageService;
        }
        [FunctionName("AddHomeSchool")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            ValidationWrapper<HomeSchool> httpResponseBody = await req.GetBodyAsync<HomeSchool>();

            if(!httpResponseBody.IsValid)
                return new BadRequestObjectResult($"Invalid input: {string.Join(",", httpResponseBody.ValidationResults.Select(s=>s.ErrorMessage).ToArray())}");

            var data = httpResponseBody.Value;

            var entity = new HomeSchool(data.FamilyName, data.CityName, data.Email) { 
                Children = data.Children,
                InterstedTopics = data.InterstedTopics,
                FirstName = data.FirstName
            };
            await tableStorageService.InsertOrMergeAsync(entity);

            return new OkObjectResult("Ok");
        }
    }
}
