using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SharlotteMason.Entities;

namespace SharlotteMason.Dtos
{
    public class HomeSchoolDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        [Required]
        public string FamilyName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string CityName { get; set; }
        [Required]
        public string State { get; set; }
        public bool InterestCMBookStudy { get; set; }
        public bool InterestNatureWalks { get; set; }
        public bool InterestCoop { get; set; }
        public bool InterestFriends { get; set; }
        public string LeadingOther { get; set; }
        public string LeadingCoop { get; set; }
        public string LeadingCMBookStudy { get; set; }
        public string LeadingNatureWalks { get; set; }
        public string LeadingMentoring { get; set; }
        public List<string> LeadingGroups { get; set; }
        public List<ChildDto> Children { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}