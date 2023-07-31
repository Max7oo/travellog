using System.Diagnostics;
using travellog.data;
using travellog.models;

namespace travellog.repository
{
    public class CommentRepository : ICommentRepository
    {
        public Comment Add(Comment comment)
        {
            using (var db = new DatabaseContext())
            {
                db.Comments.Add(comment);
                db.SaveChanges();
                return comment;
            }
        }

        public List<Comment> GetByPlaceId(int placeId)
        {
            using (var db = new DatabaseContext())
            {
                List<Comment> comments = new List<Comment>();

                foreach (var comment in db.Comments)
                {
                    if (comment.PlaceId == placeId)
                    {
                        comments.Add(comment);
                    }
                }

                return comments;
            }
        }
    }
}
