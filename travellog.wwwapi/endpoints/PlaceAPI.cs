using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class PlaceAPI
{
    public static void ConfigurePlaceAPI(this WebApplication app)
    {
        app.MapGet("/places", GetAll);
        app.MapGet("/places/{id}", GetById);
        app.MapPost("/places", Add);
        app.MapPut("/places", Update);
        app.MapDelete("/places", Delete);
    }

    private static async Task<IResult> GetAll(IPlaceRepository context)
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

    private static async Task<IResult> GetById(int id, IPlaceRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var place = context.GetById(id);
                if (place == null) return Results.NotFound();
                return Results.Ok(place);
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> Add(Place place, IPlaceRepository context)
    {
        try
        {
            if (context.Add(place)) return Results.Ok();
            return Results.NotFound();

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> Update(Place place, IPlaceRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                if (context.Update(place)) return Results.Ok();
                return Results.NotFound();
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> Delete(int id, IPlaceRepository context)
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
