# week6-AMMPazon


User Stories
===
Our intended user is a store owner who wishes to see his/her **Amppazon** analytics.
Specifically his/her

* Bestsellers
* Their sales to date
* Their sales for the current year
* Their most valued customer

We started with our architecure professionally depicted below:
![Our Initial Architecture](./public/assets/architecture.png)

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
 * To run tests to a fake database you can create a process.env variable which you set on running npm test
