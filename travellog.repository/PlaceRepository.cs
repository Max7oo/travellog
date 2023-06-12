using travellog.data;
using travellog.models;

namespace travellog.repository
{
    public class PlaceRepository : IPlaceRepository
    {
        public bool Add(Place place)
        {
            using (var db = new DatabaseContext())
            {
                db.Places.Add(place);
                db.SaveChanges();
                return true;
            }
            return false;
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
    }
}
