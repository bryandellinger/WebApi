const template = require("./views/deleteChapter.handlebars");

class DeleteChapter{
   constructor(bookChapterTable){
       this.bookChapterTable = bookChapterTable;
       this.id = null;
       this.title = null;
       this.registerYesBtn();
       this.registerNoBtn();
   } 

   init(id, title) { 
    this.id = id;
    this.title = title;
    const _template = template({id: id, title: title});
    $('.container-context').hide();
    $('#deleteContainer').empty().append(_template).show();
   }

   registerNoBtn(){
    var self = this;
    $('body').on('click', '#btn-no', function(e){
    $('#deleteContainer').empty();
    $('.container-context').hide();
    $('#tableContainer').show();
    });
   }

   registerYesBtn(){
    var self = this; 
    $('body').on('click', '#btn-yes', function(e){
        self.bookChapterTable.ajaxService.ajaxDelete(`./api/BookChapter/${self.id}`)
        .then(function(){
            $('#deleteContainer').empty();
            $('.container-context').hide();
            Toastr.success(`${self.title} has been deleted`); 
            self.bookChapterTable.loadTable();     
        });
    });
   }
}
export { DeleteChapter };