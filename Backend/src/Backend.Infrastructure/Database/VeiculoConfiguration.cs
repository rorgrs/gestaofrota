using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Database;

public class VeiculoConfiguration : IEntityTypeConfiguration<Veiculo>
{
    public void Configure(EntityTypeBuilder<Veiculo> builder)
    {
        builder.HasKey(c => c.Id);

        builder.HasOne(c => c.UsuarioCadastro)
            .WithMany()
            .IsRequired(false)
            .HasForeignKey(c => c.IdUsuarioCadastro);

        builder.HasOne(c => c.UsuarioAlteracao)
            .WithMany()
            .IsRequired(false)
            .HasForeignKey(c => c.IdUsuarioAlteracao);

        builder.HasOne(c => c.Motorista)
            .WithMany()
            .IsRequired(false)
            .HasForeignKey(c => c.IdMotorista);

        builder.HasMany(c => c.Manutencoes)
            .WithOne(c => c.Veiculo)
            .IsRequired(false)
            .HasForeignKey(c => c.IdVeiculo);

        builder.HasMany(c => c.Licenciamentos)
            .WithOne(c => c.Veiculo)
            .IsRequired(false)
            .HasForeignKey(c => c.IdVeiculo);
    }
}
