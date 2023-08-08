using Microsoft.AspNetCore.Mvc;
using travellog.models;
using travellog.repository;

namespace travellog.wwwapi;

public static class SuggestionAPI
{
    public static void ConfigureSuggestionAPI(this WebApplication app)
    {
        app.MapGet("/{userName}/suggestions", GetAll);
        app.MapGet("/{userName}/suggestions/{id}", GetById);
        app.MapPost("/{userName}/suggestions", Add);
        app.MapPatch("/{userName}/suggestions", Update);
        app.MapDelete("/{userName}/suggestions/{id}", Delete);
    }

    [HttpGet(Name = "Get_All")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> GetAll(string userName, ISuggestionRepository context)
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
    private static async Task<IResult> GetById(string userName, int id, ISuggestionRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                var suggestion = context.GetById(id);
                if (suggestion == null) return Results.NotFound();
                return Results.Ok(suggestion);
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpPost(Name = "Add_Suggestion")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    private static async Task<IResult> Add(string userName, Suggestion suggestion, ISuggestionRepository context)
    {
        try
        {
            suggestion.UserId = context.GetUserId(userName);
            var result = context.Add(suggestion);
            return result != null ? Results.Ok(result) : Results.NotFound();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpPatch(Name = "Update_Suggestion")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    private static async Task<IResult> Update(Suggestion suggestion, ISuggestionRepository context)
    {
        try
        {
            return await Task.Run(() =>
            {
                if (context.Update(suggestion)) return Results.Ok();
                return Results.NotFound();
            });

        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpDelete(Name = "Delete_Suggestion")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> Delete(string userName, int id, ISuggestionRepository context)
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
