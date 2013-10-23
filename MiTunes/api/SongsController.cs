using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Id3;
using MiTunes.Models;
using Newtonsoft.Json;
using Server = System.Web.HttpContext;

namespace MiTunes.Controllers
{
    public class SongsController : ApiController
    {
        private SongsContext db = new SongsContext();
        private readonly string[] _songExtensions = {"mp3", "ogg", "wav", "aac"};
        private const string UploadPath = "/Content/uploaded/";
        private const string SongBasePath = "/Content/songs/";

        // GET api/values
        public HttpResponseMessage Get()
        {
            var library = from s in db.Songs
                          where s.UserId.Equals(HttpContext.Current.User.Identity.Name)
                          select s;

            return Request.CreateResponse(HttpStatusCode.OK, library);
        }

        // GET api/values/5
        public HttpResponseMessage Get(int id)
        {
            try
            {
                var song = (from s in db.Songs
                            where s.Id == id
                            select s).FirstOrDefault();

                if (song == null || string.IsNullOrEmpty(song.Name))
                {
                    throw new FileNotFoundException();
                }

                return Request.CreateResponse(HttpStatusCode.Found, song);
            }
            catch (Exception)
            {

                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

        }

        public async Task<HttpResponseMessage> Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var fname = string.Empty;

            var root = HttpContext.Current.Server.MapPath(UploadPath);
            Directory.CreateDirectory(root);
            var provider = new MultipartFormDataStreamProvider(root);
            var result = await Request.Content.ReadAsMultipartAsync(provider);
            if (result.FormData["model"] == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var model = result.FormData["model"];
            var song = JsonConvert.DeserializeObject<Song>(model);
            var songPath = string.Empty;
            //get the files
            foreach (var file in result.FileData)
            {
                //TODO: Do something with each uploaded file
                var ext = file.Headers.ContentDisposition.FileName.Split('.');
                var fileExt = ext[ext.Length - 1].Substring(0,3);
                if (_songExtensions.Contains(fileExt))
                {
                    fname = file.Headers.ContentDisposition.FileName.Replace(" ", "").Replace("\"", "");
                    songPath = SongBasePath + fname;

                    try
                    {
                        var from = file.LocalFileName;
                        var to =  HttpContext.Current.Server.MapPath(songPath);

                        File.Move(from, to); // Try to move

                        song.Path = songPath;
                        song.UserId = HttpContext.Current.User.Identity.Name;
                        db.Songs.Add(song);
                        db.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception();
                    }
                }
            }

            if (string.IsNullOrEmpty(songPath))
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            db.Entry(song).Reload();

            return Request.CreateResponse(HttpStatusCode.Created, song);
        }

        // PUT api/values/5
        public HttpResponseMessage Put(int id, Song song)
        {
            try
            {
                song.UserId = HttpContext.Current.User.Identity.Name;
                db.Entry(song).State = EntityState.Modified;
                db.SaveChanges();
                db.Entry(song).Reload();
                return Request.CreateResponse(HttpStatusCode.OK, song);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }

            
        }

        // DELETE api/values/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                var song = (from s in db.Songs
                           where s.Id == id
                           select s).FirstOrDefault();

                db.Entry(song).State = EntityState.Deleted;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.NoContent, song);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
