using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class PlantGallery
{
    public int GalleryPlantId { get; set; }

    public int? GalleryId { get; set; }

    public int? PlantId { get; set; }

    public DateTime? InsertDate { get; set; }

    public int? UserPersonId { get; set; }

    public virtual Gallery? Gallery { get; set; }

    public virtual Plant? Plant { get; set; }
}
