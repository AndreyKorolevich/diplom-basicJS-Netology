'use strict';
const logButton = new LogoutButton ();
logButton.action = () => ApiConnector.logout(response => {
    try {
        if(response.success === false) {
           throw new Error(response.data);
        }
        location.reload();
       } catch (err) {
           console.error(err);
       }
    return;
});

ApiConnector.current(response => {
    try {
        if(response.success === false) {
           throw new Error('There is no current user');
        }
        ProfileWidget.showProfile(response.data);
       } catch (err) {
           console.error(err);
       }
    return;
}); 
