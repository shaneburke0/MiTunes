namespace MiTunes.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Song",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Artist = c.String(),
                        Album = c.String(),
                        Path = c.String(),
                        Image = c.String(),
                        UserId = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                        Playlist_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Playlist", t => t.Playlist_Id)
                .Index(t => t.Playlist_Id);
            
            CreateTable(
                "dbo.Playlist",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        UserId = c.String(),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Song", new[] { "Playlist_Id" });
            DropForeignKey("dbo.Song", "Playlist_Id", "dbo.Playlist");
            DropTable("dbo.Playlist");
            DropTable("dbo.Song");
        }
    }
}
