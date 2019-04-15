using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IBookChapterService
    {
        Task<IEnumerable<BookChapter>> GetAllAsync();
        Task AddRangeAsync(IEnumerable<BookChapter> chapters);
        Task<BookChapter> FindAsync(Guid id);
        Task AddAsync(BookChapter chapter);
        Task UpdateAsync(BookChapter chapter);
        void Update(BookChapter chapter);
        Task<BookChapter> RemoveAsync(Guid id);
    }
}
