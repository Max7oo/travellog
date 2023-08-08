using Microsoft.AspNetCore.Mvc;
using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class CommentAPI
{
    public static void ConfigureCommentAPI(this WebApplication app)
    {
        app.MapPost("/{username}/add/comment", Add);
        app.MapGet("/comments", GetByPlaceId);
    }

    [HttpPost(Name = "Add_comment")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> Add(string username, Comment comment, ICommentRepository context, IUserRepository usercontext, IPlaceRepository placecontext)
    {
        try
        {
            var place = placecontext.GetById(comment.PlaceId);
            comment.PlaceId = place.Id;

            var user = usercontext.GetByUserName(username);
            comment.UserId = user.Id;

            var result = context.Add(comment);
            return result != null ? Results.Ok(comment) : Results.NotFound();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpGet(Name = "Get_ByPlaceId")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetByPlaceId(int placeId, ICommentRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                List<Comment> comments = context.GetByPlaceId(placeId);

                return Results.Ok(comments);
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
