using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Database;

public class ViagemConfiguration : IEntityTypeConfiguration<Viagem>
{
    public void Configure(EntityTypeBuilder<Viagem> builder)
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

        builder.HasOne(c => c.Veiculo)
            .WithMany()
            .IsRequired()
            .HasForeignKey(c => c.IdVeiculo);
    }
}
