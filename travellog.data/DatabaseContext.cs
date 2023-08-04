﻿using travellog.models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace travellog.data
{
    public class DatabaseContext : DbContext
    {
        private static string GetConnectionString()
        {
            string jsonSettings = File.ReadAllText("appsettings.json");
            JObject configuration = JObject.Parse(jsonSettings);
            return configuration["ConnectionStrings"]["DefaultConnectionString"].ToString();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(GetConnectionString());
        }
        public DbSet<User> Users { get; set; }
        public DbSet<FollowerModel> Followers { get; set; }
        public DbSet<LikeModel> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Suggestion> Suggestions { get; set; }
    }
}