using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class ListItem
{
    public int ListItemId { get; set; }

    public string ListItem1 { get; set; } = null!;

    public int ListItemCategoryId { get; set; }

    public DateTime InsertDate { get; set; }

    public int UserPersonId { get; set; }
}
