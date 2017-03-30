const dbConnection = require('./../database/db_connection');


const getBestseller = (cb) =>{
  dbConnection.query("SELECT products.name, COUNT(basket.product_id) AS times_ordered FROM products INNER JOIN basket ON products.id = basket.product_id GROUP BY products.name ORDER BY times_ordered DESC"
    , (err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

module.exports = getBestseller;


const getAllSales = (cb) =>{
  dbConnection.query("SELECT SUM(price) AS Sales_To_Date FROM products INNER JOIN basket ON products.id = basket.product_id"
    , (err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

module.exports = getAllSales;



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
