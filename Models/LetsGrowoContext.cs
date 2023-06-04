using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Extensions.Options;

namespace LetGrowEFDBFirst.Models;

public partial class LetsGrowoContext : DbContext
{
    public LetsGrowoContext()
    {
    }

    public LetsGrowoContext(DbContextOptions<LetsGrowoContext> options)
        : base(options)
    {
        
     
    }



    public virtual DbSet<Gallery> Galleries { get; set; }

    public virtual DbSet<ListItem> ListItems { get; set; }

    public virtual DbSet<ListItemCategory> ListItemCategories { get; set; }

    public virtual DbSet<Plant> Plants { get; set; }

    public virtual DbSet<PlantDetail> PlantDetails { get; set; }

    public virtual DbSet<PlantGallery> PlantGalleries { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS;Initial Catalog=LetsGrowo;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=True;")
            .AddInterceptors(new QueryInterceptor());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Gallery>(entity =>
        {
            entity.ToTable("Gallery");

            entity.Property(e => e.InsertDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Note)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ListItem>(entity =>
        {
            entity.ToTable("ListItem");

            entity.Property(e => e.ListItemId).ValueGeneratedNever();
            entity.Property(e => e.InsertDate).HasColumnType("smalldatetime");
            entity.Property(e => e.ListItem1)
                .HasMaxLength(250)
                .HasColumnName("ListItem");
        });

        modelBuilder.Entity<ListItemCategory>(entity =>
        {
            entity.ToTable("ListItemCategory");

            entity.Property(e => e.ListItemCategoryId).ValueGeneratedNever();
            entity.Property(e => e.Category).HasMaxLength(250);
            entity.Property(e => e.InsertDate).HasColumnType("smalldatetime");
        });

        modelBuilder.Entity<Plant>(entity =>
        {
            entity.ToTable("Plant");

            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.InsertDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Note)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.ScientificName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PlantDetail>(entity =>
        {
            entity.ToTable("PlantDetail");

            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.FoundIn)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.InsertDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Price).HasColumnType("money");
        });

        modelBuilder.Entity<PlantGallery>(entity =>
        {
            entity.HasKey(e => e.GalleryPlantId);

            entity.ToTable("PlantGallery");

            entity.Property(e => e.InsertDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Gallery).WithMany(p => p.PlantGalleries)
                .HasForeignKey(d => d.GalleryId)
                .HasConstraintName("FK_PlantGallery_Gallery");

            entity.HasOne(d => d.Plant).WithMany(p => p.PlantGalleries)
                .HasForeignKey(d => d.PlantId)
                .HasConstraintName("FK_PlantGallery_Plant");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.TokenId);

            entity.ToTable("RefreshToken");

            entity.Property(e => e.ExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.InsertDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Token)
                .HasMaxLength(200)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RefreshToken_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.InsertDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
