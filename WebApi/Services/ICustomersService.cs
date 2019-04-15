using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public interface ICustomersService
    {
        Task AddAsync(Customers customer);
        bool EmailAlreadyExists(string email);
        Task<Customers> FindAsync(Guid id);
    }
}
