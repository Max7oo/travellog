using System.ComponentModel.DataAnnotations.Schema;

namespace travellog.models;

public class Suggestion
{
    public int Id { get; set; }
    public string BasedOn { get; set; }
    public string SuggestionText { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}