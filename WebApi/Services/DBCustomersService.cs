using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public class DBCustomersService : ICustomersService
    {
        private readonly BooksContext _booksContext;

        public DBCustomersService(BooksContext booksContext)
        {
            _booksContext = booksContext;
        }
        public async Task AddAsync(Customers customer)
        {
            await _booksContext.Customers.AddAsync(customer);
            await _booksContext.SaveChangesAsync();
        }

        public bool EmailAlreadyExists(string email)
        {
            return _booksContext.Customers.Any(x => x.Email == email);
        }

        public async Task<Customers> FindAsync(Guid id) {
            var customer = await _booksContext.Customers.FindAsync(id);
            customer.Password = null;
            return customer;
        }
          

    }
}
