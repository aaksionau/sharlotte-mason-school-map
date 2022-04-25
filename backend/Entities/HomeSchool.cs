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
            Email = dto.Email;
        }
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Email { get; set; }
        public string CityName { get; set; }
        public List<ChildDto> GetChildren()
        {
            return JsonConvert.DeserializeObject<List<ChildDto>>(ChildrenJSON);
        }
        public void AddChildren(List<ChildDto> children)
        {
            if (children != null && children.Count > 0)
                ChildrenJSON = JsonConvert.SerializeObject(children);
        }

        public HomeSchoolDto GetDto()
        {
            return new HomeSchoolDto()
            {
                FirstName = this.FirstName,
                FamilyName = this.FamilyName,
                Email = this.Email,
                CityName = this.CityName,
                InterstedTopics = this.InterstedTopics,
                Children = this.GetChildren()
            };
        }
        public string ChildrenJSON { get; set; }
        public string InterstedTopics { get; set; }
        public DateTimeOffset Added { get; set; } = DateTimeOffset.Now;
    }
}