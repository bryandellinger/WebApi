using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public class DBBookChapterService : IBookChapterService
    {
     private readonly BooksContext _booksContext;

    public DBBookChapterService(BooksContext booksContext)
    {
        _booksContext = booksContext;
    }
    public async Task AddAsync(BookChapter chapter)
        {
            await _booksContext.Chapters.AddAsync(chapter);
            await _booksContext.SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<BookChapter> chapters)
        {
            await _booksContext.Chapters.AddRangeAsync(chapters);
            await _booksContext.SaveChangesAsync();
        }

        public Task<BookChapter> FindAsync(Guid id) =>
             _booksContext.Chapters.FindAsync(id);

        public async Task<IEnumerable<BookChapter>> GetAllAsync() =>
              await _booksContext.Chapters.ToListAsync();

        public async Task<BookChapter> RemoveAsync(Guid id)
        {
            BookChapter chapter = await _booksContext.Chapters.SingleOrDefaultAsync(c => c.Id == id);
            if (chapter == null) return null;

            _booksContext.Chapters.Remove(chapter);
            await _booksContext.SaveChangesAsync();
            return chapter;
        }

        public void Update(BookChapter chapter)
        {
            _booksContext.Entry(chapter).State = EntityState.Modified;
            _booksContext.SaveChanges();
        }

        public async Task UpdateAsync(BookChapter chapter)
        {
            _booksContext.Entry(chapter).State = EntityState.Modified;
            await _booksContext.SaveChangesAsync();
        }
    }
}
