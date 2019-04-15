const template = require("./views/register.handlebars");
import { BookChapterTable } from './bookChapterTable'; 

class Register{
   constructor(){
       this.validator = null;
       this.init();
   } 

   init() {
    const _template = template();
    $('#registerContainer').empty().append(_template);
    this.registerValidator();
    this.registerCancelBtnClick();
   }

   registerCancelBtnClick(){
    var self = this;
    $('body').on('click', '#btn-cancel-registration', function(e){
        if (self.validator){
            self.validator.resetForm();
            $('#registerContainer').removeClass('error');
           }
        $('.container-context').hide();
        $('#loginContainer').show();
    });   
   }

   showRegistrationForm(){
    $('.container-context').hide();
    $('#registerContainer').show();
   }

   registerValidator(){
    var self = this;
   self.validator =  $("#registration-form").validate({
        rules: {
            "txtFirstName": {
                required: true,
            },
            "txtLastName": {
                required: true,
            },
            "txtEmail": {
                required: true,
                email: true
            },
            "txtPassword": {
                required: true,
                minlength: 8
            },
            "txtConfirmPassword": {
                required: true,
                equalTo: "#txtPassword"
            }

        },
        messages: {
            "txtFirstName": {
                required: "Please, enter your first name"
            },
            "txtFirstName": {
                required: "Please, enter your last name"
            },
            "txtEmail": {
                required: "Please, enter your email"
            },
            "txtPassword":{
                required: "Please enter a password",
                minlength: "Password must be at least 8 characters"
            },
            "txtConfirmPassword": {
                required: "Please re-enter a password",
                equalTo: "Passwords must match"
            }

        },
        submitHandler: function (form) { // for demo
            self.submitForm();
            return false; // for demo
        }
    });   
  }

  submitForm(){
    $('#spinner').show();

    var data = {
        "gender": $("input[name='gender']:checked").val(),
        "firstname": $('#txtFirstName').val(),
        "lastname": $('#txtLastName').val(),
        "dob": $('#txtDob').val(),
        "email": $('#txtEmail').val(),
        "telephone": $('#txtMobile').val(),
        "fax": $('#txtFax').val(),
        "password": $('#txtPassword').val(),
        "newsletteropted": false
    };
    
    fetch("./api/customers",
        {method: "POST", body: JSON.stringify(data),  headers:{'Content-Type': 'application/json'}})
         .then(function(response, error){
             console.log(error);
             console.log(response);
             if(!response.ok){
                 console.log(response);
                 throw Error(response.statusText);
             }
             return response;
         }).then(function(response){
             Toastr.success(`${data.firstname} ${data.lastname} has been successfully registered`);  
             const bookChapterTable = new BookChapterTable();     
         }).catch(function(error){
             console.log(error);
             Toastr.error(`An error occured : ${error}`);        
         })
  }

}
export { Register };