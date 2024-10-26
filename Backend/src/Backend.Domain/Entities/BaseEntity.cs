using System;

namespace Backend.Domain.Entities;

public class BaseEntity
{
    public int Id { get; set; }
    public DateTime DataCadastro { get; set; }
    public DateTime? DataAlteracao { get; set; }
}
