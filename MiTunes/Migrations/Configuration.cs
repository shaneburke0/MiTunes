using MiTunes.Models;

namespace MiTunes.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MiTunes.Models.SongsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MiTunes.Models.SongsContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Songs.AddOrUpdate(
                s => s.Name,
                new Song { Name = "Back To Black", Artist = "AC/DC", Album = "Back To Black", Image = "/Content/images/song/img1.jpg", Path = "/Content/songs/song1.mp3", UserId = "shaneburke0@gmail.com" }
                );
            context.SaveChanges();
        }
    }
}
