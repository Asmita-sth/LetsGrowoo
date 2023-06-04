using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class Plant
{
    public int PlantId { get; set; }

    public string? Name { get; set; }

    public string? ScientificName { get; set; }

    public string? Description { get; set; }

    public string? Note { get; set; }

    public DateTime InsertDate { get; set; }

    public int? UserPersonId { get; set; }

    public virtual ICollection<PlantGallery> PlantGalleries { get; set; } = new List<PlantGallery>();
}
