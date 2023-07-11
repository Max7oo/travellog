using Microsoft.AspNetCore.Mvc;
using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class PlaceAPI
{
    public static void ConfigurePlaceAPI(this WebApplication app)
    {
        app.MapGet("/{userName}/places", GetAll);
        app.MapGet("/{userName}/places/{id}", GetById);
        app.MapPost("/{userName}/places", Add);
        app.MapPatch("/{userName}/places", Update);
        app.MapDelete("/{userName}/places/{id}", Delete);
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetAll(string userName, IPlaceRepository context)
    {
        try
        {
            return await Task.Run(() => {
                return Results.Ok(context.GetAll().Where(i => i.UserId == context.GetUserId(userName)));
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetById(string userName, int id, IPlaceRepository context)
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

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    private static async Task<IResult> Add(string userName, Place place, IPlaceRepository context)
    {
        try
        {
            place.ImageName = await SaveImage(place.ImageFile);
            place.UserId = context.GetUserId(userName);
            var result = context.Add(place);
            return result != null ? Results.Ok(result) : Results.NotFound();
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

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> Delete(string userName, int id, IPlaceRepository context)
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

    [NonAction]
    public static async Task<string> SaveImage(IFormFile imageFile)
    {
        string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
        imageName = imageName + DateTime.Now.ToString("yymmssfff")+Path.GetExtension(imageFile.FileName);
        var imagePath = Path.Combine("D:\\Temporary\\travellog\\travellog.wwwapi\\Images\\", imageName);
        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }
        return imageName;
    }
}
