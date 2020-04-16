'use strict';
const user = new UserForm();
 user.loginFormCallback = data => ApiConnector.login(data, response => {
     try {
         if(response.success === false) {
            throw new Error(response.data);
         }
         JSON.stringify(response);
         location.reload();
        } catch (err) {
            console.error(err);
        }
     return;
 });
 user.registerFormCallback = data => ApiConnector.register(data, response => {
    try {
        if(response.success === false) {
           throw new Error(response.data);
        }
        JSON.stringify(response);
        location.reload();
       } catch (err) {
           console.error(err);
       }
    return;
});
