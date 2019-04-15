using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrentUserController : ControllerBase
    {
        private readonly ICustomersService _customersService;

        public CurrentUserController(ICustomersService customersService)
        {
            _customersService = customersService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var principal = HttpContext.User;
            if (principal?.Claims != null)
            {
                var claim = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
                if (claim != null)
                {
                    var id = claim.Value;
                    var result = await _customersService.FindAsync(new Guid(id));
                    return Ok(result);
                }
            }
            return BadRequest("unable to locate current user");
        }
    }
}