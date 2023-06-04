using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class PlantDetail
{
    public int PlantDetailId { get; set; }

    public int PlantId { get; set; }

    public string? FoundIn { get; set; }

    public string Description { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? CurrencyListItemId { get; set; }

    public DateTime InsertDate { get; set; }

    public int? UserPersonId { get; set; }
}
