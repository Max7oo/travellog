using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace travellog.models;

public class LikeModel
{
    public int Id { get; set; }

    [ForeignKey("Place")]
    public int PlaceId { get; set; }
    public Place Place { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}