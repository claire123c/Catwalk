# PROJECT CATWALK BACKEND

# Index
<ol>
    <li><a href="#Summary">Summary</a></li>
    <li><a href="#Prequisites">Prequisites</a></li>
    <li><a href="#Usage">Usage</a></li>
    <li><a href="#Module-Description">Module Description</a></li>
    <li><a href="#Tests">Tests</a></li>
    <li><a href="#Author">Author</a></li>
    <li><a href="#Acknowledgements">Acknowledgements</a></li>
</ol>

## Summary
Project Catwalk is a client-facing retail web application, which consists of Product Overview, Ratings & Reviews, Questions & Answers, Related Items & Comparison. This project is the built out API for the Product Overview section to support the Front End of Project Catwalk and has been scaled up to meet the demands of production traffic on AWS. 

## Prequisites
```sh
Node v14.16.0
npm 7.16.0
PostgreSQL 13
```

## Usage
1. After forking the repo, open the CLI within the root directory of the project and run:
```sh
npm install
```
2. Create a config.js file in the root directory to connect to the PostgreSQL database in the following format:
```sh
module.exports = {
  host: 'localhost',
  user: 'root',
  database: 'products',
  password: '',
  port: '5432',
}
```
3. Seed Schema with necessary CSV files (not provided):
```sh
npm run seed:schema
```
4. Start Server:
```sh
npm start
```
5. The server runs on PORT 3002 on default. Navigate to http://localhost:3002 to send GET requests to server.

## Module Description
This backend API handles the following endpoints:
#### GET /products
Retrieves a list of products with optional parameters of page and count. If not specified, page defaults to 1 and count defaults to 5.
#### GET /products/:product_id
Retrieves all product level information for a specified product id.
#### GET /products/:product_id/styles
Returns the all styles available for the given product
#### GET /products/:product_id/related
Returns the id's of products related to the product specified.

## Tests
To ensure server is running properly, run:
```sh
npm test
```
## Author
Claire Chen

## Acknowledgements
I'd like to express my gratitude to Rob Lopez for his guidance and feedback on this project.



