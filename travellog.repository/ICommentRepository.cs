using travellog.models;

namespace travellog.repository;

public interface ICommentRepository
{
    Comment Add(Comment comment);
    List<Comment> GetByPlaceId(int placeId);
}
