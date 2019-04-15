using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using WebApi.Models;
using WebApi.Security.Authentication;
using WebApi.Security.OAuth;
using WebApi.Services;

namespace WebApi
{
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddScoped<IBookChapterService, DBBookChapterService>();
            services.AddScoped<ICustomersService, DBCustomersService>();
            services.AddDbContext<BooksContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();
  
            services.AddIdentityServer()
                   .AddInMemoryApiResources(Config.GetApiResources())
                   .AddInMemoryClients(Config.GetClients())
                   .AddProfileService<ProfileService>()
                   .AddDeveloperSigningCredential();

       

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                                           JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme =
                                           JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = "https://localhost:44321";
                o.Audience = "api";
                o.RequireHttpsMetadata = false;
            });

            //services.AddAuthentication("Bearer")
            //.AddJwtBearer("Bearer", options =>
            //{
            //    options.Authority = "https://localhost:44321";
            //    options.RequireHttpsMetadata = false;

            //    options.Audience = "api1";
            //});



            //services.AddAuthentication("Basic").AddScheme<BasicAuthenticationOptions, BasicAuthenticationHandler>("Basic", null);
            //services.AddTransient<IAuthenticationHandler, BasicAuthenticationHandler>();

            services.AddSwaggerGen(options =>
             options.SwaggerDoc("v2", new Info {
                 Title = "Books Service API",
                 Version = "v2",
                 Description = "Sample Service for c# 7 .net Core",
                 Contact = new Contact
                 {
                     Name = "Bryan Dellinger",
                     Url = "https://localhost:44321/api"
                 },
                 License = new License
                 {
                     Name = "MIT Licensce"
                 }
             })
           );
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public  void Configure(IApplicationBuilder app, IHostingEnvironment env, BooksContext booksContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseIdentityServer();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(options =>
                options.SwaggerEndpoint("/swagger/v2/swagger.json", "Book Chapter Service"));
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
