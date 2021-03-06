# Ammpazon Analytics

User Stories
===
Our intended user is a store owner who wishes to see his/her **Amppazon** analytics.
Specifically his/her

* Bestsellers
* List of customers by spend
* Sales for the current year
* Sales to date

We started with our architecture professionally depicted below:
![Our Initial Architecture](./demo/architecture.png)

How to run our App
===
* Clone the repository
* Run `npm install`
* create a `config.env` and a `config-test.env`
* Add the `DB_URL` variable (gitter channel **FAC10**)
* run `npm run dev` to run the project
* run `npm test` to run tests

Learning points
===
 * To run a *build or sql* script locally you can run
`\i {name of your build script}`

Running tests on a fake database
===
* We wanted to ensure that we knew what our database queries would return without damaging our *production* database.
* We created a fake database by first duplicating the build process with a different URL/connection to elephant sql.

In config.env
```
DB_URL=postgres://usernameHere:passwordJere@stampy.db.elephantsql.com:5432/dbName
```
In config-test.env
```
DB_URL=postgres://otherusername:otherPassword@stampy.db.elephantsql.com:5432/testDatabase
```
* We then set up an `process.env` variable we called `ENV` which we set equal to `TEST`
* We then check in our build connection file whether this variable exist and set the call to `env2` using this.

```js
const environment = require('env2');

if (process.env.ENV === 'TEST') {
  environment('config-test.env'); 
} else {
  environment('config.env');
}
```
* We then run npm test with the following commands in our package.json
```
"pretest": "ENV=TEST node test-database/db_build_test.js",
"test": "node test-database/tests.js | tap-spec"
```
