using System;
using System.IO;
using SharlotteMason.Dtos;
using SharlotteMason.Entities;

namespace SharlotteMason.Helpers
{
    public class EmailMessage
    {
        private string templateName;
        private HomeSchool homeSchool;
        public EmailMessage(MessageDto dto, HomeSchool homeSchool, string templateName)
        {
            this.To = homeSchool.Email;
            this.From = dto.Email;
            this.Subject = "Message from the user of MN Charlotte Mason Home School App";
            this.Body = dto.Body;
            this.templateName = templateName;
            this.homeSchool = homeSchool;
            this.Message = dto;

            this.SetHtmlBody();
        }

        public EmailMessage(HomeSchool homeSchool, string templateName)
        {
            this.To = homeSchool.Email;
            this.Subject = "Thank you for adding your CM homeschool to our map.";
            this.homeSchool = homeSchool;

            SetHtmlBody();
        }

        public string To { get; set; }
        public string From { get; set; }
        public string Subject { get; set; }
        public string Html { get; set; }
        public string Body { get; set; }
        public MessageDto Message { get; set; }
        
        public void SetHtmlBody() {
            Html = File.ReadAllText(this.templateName);

            Html = Html.Replace("{{FamilyName}}", this.homeSchool.FamilyName);
            Html = Html.Replace("{{HomeSchoolId}}", this.homeSchool.Id);
            Html = Html.Replace("{{Name}}", this.Message.Name);
            Html = Html.Replace("{{Body}}", this.Body);
            Html = Html.Replace("{{Email}}", this.From);
        }
    }
}