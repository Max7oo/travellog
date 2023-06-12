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
        app.MapPut("/users", Update);
        app.MapDelete("/users", Delete);
    }

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

    private static async Task<IResult> GetById(int id, IUserRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var person = context.GetById(id);
                if (person == null) return Results.NotFound();
                return Results.Ok(person);
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> Add(User user, IUserRepository context)
    {
        try
        {
            if (context.Add(user)) return Results.Ok();
            return Results.NotFound();

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
