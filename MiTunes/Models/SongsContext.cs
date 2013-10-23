using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using MiTunes.Models;

namespace MiTunes.Models
{
    // You can add custom code to this file. Changes will not be overwritten.
    // 
    // If you want Entity Framework to drop and regenerate your database
    // automatically whenever you change your model schema, add the following
    // code to the Application_Start method in your Global.asax file.
    // Note: this will destroy and re-create your database with every model change.
    // 
    
    public class SongsContext : DbContext
    {
        public SongsContext()
            : base("name=DefaultConnection")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<SongsContext>());
        }

        public DbSet<Song> Songs { get; set; }
        public DbSet<Playlist> Playlists { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}