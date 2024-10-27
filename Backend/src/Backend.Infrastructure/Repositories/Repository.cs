#nullable enable
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Infrastructure.Database.Context;

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

    public void Update(TEntity entity) =>
        _backendContext.Set<TEntity>().Update(entity);
    
    public async Task UpdateAsync(TEntity entity) =>
        await Task.Run(() => { _backendContext.Set<TEntity>().Update(entity); });

    public void Delete(TEntity entity) => 
        _backendContext.Set<TEntity>().Remove(entity);
    
    public async Task DeleteAsync(TEntity entity) => 
        await Task.Run(() => { Delete(entity); });

    public virtual async Task<int> CountAsync(Expression<Func<TEntity, bool>>? predicate = null)
    {
        var q = _backendContext.Set<TEntity>();
        if (predicate == null) return await q.CountAsync();
        return await q.CountAsync(predicate);
    }

    public async Task<bool> ExistAsync(Expression<Func<TEntity, bool>> predicate) =>
        await _backendContext.Set<TEntity>().AnyAsync(predicate);
    
    public IQueryable<TEntity> GetById(int id) =>
        _backendContext.Set<TEntity>().Where(c => c.Id == id);

    public IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>>? predicate = null)
    {
        var q = _backendContext.Set<TEntity>();
        if (predicate == null) return q;
        return q.Where(predicate);
    }
        

}