using travellog.models;

namespace travellog.repository;

public interface ISuggestionRepository
{
    IEnumerable<Suggestion> GetAll();
    Suggestion GetById(int id);
    int GetUserId(string userName);
    Suggestion Add(Suggestion suggestion);
    bool Update(Suggestion suggestion);
    bool Delete(int id);
}
