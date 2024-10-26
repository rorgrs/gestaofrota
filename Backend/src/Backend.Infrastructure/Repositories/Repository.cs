using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Infrastructure.Database;

namespace Backend.Infrastructure.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
{
    private readonly BackendContext _backendContext;

    public Repository(BackendContext backendContext)
    {
        _backendContext = backendContext;
    }

    public async Task<int> SaveAsync() =>
        await _backendContext.SaveChangesAsync();

    public async Task AddAsync(TEntity entity) =>
        await _backendContext.Set<TEntity>().AddAsync(entity);

    public async Task UpdateAsync(TEntity entity) =>
        await Task.Run(() => { _backendContext.Set<TEntity>().Update(entity); });

    public void Delete(TEntity entity) => 
        _backendContext.Set<TEntity>().Remove(entity);
    
    public async Task DeleteAsync(TEntity entity) => 
        await Task.Run(() => { Delete(entity); });

    public virtual async Task<int> Count(IEnumerable<Expression<Func<TEntity, bool>>> predicates = null) =>
        await _backendContext.Set<TEntity>().Filter(predicates).CountAsync();

    public async Task<bool> ExistAsync(Expression<Func<TEntity, bool>> predicate) =>
        await _backendContext.Set<TEntity>().AnyAsync(predicate);
    
    public async Task<TEntity> GetByIdAsync(int id, IEnumerable<string> entitiesToInclude) =>
        await _backendContext.Set<TEntity>().Include(entitiesToInclude).FirstOrDefaultAsync(e => e.Id == id);

    public async Task<IEnumerable<TEntity>> GetAllAsync(IEnumerable<Expression<Func<TEntity, bool>>> predicates,
        IEnumerable<string> entitiesToInclude) =>
        await _backendContext.Set<TEntity>().Filter(predicates).Include(entitiesToInclude).ToListAsync();

    public async Task<IEnumerable<TEntity>> GetAllAsync(int skip, int limit,
        IEnumerable<Expression<Func<TEntity, bool>>> predicates, IEnumerable<string> entitiesToInclude) =>
        await _backendContext.Set<TEntity>().Filter(predicates).Skip(skip).Take(limit).Include(entitiesToInclude).ToListAsync();

}