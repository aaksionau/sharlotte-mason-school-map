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
using SharlotteMason.Services;

namespace SharlotteMason.Functions
{
    public class GetHomeSchools
    {
        private readonly ITableStorageService tableStorageService;

        public GetHomeSchools(ITableStorageService tableStorageService)
        {
            this.tableStorageService = tableStorageService;
        }
        [FunctionName("GetHomeSchools")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var schools = await tableStorageService.GetListAsync();
            return new OkObjectResult(JsonConvert.SerializeObject(schools.Select(s=>s.GetDto())));
        }
    }
}
