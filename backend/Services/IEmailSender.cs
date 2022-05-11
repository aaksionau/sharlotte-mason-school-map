using System.Text;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SharlotteMason.Helpers;

namespace backend.Services
{
    public interface IEmailSender
    {
        Task SendMessage(EmailMessage message);
    }

    public class EmailSender : IEmailSender
    {
        private readonly HttpClient client;
        private readonly IConfiguration configuration;

        public EmailSender(
            HttpClient client,
            IConfiguration configuration)
        {
            this.client = client;
            this.configuration = configuration;
        }

        public async Task SendMessage(EmailMessage message)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, this.configuration["LogicGmailApp"]);
            request.Content = new StringContent(JsonConvert.SerializeObject(message), Encoding.UTF8, "application/json");
            await client.SendAsync(request);
        }
    }
}