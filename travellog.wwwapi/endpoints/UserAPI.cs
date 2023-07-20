using Microsoft.AspNetCore.Mvc;
using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class UserAPI
{
    public static void ConfigureUserAPI(this WebApplication app)
    {
        app.MapGet("/users/{email}/{password}", GetByEmailPassword);
        app.MapGet("/{username}/{email}", GetByAccount);
        app.MapGet("/{userName}", GetByUserName);
        app.MapPost("/users", Add);
        app.MapGet("/users/edit/{username}/{email}", GetForEdit);
        app.MapGet("/addfollower/{userid}/{followerid}", AddFollower);
        app.MapPatch("/users", Update);
        app.MapDelete("/users/{id}", Delete);
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetByEmailPassword(string email, string password, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var item = context.GetByEmailPassword(email, password);
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
    private static async Task<IResult> GetByAccount(string username, string email, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var item = context.GetByAccount(username, email);
                if (item != null)
                {
                    var account = new { Id = item.Id, ProfilePicture = item.ProfilePicture, FirstName = item.FirstName, LastName = item.LastName, CitiesVisited = item.CitiesVisited, Email = item.Email };
                    return Results.Ok(account);
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
    private static async Task<IResult> GetForEdit(string username, string email, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var item = context.GetForEdit(username, email);
                if (item != null)
                {
                    var account = new { Id = item.Id, ProfilePicture = item.ProfilePicture, ProfilePicturePath = item.ProfilePicturePath, FirstName = item.FirstName, LastName = item.LastName, UserName = item.UserName, CitiesVisited = item.CitiesVisited, Email = item.Email, Password = item.Password };
                    return Results.Ok(account);
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
    private static async Task<IResult> AddFollower(int userid, int followerid, IUserRepository context)
    {
        try
        {
            if (context.AddFollower(userid, followerid)) return Results.Ok();
            return Results.NotFound();

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetByUserName(string username, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var item = context.GetByUserName(username);
                if (item != null)
                {
                    var user = new { Id = item.Id, ProfilePicture = item.ProfilePicture, FirstName = item.FirstName, LastName = item.LastName, UserName = item.UserName, CitiesVisited = item.CitiesVisited };
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
