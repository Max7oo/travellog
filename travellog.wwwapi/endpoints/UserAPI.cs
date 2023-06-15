using Microsoft.AspNetCore.Mvc;
using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class UserAPI
{
    public static void ConfigureUserAPI(this WebApplication app)
    {
        app.MapGet("/users", GetAll);
        app.MapGet("/users/{id}", GetById);
        app.MapPost("/users", Add);
        app.MapPatch("/users", Update);
        app.MapDelete("/users/{id}", Delete);
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetAll(IUserRepository context)
    {
        try
        {
            return await Task.Run(() => {
                return Results.Ok(context.GetAll());
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetById(int id, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var user = context.GetById(id);
                if (user == null) return Results.NotFound();
                return Results.Ok(user);
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    private static async Task<IResult> Add(User user, IUserRepository context)
    {
        try
        {
            var result = context.Add(user);
            return result != null ? Results.Ok(result) : Results.NotFound();
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
