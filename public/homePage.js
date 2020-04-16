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

const rate = new RatesBoard();
const updateRates = () => ApiConnector.getStocks(response => {
    try {
        if(response.success === false) {
           throw new Error('Data has not get');
        }
        rate.clearTable();
        rate.fillTable(response.data);
       } catch (err) {
           console.error(err);
       }
    return;
});
updateRates();
setInterval(updateRates,60000);

const money = new MoneyManager();
money.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    try {
        if(response.success === false) {
           throw new Error('It`s impossible to add mony in your wallet');
        }
        money.setMessage(false,'Money has added to your wallet successfully');
        ProfileWidget.showProfile(response.data);  
       } catch (err) {
           money.setMessage(true,err);
       }
    return;
});

money.conversionMoneyCallback = data => ApiConnector.convertMoney(data,response => {
    try {
        if(response.success === false) {
           throw new Error('It`s impossible to convert this');
        }
        money.setMessage(false,'The conversion was successful');
        ProfileWidget.showProfile(response.data);  
       } catch (err) {
           money.setMessage(true,err);
       }
    return;
});

money.sendMoneyCallback = data => ApiConnector.transferMoney(data,response => {
    try {
        if(response.success === false) {
           throw new Error('It`s impossible to transfer money');
        }
        money.setMessage(false,'The transfer was successful');
        ProfileWidget.showProfile(response.data);  
       } catch (err) {
           money.setMessage(true,err);
       }
    return;
});

const widget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    try {
        if(response.success === false) {
           throw new Error('Data has not get');
        }
        widget.clearTable();
        widget.fillTable(response.data);
        money.updateUsersList(response.data);
       } catch (err) {
           money.setMessage(true,err);
       }
    return;
});

widget.addUserCallback = data => ApiConnector.addUserToFavorites(data,response => {
    try {
        if(response.success === false) {
           throw new Error('User has not added');
        }
        money.setMessage(false,'User has added');
        widget.clearTable();
        widget.fillTable(response.data);
        money.updateUsersList(response.data); 
       } catch (err) {
           money.setMessage(true,err);
       }
    return;
});

widget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data,response => {
    try {
        if(response.success === false) {
           throw new Error('User has not removed');
        }
        money.setMessage(false,'User has removed');
        widget.clearTable();
        widget.fillTable(response.data);
        money.updateUsersList(response.data); 
       } catch (err) {
           money.setMessage(true,err);
       }
    return;
});