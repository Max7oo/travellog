using System;
using System.Collections;
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
        public IEnumerable<User> GetAll()
        {
            using (var db = new DatabaseContext())
            {
                return db.Users.ToList();
            }
            return null;
        }

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

        public User GetById(int id)
        {
            User result;
            using (var db = new DatabaseContext())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == id);

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

        public bool AddFollower(string username, string followername)
        {
            using (var db = new DatabaseContext())
            {
                User user = GetByUserName(username);
                User follower = GetByUserName(followername);
                var followermodel = new FollowerModel { UserId = user.Id, FollowerId = follower.Id };

                FollowerModel item = db.Followers.SingleOrDefault(x => x.FollowerId == follower.Id);
                if (item != null)
                {
                    db.Followers.Remove(item);
                }
                else
                {
                    db.Followers.Add(followermodel);
                }
                db.SaveChanges();
            }
            return true;
        }

        public bool CheckFollowing(string username, string followername)
        {
            using (var db = new DatabaseContext())
            {
                User user = GetByUserName(username);
                User follower = GetByUserName(followername);

                if (user != null && follower != null)
                {
                    if (db.Followers.Any(x => x.UserId == user.Id))
                    {
                        if (db.Followers.Any(x => x.FollowerId == follower.Id))
                        {
                            return true;
                        }
                        return false;
                    }
                    return false;
                }
                return false;
            }
        }

        public int FollowerAmount(string username)
        {
            using (var db = new DatabaseContext())
            {
                int followerAmount = 0;

                User user = GetByUserName(username);

                if (user != null)
                {
                    foreach (var item in db.Followers)
                    {
                        if (item.FollowerId == user.Id)
                        {
                            ++followerAmount;
                        }
                    }
                }
                return followerAmount;
            }
        }

        public int FollowingAmount(string username)
        {
            using (var db = new DatabaseContext())
            {
                int followingAmount = 0;

                User user = GetByUserName(username);

                if (user != null)
                {
                    foreach (var item in db.Followers)
                    {
                        if (item.UserId == user.Id)
                        {
                            ++followingAmount;
                        }
                    }
                }
                return followingAmount;
            }
        }

        public List<Place> GetActivity(string username)
        {
            using (var db = new DatabaseContext())
            {
                User user = GetByUserName(username);
                List<Place> activity = new List<Place>();

                if (user != null)
                {
                    foreach (var item in db.Followers)
                    {
                        if (item.UserId == user.Id)
                        {
                            User follower = GetById(item.FollowerId);

                            if (follower != null)
                            {
                                var dbextra = new DatabaseContext();
                                foreach (var place in dbextra.Places)
                                {
                                    if (place.UserId == follower.Id)
                                    {
                                        place.Follower = follower.FirstName + " " + follower.LastName;
                                        place.FollowerUserName = follower.UserName;
                                        place.FollowerPicture = follower.ProfilePicture;
                                        activity.Add(place);
                                    }
                                }
                            }
                        }
                    }
                }

                var sortedActivities = activity.OrderByDescending(q => q.Id).ToList();

                return sortedActivities;
            }
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
