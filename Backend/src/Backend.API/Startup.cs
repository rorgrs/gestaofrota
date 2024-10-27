using FluentValidation;
using FluentValidation.AspNetCore;
using Backend.Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Linq;
using System.Reflection;
using Backend.API.Middlewares;
using Backend.Application.Services;
using Backend.Domain.Repositories;
using Backend.Infrastructure.Database.Context;
using Backend.Infrastructure.Repositories;

namespace Backend.API;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc();
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblies(Assembly.GetExecutingAssembly().GetReferencedAssemblies().Select(Assembly.Load));

        services.AddDbContext<BackendContext>(options =>
            options.UseNpgsql(Configuration.GetConnectionString("BackendContext")));
        
        services.AddAutoMapper(Assembly.GetExecutingAssembly().GetReferencedAssemblies().Select(Assembly.Load));
            
        ConfigureDepdendencyInjection(services);
        
        var client = Configuration.GetSection("ClientHost")?.Value;

        if(!string.IsNullOrWhiteSpace(client))
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                   builder => builder
                    .WithOrigins(client)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                  );
            });

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend.API", Version = "v1" });
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend.API v1"));
        }

        app.UseHttpsRedirection();

        app.UseCors("CorsPolicy");

        app.UseMiddleware<ExceptionHandler>();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

    private static void ConfigureDepdendencyInjection(IServiceCollection services)
    {
        services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
        services.AddScoped(typeof(IMotoristaService), typeof(MotoristaService));
        services.AddScoped(typeof(IUsuarioService), typeof(UsuarioService));
        services.AddScoped(typeof(IVeiculoService), typeof(VeiculoService));
        services.AddScoped(typeof(IViagemService), typeof(ViagemService));
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));   
    }
}
