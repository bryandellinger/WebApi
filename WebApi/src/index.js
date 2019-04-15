import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import * as Toastr from 'toastr';
window.Toastr = Toastr;
import './/../node_modules/toastr/build/toastr.css';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import 'jquery-validation'
import { Login } from './login';
const indexTemplate = require("./views/index.handlebars");
const formTemplate = require("./views/bookChapterForm/bookChapterFormBody.handlebars");
$(function() {
   const _indexTemplate = indexTemplate();
   const _formTemplate = formTemplate();
  $('body').append(_indexTemplate);
  $('#formContainer').append(_formTemplate);
  const login = new Login();
});