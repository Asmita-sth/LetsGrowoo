using LetGrowEFDBFirst.Models;
using Microsoft.EntityFrameworkCore;

namespace LetGrowEFDBFirst.Services.Gallery
{
    public class GalleryService : IGalleryService
    {

        private readonly LetsGrowoContext _context;
        private IConfiguration _configuration;

        public GalleryService(LetsGrowoContext context)
        {
            _context = context;
       
        }
        public async Task<dynamic> GetAllPlants()
        {

            return await _context.Plants.ToListAsync();


        }
    }
}
