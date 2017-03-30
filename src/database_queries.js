const dbConnection = require('./../database/db_connection');

const query = {};
query.getBestseller = (cb) =>{
  dbConnection.query("SELECT products.name, COUNT(basket.product_id) AS times_ordered FROM products INNER JOIN basket ON products.id = basket.product_id GROUP BY products.name ORDER BY times_ordered DESC"
    , (err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

const getQuery = (url) => {
  const queries =  {
    bestSellers: `SELECT SUM(price) AS Sales_To_Date FROM products INNER JOIN basket ON products.id = basket.product_id`,
   customeryBySpend :`SELECT customers.firstname || ' ' || customers.surname AS name, SUM(products.price) AS total_spend FROM customers
                      INNER JOIN orders ON customers.id = orders.customer_id
                      INNER JOIN basket ON basket.order_id = orders.id
                      INNER JOIN products  ON products.id = basket.product_id
                      GROUP BY customers.firstname, customers.surname;`,
    salesThisYear:``,
    salesToDate:``
  };
  return queries[url];
};



query.getData = (url, handlerCallback) => {
  dbConnection.query(getQuery(url), (err, res) => {
    if (err) {
      handlerCallback(err);
    } else {
      handlerCallback(null, res);
    }
  });
};


// query.getAllSales = (cb) =>{
//   dbConnection.query(getQuery(url)
//     , (err, res) => {
//       if (err) cb(err);
//       cb(null, res);
//     });
// };





module.exports = query;
