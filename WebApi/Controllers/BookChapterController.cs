using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookChapterController : ControllerBase
    {
        private readonly IBookChapterService _bookChapterService;

        public BookChapterController(IBookChapterService bookChapterService)
        {
            _bookChapterService = bookChapterService;
        }

        // GET api/BookChapter
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var result = await _bookChapterService.GetAllAsync();
            return Ok(result);
        }


        // GET api/BookChapter/fa2fb890-ccdb-4e52-b14e-07f12c1bf633
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult> Get(Guid id)
        {
            BookChapter chapter = await _bookChapterService.FindAsync(id);
            if (chapter == null)
            {
                return NotFound();
            }
            else
            {
                return new ObjectResult(chapter);
            }

        }

        // POST api/BookChapter
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostBookChapterAsync([FromBody] BookChapter chapter)
        {
            if (chapter == null)
            {
                return BadRequest();
            }

            await _bookChapterService.AddAsync(chapter);
            return CreatedAtAction("PostBookChapterAsync", chapter);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(Guid id, [FromBody] BookChapter chapter)
        {
            if (chapter == null || id != chapter.Id)
            {
                return BadRequest();
            }

            await _bookChapterService.UpdateAsync(chapter);
            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task Delete(Guid id) => await _bookChapterService.RemoveAsync(id);
        
    }
}
