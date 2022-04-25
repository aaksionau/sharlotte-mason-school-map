using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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

            ValidationWrapper<HomeSchoolDto> httpResponseBody = await req.GetBodyAsync<HomeSchoolDto>();

            if (!httpResponseBody.IsValid)
                return new BadRequestObjectResult($"Invalid input: {string.Join(",", httpResponseBody.ValidationResults.Select(s => s.ErrorMessage).ToArray())}");

            var data = httpResponseBody.Value;

            var entity = new HomeSchool(data);
            entity.AddChildren(data.Children);
            entity.InterstedTopics = data.InterstedTopics;
            entity.FirstName = data.FirstName;
            await tableStorageService.InsertOrMergeAsync(entity);

            return new OkObjectResult("Ok");
        }
    }
}
