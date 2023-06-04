using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class ListItemCategory
{
    public int ListItemCategoryId { get; set; }

    public string Category { get; set; } = null!;

    public DateTime InsertDate { get; set; }

    public int UserPersonId { get; set; }
}
