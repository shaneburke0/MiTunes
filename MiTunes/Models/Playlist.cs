using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MiTunes.Models
{
    public class Playlist 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Song> Songs { get; set; }
    }
}