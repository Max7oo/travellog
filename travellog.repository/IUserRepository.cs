using travellog.models;

namespace travellog.repository;

public interface IUserRepository
{
    IEnumerable<User> GetAll();
    User GetById(int id);
    bool Add(User user);
    bool Update(User user);
    bool Delete(int id);
}
