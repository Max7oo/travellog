using System.Collections.Generic;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Text.RegularExpressions;
using travellog.data;
using travellog.models;

namespace travellog.repository
{
    public class UserRepository : IUserRepository
    {
        public bool Add(User user)
        {
            using (var db = new DatabaseContext())
            {
                if (db.Users.Any(x => x.UserName == user.UserName))
                {
                    return false;
                }
                else if (db.Users.Any(y => y.Email == user.Email))
                {
                    return false;
                } else {
                    string salt = DateTime.Now.ToString();
                    user.Password = HashPassword($"{user.Password}{salt}");
                    user.Salt = salt;
                    db.Users.Add(user);
                    db.SaveChanges();
                    return true;
                }
            }
            return true;
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

        public User GetByUserName(string username)
        {
            User result;
            using (var db = new DatabaseContext())
            {
                var user = db.Users.FirstOrDefault(x => x.UserName == username);

                if (user != null)
                {
                    result = db.Users.Find(user.Id);
                    db.SaveChanges();
                    return result;
                }
            }
            return null;
        }

        public User GetByEmailPassword(string email, string password)
        {
            User result;
            using (var db = new DatabaseContext())
            {
                var loginuser = db.Users.FirstOrDefault(x => x.Email == email);

                if (loginuser != null)
                {
                    if (HashPassword($"{password}{loginuser.Salt}") == loginuser.Password)
                    {
                        result = db.Users.Find(loginuser.Id);
                        db.SaveChanges();
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            return null;
        }

        public User GetByAccount(string username, string email)
        {
            User result;
            using (var db = new DatabaseContext())
            {
                var account = db.Users.FirstOrDefault(x => x.UserName == username);

                if (account != null)
                {
                    if (account.Email == email)
                    {
                        result = db.Users.Find(account.Id);
                        db.SaveChanges();
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            return null;
        }

        public User GetForEdit(string username, string email)
        {
            User result;
            using (var db = new DatabaseContext())
            {
                var account = db.Users.FirstOrDefault(x => x.UserName == username);

                if (account != null)
                {
                    if (account.Email == email)
                    {
                        result = db.Users.Find(account.Id);
                        db.SaveChanges();
                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            return null;
        }

        public bool AddFollower(int userid, int followerid )
        {
            using (var db = new DatabaseContext())
            {
                User user = db.Users.Find(userid);
                User follower = db.Users.Find(followerid);

                user.FollowedBy.Add(follower.Id);
                follower.FollowedUsers.Add(user.Id);

                db.SaveChanges();
            }
            return true;
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

        private string HashPassword(string password)
        {
            SHA256 hash = SHA256.Create();
            var passwordBytes = Encoding.Default.GetBytes(password);
            var hashedPassword = hash.ComputeHash(passwordBytes);
            return Convert.ToHexString(hashedPassword);
        }
    }
}
