using System.ComponentModel.DataAnnotations.Schema;
using travellog.models;

namespace travellog.models
{
    public class UserPlace
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Place")]
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}
