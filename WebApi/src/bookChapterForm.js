import { timingSafeEqual } from "crypto";

const formHeaderTemplate = require("./views/bookChapterForm/bookChapterFormHeader.handlebars");

class BookChapterForm{
   constructor(bookChapterTable){
    {
       this.data = []; 
       this.validator = null;
       this.bookChapterTable = bookChapterTable;    
       this.init();
    }  

   } 

   init() {
    this.registerCancelBtnClick();
    this.registerValidator();
   }


   loadForm(id){
       document.getElementById("chapterForm").reset();
       var self = this;
       if(id){
       self.bookChapterTable.ajaxService.ajaxGet(`./api/BookChapter/${id}`)
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
      self.data = myJson;
      $('#number').val(self.data.number);
      $('#title').val(self.data.title);
      $('#pages').val(self.data.pages);
      $('#chapterId').val(self.data.id);
      const _formHeaderTemplate = formHeaderTemplate(self.data.title);
      $( "#formHeader" ).remove();
      $('#formContainer').prepend(_formHeaderTemplate);
    }); 
  }
  else{
    $('#chapterId').val('');
    const _formHeaderTemplate = formHeaderTemplate('Enter New Chapter');
    $( "#formHeader" ).remove();
    $('#formContainer').prepend(_formHeaderTemplate);
  }
}  

registerCancelBtnClick(){
    var self = this;
    $('body').on('click', '#cancel-btn', function(e){
      $('#tableContainer').show();
      $('#formContainer').hide();
      if (self.validator){
        self.validator.resetForm();
        $('#chapterForm .form-control').removeClass('error');
       }
    });
}

registerValidator(){
    var self = this;
   this.validator =  $("#chapterForm").validate({
        rules: {
            "number": {
                required: true,
            },
            "title": {
                required: true,
            },
            "pages": {
                required: true,
            }
        },
        messages: {
            "number": {
                required: "Please, enter a number"
            },
            "title": {
                required: "Please, enter a title"
            },
            "pages": {
                required: "Please, enter the number of pages"
            }
        },
        submitHandler: function (form) { // for demo
            self.submitForm();
            return false; // for demo
        }
    });   
  }

  submitForm(){
      var self = this;
      const title = $('#title').val();
      const number = $('#number').val();
      const pages = $('#pages').val();
      const id = $('#chapterId').val();
      const url = id ? `./api/BookChapter/${id}` : './api/BookChapter'; 
      const method = id ? 'PUT' : 'POST';
      const  data = id ? {title: title, number: number, pages: pages, id: id} : {title: title, number: number, pages: pages};
      var  headers = new Headers();          
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${self.bookChapterTable.ajaxService.token}`);
    fetch(url,
       {method: method, body: JSON.stringify(data),headers:headers})
        .then(function(response){
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        }).then(function(response){
            Toastr.success(`${$('#title').val()} has been ${id ? 'Updated' : 'Added'}`);  
            self.bookChapterTable.loadTable();       
        }).catch(function(error){
            Toastr.error(`An error occured : ${error}`);  
            self.bookChapterTable.loadTable();       
        })
}


}
export { BookChapterForm };