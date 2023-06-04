using LetGrowEFDBFirst.Models;
using LetGrowEFDBFirst.Services;
using LetGrowEFDBFirst.Services.Gallery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace LetGrowEFDBFirst.Controllers
{
   
    public class GalleryController : BaseController
    {
        IGalleryService _galleryService;
        private IConfiguration _configuration;
     //   private readonly JWTSettings _jwtsettings;

        public GalleryController(IGalleryService galleryService, IConfiguration configuration)
        {
            _galleryService = galleryService;
            _configuration = configuration;
         //   _jwtsettings = jwtsettings.Value;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlant(string json)
        {
            //if any parameter needs to be sent in the json string for now no paramter.
            var result = _galleryService.GetAllPlants().Result;
            return Ok(result);
        }


        [HttpGet]
        public IActionResult PlantImagesFromRepo(string id)
        {
            try
            {
                if (id == null)
                {
                    return BadRequest();
                }

                var repoPath =GetFileRepositoryPath();

                string folder = "plants";

                var relPath = string.Format("{0}", folder);

                var fullDirPath = Path.Combine(repoPath, relPath);

                if (Directory.Exists(fullDirPath))
                {
                    relPath = string.Format("{0}", folder);
                    var fileDir = string.Format("{0}/{1}", repoPath, relPath);
                    fullDirPath = Path.GetFullPath(fileDir);

                    FileInfo[] fInfo = new DirectoryInfo(fullDirPath).GetFiles();
                    var file = fInfo.FirstOrDefault(x => x.Name.StartsWith("plant" + id));
                    if (file != null)
                    {
                        var imgContentType = string.Format("image/{0}", file.Extension.Replace(".", ""));
                        var img = System.IO.File.OpenRead(file.FullName);
                        return File(img, imgContentType);
                    }
                }


                var noLogoImg = System.IO.File.OpenRead(Path.Combine(repoPath, "transparent.png"));
                return File(noLogoImg, "image/png");
            }
            catch (Exception ex)
            {

                return Ok(false);
            }
        }


        public string GetFileRepositoryPath()
        {
            var repoPath = Path.GetFullPath(_configuration.GetSection("FileRepositoryPath").Value);
            repoPath = repoPath.Replace("\\", "/").Replace("//", "/");
            var hasEndingSlash = repoPath.LastIndexOf("/") == (repoPath.Length - 1);
            return hasEndingSlash ? repoPath : string.Format("{0}/", repoPath);
        }

    }
}
