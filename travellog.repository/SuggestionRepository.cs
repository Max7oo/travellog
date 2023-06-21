using travellog.data;
using travellog.models;

namespace travellog.repository
{
    public class SuggestionRepository : ISuggestionRepository
    {
        public Suggestion Add(Suggestion suggestion)
        {
            using (var db = new DatabaseContext())
            {
                db.Suggestions.Add(suggestion);
                db.SaveChanges();
                return suggestion;
            }
            return null;
        }

        public bool Delete(int id)
        {
            using (var db = new DatabaseContext())
            {
                db.Remove(db.Suggestions.Find(id));
                db.SaveChanges();
                return true;
            }
            return false;
        }

        public Suggestion GetById(int id)
        {
            Suggestion result;
            using (var db = new DatabaseContext())
            {
                result = db.Suggestions.Find(id);
                db.SaveChanges();
                return result;
            }
            return result;
        }

        public IEnumerable<Suggestion> GetAll()
        {
            using (var db = new DatabaseContext())
            {
                return db.Suggestions.ToList();
            }
            return null;
        }

        public bool Update(Suggestion suggestion)
        {
            using (var db = new DatabaseContext())
            {
                db.Update(suggestion);
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
