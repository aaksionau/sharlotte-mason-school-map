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
using SharlotteMason.Helpers;
using SharlotteMason.Services;

namespace SharlotteMason.Functions
{
    public class SendMessageToOwner
    {
        private readonly ITableStorageService tableStorageService;
        private readonly IEmailSender emailSender;

        public SendMessageToOwner(ITableStorageService tableStorageService, IEmailSender emailSender)
        {
            this.tableStorageService = tableStorageService ?? throw new ArgumentNullException(nameof(tableStorageService));
            this.emailSender = emailSender ?? throw new ArgumentNullException(nameof(emailSender));
        }
        [FunctionName("SendMessageToOwner")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            ValidationWrapper<MessageDto> httpResponseBody = await req.GetBodyAsync<MessageDto>();

            if (!httpResponseBody.IsValid)
                return new BadRequestObjectResult($"Invalid input: {string.Join(",", httpResponseBody.ValidationResults.Select(s => s.ErrorMessage).ToArray())}");

            var data = httpResponseBody.Value;

            var school = await tableStorageService.RetrieveAsync(data.HomeSchoolId, "homeschool");
            if(school == null)
                return new NotFoundObjectResult(data.HomeSchoolId);

            string pathToTemplate = Path.Combine(context.FunctionAppDirectory, "emails", "messageToOwner.html");
            var emailMessage = new EmailMessage(data, school, pathToTemplate);
            await this.emailSender.SendMessage(emailMessage);

            return new OkObjectResult(emailMessage);
        }
    }
}
