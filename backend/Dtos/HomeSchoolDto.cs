using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SharlotteMason.Entities;

namespace SharlotteMason.Dtos
{
    public class HomeSchoolDto
    {
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
        
        
        public List<ChildDto> Children { get; set; }
        public string InterstedTopics { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        
        
        
    }
}