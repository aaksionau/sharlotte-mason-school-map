using System.ComponentModel.DataAnnotations;

namespace SharlotteMason.Dtos
{
    public class MessageDto
    {
        [Required]
        public string HomeSchoolId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Body { get; set; }
    }
}