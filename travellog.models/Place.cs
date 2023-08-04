using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace travellog.models;

public class Place
{
    public int Id { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public int Rating { get; set; }
    public string VisitedAt { get; set; }
    public int StayedFor { get; set; }
    public string Story { get; set; } 
    public int Likes { get; set; }
    public string FileUrl { get; set; }
    public string FilePath { get; set; }
    public string Follower { get; set; }
    public string FollowerUserName { get; set; }
    public string FollowerPicture { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}