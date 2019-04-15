const template = require("./views/bookChapterTable/bookChapterTable.handlebars");
import { BookChapterForm } from './bookChapterForm'; 
import { DeleteChapter } from './deleteChapter';

class BookChapterTable{
   constructor(ajaxService){
    {
       this.data = []; 
       this.bookChapterForm = null;  
       this.deleteChapter = null;
       this.ajaxService = ajaxService;   
       this.init();
    }  

   } 

   init() {
    const self = this;
  self.bookChapterForm = new BookChapterForm(self);
  self.deleteChapter = new DeleteChapter(self);
  self.registerEditBtnClick();
  self.registerDeleteBtnClick();
  self.registerAddBtnClick();
  self.loadTable();
}

registerEditBtnClick(){
  var self = this;
  $('body').on('click', '.edit-btn', function(e){
    $('.container-context').hide();
    $('#formContainer').show();
    const id = $(this).attr("id");
    self.bookChapterForm.loadForm(id);
  });
}

registerAddBtnClick(){
    var self = this;
    $('body').on('click', '#add-btn', function(e){
        $('.container-context').hide();
      $('#formContainer').show();
      self.bookChapterForm.loadForm(null);
    });
}

registerDeleteBtnClick(){
    var self = this;
   $('body').on('click', '.delete-btn', function(e){
    self.deleteChapter.init($(this).attr('data-id-to-delete'), $(this).attr('data-title'));
  });
}

loadTable(){
  var self = this;
    $('.container-context').hide();
    $('#tableContainer').show();
    $('#spinner').show();
    self.ajaxService.ajaxGet('./api/BookChapter')
    .then(function(myJson) {
      self.data = myJson;
      const _template = template(self.data);
      $('#tableContainer').empty().append(_template);
      $('#spinner').hide();
    })
    .catch(function(error){
      $('#spinner').hide();
      Toastr.error(`an error occured loading the table Error: ${error}`); 
      console.log(error);
    }) 
}
   
}
export { BookChapterTable };