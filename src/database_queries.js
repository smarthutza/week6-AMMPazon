const dbConnection = require('./../database/db_connection');


const query = {};

const getQuery = (url) => {
  const queries =  {
    bestSellers: ``,
   customeryBySpend :`SELECT customers.firstname || ' ' || customers.surname AS name, SUM(products.price) AS total_spend FROM customers
                      INNER JOIN orders ON customers.id = orders.customer_id
                      INNER JOIN basket ON basket.order_id = orders.id
                      INNER JOIN products  ON products.id = basket.product_id
                      GROUP BY customers.firstname, customers.surname;`,
    salesThisYear:``,
    salesToDate:``
  }
  return queries[url];
};

query.getCustomersBySpend = (url,handlerCallback) => {
  dbConnection.query(getQuery(url), (err, res) => {
    if (err) {
      handlerCallback(err);
    } else {
      handlerCallback(null, res);
    }
  });
};


module.exports = query;
