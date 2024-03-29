﻿using travellog.data;
using travellog.models;

namespace travellog.repository
{
    public class PlaceRepository : IPlaceRepository
    {
        public Place Add(Place place)
        {
            using (var db = new DatabaseContext())
            {
                db.Places.Add(place);
                db.SaveChanges();
                return place;
            }
            return null;
        }

        public bool Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Remove(db.Places.Find(id));
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public Place GetById(int id)
        {
            Place result;
            using (var db = new DatabaseContext())
            {
                result = db.Places.Find(id);
                db.SaveChanges();
                return result;
            }
            return result;
        }

        public IEnumerable<Place> GetAll()
        {
            using (var db = new DatabaseContext())
            {
                return db.Places.ToList();
            }
            return null;
        }

        public bool Update(Place place)
        {
            using (var db = new DatabaseContext())
            {
                db.Update(place);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public int GetUserId(string userName)
        {
            using (var db = new DatabaseContext())
            {
                var user = db.Users.Where(u => u.UserName == userName).FirstOrDefault();
                if (user != null)
                {
                    return user.Id;
                }
            }
            return -1;
        }

        public bool LikePlace(string username, int placeid)
        {
            using (var db = new DatabaseContext())
            {
                int userid = GetUserId(username);
                Place place = GetById(placeid);
                var likeModel = new LikeModel { UserId = userid, PlaceId = placeid };
                LikeModel itemToRemove = null;

                foreach (var item in db.Likes)
                {
                    if (item.UserId == userid)
                    {
                        if (item.PlaceId == placeid)
                        {
                            itemToRemove = item;
                        }
                    }
                }

                if (itemToRemove != null)
                {
                    db.Likes.Remove(itemToRemove);
                    place.Likes = place.Likes - 1;
                    db.Places.Update(place);
                    db.SaveChanges();
                    return false;
                }
                else
                {
                    db.Likes.Add(likeModel);
                    place.Likes = place.Likes + 1;
                    db.Places.Update(place);
                    db.SaveChanges();
                    return true;
                }
            }
        }

        public bool CheckLiked(string username, int placeid)
        {
            using (var db = new DatabaseContext())
            {
                int userid = GetUserId(username);
                Place place = GetById(placeid);

                var likeModel = new LikeModel { UserId = userid, PlaceId = placeid };

                LikeModel item = db.Likes.SingleOrDefault(x => x.UserId == userid);
                if (item != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
