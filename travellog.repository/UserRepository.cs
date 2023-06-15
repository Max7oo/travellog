using travellog.data;
using travellog.models;

namespace travellog.repository
{
    public class UserRepository : IUserRepository
    {
        public User Add(User user)
        {
            using (var db = new DatabaseContext())
            {
                db.Users.Add(user);
                db.SaveChanges();
                return user;
            }
            return null;
        }

        public bool Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Remove(db.Users.Find(id));
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public User GetById(int id)
        {
            User result;
            using (var db = new DatabaseContext())
            {
                result = db.Users.Find(id);
                db.SaveChanges();
                return result;
            }
            return result;
        }

        public IEnumerable<User> GetAll()
        {
            using (var db = new DatabaseContext())
            {
                return db.Users.ToList();
            }
            return null;
        }

        public bool Update(User user)
        {
            using (var db = new DatabaseContext())
            {
                db.Update(user);
                db.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
