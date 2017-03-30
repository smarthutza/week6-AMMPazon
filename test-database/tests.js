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


