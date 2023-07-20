using System.ComponentModel.DataAnnotations.Schema;

namespace travellog.models;
public class User
{
    public int Id { get; set; }
    public string ProfilePicture { get; set; }
    public string ProfilePicturePath { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public int CitiesVisited { get; set; }
    public List<int> FollowedUsers { get; set; }
    public List<int> FollowedBy { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Salt { get; set; }
}
