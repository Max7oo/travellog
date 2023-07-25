using travellog.models;

namespace travellog.repository;

public interface IUserRepository
{
    IEnumerable<User> GetAll();
    User GetByEmailPassword(string email, string password);
    User GetByAccount(string username, string email);
    User GetForEdit(string username, string email);
    User GetByUserName(string username);
    User GetById(int id);
    bool AddFollower(string username, string followername);
    bool CheckFollowing(string username, string followername);
    int FollowerAmount(string username);
    int FollowingAmount(string username);
    List<Place> GetActivity(string username);
    bool Add(User user);
    bool Update(User user);
    bool Delete(int id);
}
