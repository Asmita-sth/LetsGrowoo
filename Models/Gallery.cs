using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class Gallery
{
    public int GalleryId { get; set; }

    public string? Name { get; set; }

    public string? Note { get; set; }

    public DateTime? InsertDate { get; set; }

    public int? UserPersonId { get; set; }

    public virtual ICollection<PlantGallery> PlantGalleries { get; set; } = new List<PlantGallery>();
}
