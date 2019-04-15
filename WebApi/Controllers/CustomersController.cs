using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomersService _customersService;

        public CustomersController(ICustomersService customersService)
        {
            _customersService = customersService;
        }

        // POST api/BookChapter
        [HttpPost]
        public async Task<IActionResult> PostCustomerAsync([FromBody] Customers customer)
        {
            if (customer == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_customersService.EmailAlreadyExists(customer.Email))
            {
                ModelState.AddModelError("email", "User with this email already exists");
                return BadRequest(ModelState);
            }

            await _customersService.AddAsync(customer);
            return CreatedAtAction("PostCustomerAsync", customer);
        }
    }
}