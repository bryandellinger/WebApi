const template = require("./views/login.handlebars");
const userTemplate = require("./views/user.handlebars");
import { BookChapterTable } from './bookChapterTable'; 
import { Register } from './register';
import { AjaxService } from './services/ajaxService';
class Login{
   constructor(){
       this.validator = null;
       this.register = null;
       this.ajaxService = new AjaxService();
       this.init();
   } 

   init() {
    const _template = template();
    $('#loginContainer').empty().append(_template);
    this.registerValidator();
    this.register = new Register();
    this.registerRegistrationLinkClick();
   }

   registerRegistrationLinkClick(){
    var self = this;
    $('body').on('click', '#register-link', function(e){
       self.register.showRegistrationForm();
    });
   }

   registerValidator(){
    var self = this;
   this.validator =  $("#login-form").validate({
        rules: {
            "email": {
                required: true,
                email: true
            },
            "password": {
                required: true,
            }
        },
        messages: {
            "email": {
                required: "Please, enter the email you registered with"
            },
            "password": {
                required: "Please, enter a password"
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
    $('#spinner').show();
    self.ajaxService.getAccessToken($('#email').val(), $('#password').val())
    .then(function(){
        Toastr.success(`succesfully logged in`);
        self.ajaxService.ajaxGet('./api/currentUser')
        .then(function(user){
            const _template = userTemplate(user);
           $('#userContainer').empty().append(_template);
           console.log(user);
        });
        const bookChapterTable = new BookChapterTable(self.ajaxService);
    },
    function(err){
        $('#spinner').hide();
        Toastr.error('Invalid email or password'); 
         console.log(err);
    });
  }

}
export { Login };