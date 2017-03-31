const queries = require('../src/database_queries.js');
const tape = require('tape');
const shot = require('shot');

const sqlQueries = [
  {bestsellers:      `SELECT products.name, COUNT(basket.product_id) AS times_ordered FROM products
                      INNER JOIN basket ON products.id = basket.product_id
                      GROUP BY products.name ORDER BY times_ordered DESC;`},

  {customersbyspend: `SELECT customers.firstname || ' ' || customers.surname AS name, SUM(products.price) AS total_spend FROM customers
                      INNER JOIN orders ON customers.id = orders.customer_id
                      INNER JOIN basket ON basket.order_id = orders.id
                      INNER JOIN products  ON products.id = basket.product_id
                      GROUP BY customers.firstname, customers.surname;`},

  {salesthisyear:    `SELECT SUM(products.price) as total_sales_this_year FROM customers
                      INNER JOIN orders ON customers.id = orders.customer_id
                      INNER JOIN basket ON basket.order_id = orders.id
                      INNER JOIN products ON products.id = basket.product_id
                      WHERE orders.date >= '01-01-2017';`},

  {salestodate:      `SELECT SUM(price) AS Sales_To_Date FROM products
                      INNER JOIN basket ON products.id = basket.product_id;`}
];


const differentQueries = ['bestsellers', 'customersbyspend','salesthisyear','salestodate'];


differentQueries.forEach((query, index) => {
  let expected = sqlQueries[index][query].replace(/\s+/g, ' ');
  let actual = queries.getQuery(query).replace(/\s+/g, ' ');

  tape('Test get query function', (t) => {
    t.equal(expected, actual,`${query}: should return`, expected);
    t.end();
  });
});





differentQueries.forEach((query) => {
  tape(`Test ${query} query`, (t) => {
    queries.getData(`/get-data/${query}`,(err,res) => {
      t.ok(Array.isArray(res.rows),`expect the ${query} response object to have an array containing our results`);
      t.end();
    });
  });
});


tape(`Test that Sales to Date query returns a string that coerces into a number`, (t) => {
  queries.getData(`/get-data/salestodate`,(err,res) => {
    t.ok(Number.isInteger(Number(res.rows[0].sales_to_date)),`expect the Sales to Date query to return string that coerces into a number`);
    t.end();
  });
});


tape(`Test that Sales this Year query returns string that coerces into a number`, (t) => {
  queries.getData(`/get-data/salesthisyear`,(err,res) => {
    t.ok(Number.isInteger(Number(res.rows[0].total_sales_this_year)),`expect the Sales this Year query to return string that coerces into a number`);
    t.end();
  });
});
