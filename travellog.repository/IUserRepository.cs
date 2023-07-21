using travellog.models;

namespace travellog.repository;

public interface IUserRepository
{
    User GetByEmailPassword(string email, string password);
    User GetByAccount(string username, string email);
    User GetForEdit(string username, string email);
    User GetByUserName(string username);
    bool AddFollower(string username, string followername);
    bool CheckFollowing(string username, string followername);
    int FollowerAmount(string username);
    int FollowingAmount(string username);
    bool Add(User user);
    bool Update(User user);
    bool Delete(int id);
}
