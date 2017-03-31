const queries = require('../src/database_queries.js');
const tape = require('tape');
const shot = require('shot');

const sqlQueries = [
  {  bestsellers:      `select products.name, count(basket.product_id) as times_ordered from products
    inner join basket on products.id = basket.product_id
    group by products.name order by times_ordered desc;`,

  },
  { customersbyspend: `select customers.firstname || ' ' || customers.surname as name, sum(products.price) as total_spend from customers
    inner join orders on customers.id = orders.customer_id
    inner join basket on basket.order_id = orders.id
    inner join products  on products.id = basket.product_id
    group by customers.firstname, customers.surname;`,

  },
  { salesthisyear:    `select sum(products.price) as total_sales_this_year from customers
    inner join orders on customers.id = orders.customer_id
    inner join basket on basket.order_id = orders.id
    inner join products on products.id = basket.product_id
    where orders.date >= '01-01-2017';` },
  { salestodate:      `select sum(price) as sales_to_date from products
        inner join basket on products.id = basket.product_id;` }
];

const differentQueries = ['bestsellers','salestodate','salesthisyear','customersbyspend'];

differentQueries.forEach((query,index) => {
  // let expected = sqlQueries[i].query;
  let expected = sqlQueries[index].query;
  tape('Test get query function', (t) => {
    t.equal(expected, queries.getQuery(query),`${query}: should return`, expected);
    t.end();
  })
});

differentQueries.forEach((query) => {
  tape(`Test ${query} query`, (t) => {
    queries.getData(`/get-data/${query}`,(err,res) => {
      t.ok(Array.isArray(res.rows),`expect the ${query} response object to have an array containing our results`);
      t.end();
    });
  })
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
