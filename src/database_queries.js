const dbConnection = require('./../database/db_connection');


const query = {};


const getQuery = (url) => {
  const queries =  {
    bestsellers:      `SELECT products.name, COUNT(basket.product_id) AS times_ordered FROM products
                       INNER JOIN basket ON products.id = basket.product_id
                       GROUP BY products.name ORDER BY times_ordered DESC;`,

    customersbyspend: `SELECT customers.firstname || ' ' || customers.surname AS name, SUM(products.price) AS total_spend FROM customers
                       INNER JOIN orders ON customers.id = orders.customer_id
                       INNER JOIN basket ON basket.order_id = orders.id
                       INNER JOIN products  ON products.id = basket.product_id
                       GROUP BY customers.firstname, customers.surname;`,

    salesthisyear:    `SELECT SUM(products.price) as total_sales_this_year FROM customers
                       INNER JOIN orders ON customers.id = orders.customer_id
                       INNER JOIN basket ON basket.order_id = orders.id
                       INNER JOIN products ON products.id = basket.product_id
                       WHERE orders.date >= '01-01-2017';`,

    salestodate:      `SELECT SUM(price) AS Sales_To_Date FROM products
                       INNER JOIN basket ON products.id = basket.product_id;`
  };

  return queries[url];
};


query.getData = (url, handlerCallback) => {

  const urlQuery = url.split('/')[2];

  dbConnection.query(getQuery(urlQuery), (err, res) => {
    if (err) {
      handlerCallback(err);
    } else {
      handlerCallback(null, res);
    }
  });
};


module.exports = query;
