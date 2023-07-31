using System.ComponentModel.DataAnnotations.Schema;

namespace travellog.models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string PostedAt { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Place")]
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}
