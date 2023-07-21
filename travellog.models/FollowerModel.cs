using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace travellog.models;

public class FollowerModel
{
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }

    [ForeignKey("Follower")]
    public int FollowerId { get; set; }
    public User Follower { get; set; }
}