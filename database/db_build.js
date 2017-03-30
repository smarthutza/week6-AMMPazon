const fs = require('fs');

const buildDatabase = () => {
  const connection = require('./db_connection');
  const sql = fs.readFileSync('./database/db_build.sql', 'utf8');

  connection.query(sql, (err, result) => {
    if (err) {
      console.log('error', err);
      throw new Error('Cannot create database');
    } else {
      console.log('Database created');
    }
  });
};

buildDatabase();

module.exports = buildDatabase;
