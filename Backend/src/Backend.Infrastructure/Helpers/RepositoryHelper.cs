using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Backend.Infrastructure.Helpers;

public static class RepositoryHelper
{
    public static IQueryable<TEntity> Include<TEntity>(this IQueryable<TEntity> source, IEnumerable<string> entitiesToInclude) where TEntity : class
    {
        var toInclude = entitiesToInclude.ToArray();
        if (!toInclude.Any()) return source;
        
        foreach (var entity in toInclude)
            source = source.Include(entity);

        return source;
    }

    public static IQueryable<TEntity> Filter<TEntity>(this IQueryable<TEntity> source, IEnumerable<Expression<Func<TEntity, bool>>> predicates) where TEntity : class
    {
        var expressions = predicates.ToList();
        if (!expressions.Any()) return source;
        
        foreach (var predicate in expressions)
            source = source.Where(predicate);

        return source;
    }
}
