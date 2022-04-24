using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;

namespace SharlotteMason.Entities
{
    public class HomeSchool : TableEntity
    {
        public HomeSchool(string familyName, string cityName, string email) : base(Guid.NewGuid().ToString(), cityName)
        {
            FamilyName = familyName;
            CityName = cityName;
            Email = email;
        }
        public string FirstName { get; set; }
        [Required]
        public string FamilyName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string CityName { get; set; }
        private List<Child> _children;
        public List<Child> Children
        {
            get
            {
                return JsonConvert.DeserializeObject<List<Child>>(ChildrenJSON);
            }
            set
            {
                _children = value;
                ChildrenJSON = JsonConvert.SerializeObject(value);
            }
        }

        public string ChildrenJSON { get; set; }
        public string InterstedTopics { get; set; }
    }
}