using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.Design;
using travellog.repository;
using travellog.wwwapi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPlaceRepository, PlaceRepository>();
builder.Services.AddScoped<ISuggestionRepository, SuggestionRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//TODO: change the capitalized strings in the options to match your api and contact details
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Individual Challenge",
        Description = "This API manages the place I have been.",
        Contact = new OpenApiContact
        {
            Name = "Max de Ruiter",
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials()); // allow credentials
}

app.ConfigureUserAPI();
app.ConfigurePlaceAPI();
app.ConfigureSuggestionAPI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
