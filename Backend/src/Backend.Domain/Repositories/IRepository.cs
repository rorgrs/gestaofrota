using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Backend.Domain.Repositories;

public interface IRepository<TEntity> where TEntity : class
{
    Task<int> SaveAsync();
    Task AddAsync(TEntity entity);
    void Update(TEntity entity);
    Task UpdateAsync(TEntity entity);
    void Delete(TEntity entity);
    Task DeleteAsync(TEntity entity);
    Task<int> CountAsync(Expression<Func<TEntity, bool>>? predicate = null);
    Task<bool> ExistAsync(Expression<Func<TEntity, bool>> predicate);
    IQueryable<TEntity> GetById(int id);
    IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>>? predicate = null);
}
