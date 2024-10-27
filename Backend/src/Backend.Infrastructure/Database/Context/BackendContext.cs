using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Database.Context;

public class BackendContext : DbContext
{
    public BackendContext(DbContextOptions<BackendContext> options) : base(options)
    {

    }

    public DbSet<Usuario> Usuario { get; set; }
    public DbSet<Veiculo> Veiculo { get; set; }
    public DbSet<VeiculoLicenciamento> VeiculoLicenciamento { get; set; }
    public DbSet<VeiculoManutencao> VeiculoManutencao { get; set; }
    public DbSet<Motorista> Motorista { get; set; }
    public DbSet<MotoristaEscalaTrabalho> MotoristaEscalaTrabalho { get; set; }
    public DbSet<MotoristaFolga> MotoristaFolga { get; set; }
    public DbSet<MotoristaCarteira> MotoristaCarteira { get; set; }
    public DbSet<Viagem> Viagem { get; set; }
    public DbSet<ViagemParada> ViagemParada { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
        modelBuilder.ApplyConfiguration(new VeiculoConfiguration());
        modelBuilder.ApplyConfiguration(new VeiculoLicenciamentoConfiguration());
        modelBuilder.ApplyConfiguration(new VeiculoManutencaoConfiguration());
        modelBuilder.ApplyConfiguration(new MotoristaConfiguration());
        modelBuilder.ApplyConfiguration(new MotoristaEscalaTrabalhoConfiguration());
        modelBuilder.ApplyConfiguration(new MotoristaFolgaConfiguration());
        modelBuilder.ApplyConfiguration(new MotoristaCarteiraConfiguration());
        modelBuilder.ApplyConfiguration(new ViagemConfiguration());
        modelBuilder.ApplyConfiguration(new ViagemParadaConfiguration());
    }
}