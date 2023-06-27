using Microsoft.AspNetCore.Mvc;
using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class UserAPI
{
    public static void ConfigureUserAPI(this WebApplication app)
    {
        app.MapGet("/users/{username}/{password}", GetByUserNamePassword);
        app.MapPost("/users", Add);
        app.MapPatch("/users", Update);
        app.MapDelete("/users/{id}", Delete);
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetByUserNamePassword(string username, string password, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var item = context.GetByUserNamePassword(username, password);
                if (item != null)
                {
                    var user = new { Id = item.Id, UserName = item.UserName, Email = item.Email };
                    return Results.Ok(user);
                }
                return Results.NotFound();
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> Add(User user, IUserRepository context)
    {
        try
        {
            var result = context.Add(user);
            return result != null ? Results.Ok(true) : Results.NotFound();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> Update(User user, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                if (context.Update(user)) return Results.Ok();
                return Results.NotFound();
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> Delete(int id, IUserRepository context)
    {
        try
        {
            if (context.Delete(id)) return Results.Ok();
            return Results.NotFound();

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
