using travellog.models;

namespace travellog.repository;

public interface IUserRepository
{
    User GetByUserNamePassword(string username, string password);
    bool Add(User user);
    bool Update(User user);
    bool Delete(int id);
}
