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
        public string InterestCMBookStudy { get; set; }
        public string InterestNatureWalks { get; set; }
        public string InterestCoop { get; set; }
        public string InterestMentoring { get; set; }
        public string InterestFriendship { get; set; }
        public List<ChildDto> Children { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}