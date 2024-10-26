﻿using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;

namespace Backend.Infrastructure.Repositories;

public class MotoristaFolgaRepository : Repository<MotoristaFolga>, IMotoristaFolgaRepository
{
    public MotoristaFolgaRepository(BackendContext context) : base (context)
    {
    }
}
