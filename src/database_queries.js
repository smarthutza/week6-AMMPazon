const dbConnection = require('./../database/db_connection');


const query = {};


query.getCustomersBySpend = (handlerCallback) => {
  dbConnection.query('SELECT * FROM customers', (err, res) => {
    if (err) {
      handlerCallback(err);
    } else {
      handlerCallback(null, res);
    }
  });
};


module.exports = query;
