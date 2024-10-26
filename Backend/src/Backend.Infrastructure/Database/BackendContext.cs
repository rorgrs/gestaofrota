using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Database;

public class BackendContext : DbContext
{
    public BackendContext(DbContextOptions<BackendContext> options) : base(options)
    {

    }

    public DbSet<Usuario> Usuario { get; set; }
    public DbSet<Veiculo> Veiculo { get; set; }
    public DbSet<VeiculoLicenciamento> VeiculoLicenciamento { get; set; }
    public DbSet<VeiculoManutencao> VeiculoManutencao { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new VeiculoConfiguration());
        modelBuilder.ApplyConfiguration(new VeiculoLicenciamentoConfiguration());
        modelBuilder.ApplyConfiguration(new VeiculoManutencaoConfiguration());
    }
}