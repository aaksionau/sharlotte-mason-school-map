using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SharlotteMason.Services;

namespace SharlotteMason.Functions
{
    public class GetHomeSchoolById
    {
        private readonly ITableStorageService tableStorageService;

        public GetHomeSchoolById(ITableStorageService tableStorageService)
        {
            this.tableStorageService = tableStorageService ?? throw new ArgumentNullException(nameof(tableStorageService));
        }
        [FunctionName("GetHomeSchoolById")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string id = req.Query["id"];

            if (string.IsNullOrEmpty(id)) return new BadRequestResult();

            var school = await tableStorageService.RetrieveAsync(id, "homeschool");
            if(school == null)
                return new NotFoundObjectResult(id);

            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return new OkObjectResult(JsonConvert.SerializeObject(school.GetDto(), serializerSettings));
        }
    }
}
