using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel.Client;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //[HttpGet]
        //[Authorize(AuthenticationSchemes = "Basic")]
        //public IActionResult Get()
        //{
        //    return Ok();
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Customers customer)
        {
            var client = new HttpClient();
            var disco =  await client.GetDiscoveryDocumentAsync("https://localhost:44321");
            var tokenResponse = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
            {
                Address = disco.TokenEndpoint,
                ClientId = "ro.client",
                ClientSecret = "secret",

                UserName = customer.Email,
                Password = customer.Password,
                Scope = "api1"
            });
            if (tokenResponse.AccessToken == null)
            {
                return Unauthorized();
            }

            return Ok(tokenResponse.AccessToken);
        }
    }
}