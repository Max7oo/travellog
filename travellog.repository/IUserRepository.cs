using travellog.models;

namespace travellog.repository;

public interface IUserRepository
{
    User GetByEmailPassword(string email, string password);
    User GetByAccount(string username, string email);
    User GetForEdit(string username, string email);
    User GetByUserName(string username);
    bool Add(User user);
    bool Update(User user);
    bool Delete(int id);
}
