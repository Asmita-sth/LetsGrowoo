using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LetGrowEFDBFirst.Controllers
{
    [ApiController]
    [EnableCors]
    [Route("api/[controller]/[action]/{id?}")]
    public class BaseController : Controller
    {
      
        public BaseController() { 
        
        } 
      

    }
}
