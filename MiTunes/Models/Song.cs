using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MiTunes.Models
{
    public class Song
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Album { get; set; }
        public string Path { get; set; }
        public string Image { get; set; }
        public string UserId { get; set; }
    }
}