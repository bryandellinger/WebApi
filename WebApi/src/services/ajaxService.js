
class AjaxService{

   constructor(){ 
       this.token = null;
       } 

       getAccessToken(email, password){
         var self = this;
         var data = {email: email, password: password};

         return new Promise((resolve, reject) => {
            $.ajax({
                url: './api/Login',
                cache: false,
                data: JSON.stringify(data),
                type: 'POST',
                contentType:"application/json; charset=utf-8",
                dataType: 'text'
            })
				.done((token) => {
                    self.token = token;
					resolve();
                })
                .fail((jqXHR) => {
                    self.handleErrors(jqXHR, reject);
                });
        });
       }

   
       ajaxGet(url) {
        var self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Bearer ${self.token}`);
                },
            })
				.done((responseData) => {
					resolve(responseData);
                })
                .fail((jqXHR) => {
                    self.handleErrors(jqXHR, reject);
                });
        });
    }

    ajaxDelete(url) {
        var self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                cache: false,
                type: 'DELETE',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Bearer ${self.token}`);
                },
            })
                .done((responseData) => {
					resolve(responseData);
                })
                .fail((jqXHR) => {
                    this.handleErrors(jqXHR, reject);
                });
        });
    }

    handleErrors(xhr, reject) {
        switch (xhr.status) {
        case 403: // not authorized
        Toastr.error(`not authorized`); 
        reject('not authorized');
            break;
        case 401: // not authorized
            Toastr.error(`not authorized`); 
            reject('not authorized');
                break;
        default:
           Toastr.error(`error: ${xhr.statusText}`);
            reject(xhr.statusText);
            break;
        }
    }
 
}
export { AjaxService };

