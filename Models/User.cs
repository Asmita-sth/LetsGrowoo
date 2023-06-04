using System;
using System.Collections.Generic;

namespace LetGrowEFDBFirst.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Name { get; set; } = null!;

    public string? UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime? InsertDate { get; set; }

    public int? UserPersonId { get; set; }

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
