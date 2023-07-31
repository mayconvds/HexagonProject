using HEXAGON.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LATAM.Infrastructure.RepositoryAccess;

public class LATAMContext : DbContext
{
    public LATAMContext(DbContextOptions<LATAMContext> options) : base(options)
    {

    }

    public DbSet<Users> User { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LATAMContext).Assembly);
    }
}