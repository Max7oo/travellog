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
        app.MapGet("/like/{userName}/{id}", LikePlace);
        app.MapGet("/liked/{userName}/{id}", CheckLiked);
    }

    [HttpGet(Name = "Get_All")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetAll(string userName, IPlaceRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                return Results.Ok(context.GetAll().Where(i => i.UserId == context.GetUserId(userName)));
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpGet(Name = "Get_ById")]
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

    [HttpPost(Name = "Add_Place")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    private static async Task<IResult> Add(string userName, Place place, IPlaceRepository context, IUserRepository usercontext)
    {
        try
        {
            place.UserId = context.GetUserId(userName);
            var user = usercontext.GetByUserName(userName);
            user.CitiesVisited += 1;
            usercontext.Update(user);
            var result = context.Add(place);
            return result != null ? Results.Ok(result) : Results.NotFound();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpPatch(Name = "Update_Place")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
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

    [HttpDelete(Name = "Delete_Place")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> Delete(string userName, int id, IPlaceRepository context, IUserRepository usercontext)
    {
        try
        {
            var user = usercontext.GetByUserName(userName);
            user.CitiesVisited -= 1;
            usercontext.Update(user);
            if (context.Delete(id)) return Results.Ok();
            return Results.NotFound();

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpGet(Name = "Like_Place")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> LikePlace(string username, int placeid, IPlaceRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var flag = context.LikePlace(username, placeid);
                if (flag)
                {
                    return Results.Ok(flag);
                }
                else
                {
                    return Results.NotFound(flag);
                }
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpGet(Name = "Get_Liked")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> CheckLiked(string username, int placeid, IPlaceRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var flag = context.CheckLiked(username, placeid);
                if (flag)
                {
                    return Results.Ok(flag);
                }
                else
                {
                    return Results.NotFound(flag);
                }
            });
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
