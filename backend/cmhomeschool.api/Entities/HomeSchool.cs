using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;
using SharlotteMason.Dtos;

namespace SharlotteMason.Entities
{
    public class HomeSchool : TableEntity
    {
        public HomeSchool()
        {
        }
        public HomeSchool(string id, HomeSchoolDto dto) : base(id, "homeschool")
        {
            Id = id;
            FamilyName = dto.FamilyName;
            FirstName = dto.FirstName;
            CityName = dto.CityName;
            State = dto.State;
            Email = dto.Email;
            PhoneNumber = dto.PhoneNumber;
            AboutGroup = dto.AboutGroup;
            AboutGroupUrl = dto.AboutGroupUrl;

            InterestCMBookStudy = dto.InterestCMBookStudy;
            InterestFriends = dto.InterestFriends;
            InterestNatureWalks = dto.InterestNatureWalks;
            InterestCoop = dto.InterestCoop;

            LeadingBookStudy = dto.LeadingCMBookStudy;
            LeadingCMCoop = dto.LeadingCoop;
            LeadingMentoring = dto.LeadingMentoring;
            LeadingNatureWalks = dto.LeadingNatureWalks;
            LeadingOther = dto.LeadingOther;
        }
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Email { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public string PhoneNumber { get; set; }
        public string AboutGroup { get; set; }
        public string AboutGroupUrl { get; set; }
        public bool InterestCMBookStudy { get; set; }
        public bool InterestNatureWalks { get; set; }
        public bool InterestCoop { get; set; }
        public bool InterestFriends { get; set; }
        public string LeadingOther { get; set; }
        public string LeadingCMCoop { get; set; }
        public string LeadingBookStudy { get; set; }
        public string LeadingNatureWalks { get; set; }
        public string LeadingMentoring { get; set; }
        public string ChildrenJSON { get; set; }
        public DateTimeOffset Added { get; set; } = DateTimeOffset.Now;
        public double Longitude { get; set; }
        public double Latitude { get; set; }

        public List<ChildDto> GetChildren()
        {
            if (!string.IsNullOrEmpty(ChildrenJSON))
                return JsonConvert.DeserializeObject<List<ChildDto>>(ChildrenJSON);
            return new List<ChildDto>();
        }
        public void AddChildren(List<ChildDto> children)
        {
            if (children != null && children.Count > 0)
                ChildrenJSON = JsonConvert.SerializeObject(children);
        }

        public void SetCoordinates(CoordinatesDto coordinates)
        {
            Longitude = coordinates.Longitude;
            Latitude = coordinates.Latitude;
        }

        public HomeSchoolDto GetDto()
        {
            return new HomeSchoolDto()
            {
                Id = this.Id,
                FirstName = this.FirstName,
                FamilyName = this.FamilyName,
                Email = this.Email,
                CityName = this.CityName,
                State = this.State,
                Children = this.GetChildren(),
                Latitude = this.Latitude,
                Longitude = this.Longitude,
                AboutGroup = this.AboutGroup,
                AboutGroupUrl = this.AboutGroupUrl,
                PhoneNumber = this.PhoneNumber,
                InterestCMBookStudy = this.InterestCMBookStudy,
                InterestCoop = this.InterestCoop,
                InterestNatureWalks = this.InterestNatureWalks,
                InterestFriends = this.InterestFriends,
                LeadingOther = this.LeadingOther,
                LeadingCMBookStudy = this.LeadingBookStudy,
                LeadingCoop = this.LeadingCMCoop,
                LeadingMentoring = this.LeadingMentoring,
                LeadingNatureWalks = this.LeadingNatureWalks
            };
        }
    }
}