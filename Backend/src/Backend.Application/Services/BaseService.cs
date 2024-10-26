using AutoMapper;
using Backend.Domain.Services;
using Backend.Domain.Repositories;

namespace Backend.Application.Services;

public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class
{
    protected readonly IMapper Mapper;
    protected readonly IRepository<TEntity> Repository;

    public BaseService(IMapper mapper, IRepository<TEntity> repository)
    {
        Mapper = mapper;
        Repository = repository;
    }
}
