using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Database;

public class MotoristaCarteiraConfiguration : IEntityTypeConfiguration<MotoristaCarteira>
{
    public void Configure(EntityTypeBuilder<MotoristaCarteira> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.DataAlteracao).HasColumnType("datetime2");

        builder.HasOne(c => c.UsuarioCadastro)
            .WithMany()
            .IsRequired(false)
            .HasForeignKey(c => c.IdUsuarioCadastro);

        builder.HasOne(c => c.UsuarioAlteracao)
            .WithMany()
            .IsRequired(false)
            .HasForeignKey(c => c.IdUsuarioAlteracao);
        
        builder.HasOne(c => c.Motorista)
            .WithMany(c => c.Carteiras)
            .IsRequired()
            .HasForeignKey(c => c.IdMotorista);
    }
}
