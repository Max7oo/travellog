namespace travellog.models;

public class Place
{
    public int Id { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public int Rating { get; set; }
    public DateOnly VisitedAt { get; set; }
    public int StayedFor { get; set; }
}