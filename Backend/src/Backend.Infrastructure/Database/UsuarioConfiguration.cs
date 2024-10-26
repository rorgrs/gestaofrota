using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Backend.Infrastructure.Database;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuario");
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Documento).HasMaxLength(20);
        builder.Property(c => c.Email).HasMaxLength(200);
        builder.Property(c => c.Login).HasMaxLength(200);
        builder.Property(c => c.Nome).HasMaxLength(200);
        builder.Property(c => c.Senha).HasMaxLength(200);
        builder.Property(c => c.Telefone).HasMaxLength(20);
    }
}
