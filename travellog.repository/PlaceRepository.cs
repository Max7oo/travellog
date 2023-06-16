using travellog.data;
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
    }
}
