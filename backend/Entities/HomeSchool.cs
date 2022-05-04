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
        public HomeSchool(HomeSchoolDto dto) : base(Guid.NewGuid().ToString(), "homeschool")
        {
            FamilyName = dto.FamilyName;
            CityName = dto.CityName;
            State = dto.State;
            Email = dto.Email;

            InterestCMBookStudy = dto.InterestCMBookStudy;
            InterestFriendship = dto.InterestFriendship;
            InterestMentoring = dto.InterestMentoring;
            InterestNatureWalks = dto.InterestNatureWalks;
            InterestNatureWalks = dto.InterestNatureWalks;
        }
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Email { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public string InterestCMBookStudy { get; set; }
        public string InterestNatureWalks { get; set; }
        public string InterestCoop { get; set; }
        public string InterestMentoring { get; set; }
        public string InterestFriendship { get; set; }
        
        
        public List<ChildDto> GetChildren()
        {
            if(!string.IsNullOrEmpty(ChildrenJSON))
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
                InterestCMBookStudy = this.InterestCMBookStudy,
                InterestCoop = this.InterestCoop,
                InterestNatureWalks = this.InterestNatureWalks,
                InterestMentoring = this.InterestMentoring,
                InterestFriendship = this.InterestFriendship
            };
        }
        public string ChildrenJSON { get; set; }
        public DateTimeOffset Added { get; set; } = DateTimeOffset.Now;
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}