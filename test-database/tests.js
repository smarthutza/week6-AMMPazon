const queries = require('../src/database_queries.js');
const tape = require('tape');
const shot = require('shot');

tape('Test get query function', (t) => {
  const expected = `SELECT products.name, COUNT(basket.product_id) AS times_ordered FROM products
                       INNER JOIN basket ON products.id = basket.product_id
                       GROUP BY products.name ORDER BY times_ordered DESC;`;
  t.equal(expected, queries.getQuery('bestsellers'),'The right query is returned', expected);
  t.end();
});

tape('Test get Data function', (t) => {
  queries.getData('/get-data/bestsellers',(res) => {
    console.log(res);
   t.ok(typeof res === 'object');
   t.end();
  });
});
