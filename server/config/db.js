const Datastore = require('nedb');

const db = {};

/**
 * @description create and load dyanmic Databases AND  it's physical file
*/
db[`users`] = new Datastore(`${'./../database/users.db'}`);
db[`users-products`] = new Datastore(`${'./../database/users-products.db'}`);
db[`products-cat`] = new Datastore(`${'./../database/products-cat.db'}`);
/**
* @description Load datafile in db object
*/
db[`users`].loadDatabase();
db[`users-products`].loadDatabase();
db[`products-cat`].loadDatabase();
/**
* @description remove $delete refernce and corrupt data row from physical data file after every 20 sec
*/
db[`users`].persistence.setAutocompactionInterval(20000);
db[`users-products`].persistence.setAutocompactionInterval(20000);
db[`products-cat`].persistence.setAutocompactionInterval(20000);

exports.db = db;
