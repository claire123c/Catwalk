# PROJECT CATWALK BACKEND

## Summary
Project Catwalk is a client-facing retail web application, which consists of Product Overview, Ratings & Reviews, Questions & Answers, Related Items & Comparison. This project is the built out API to support the Front End of Project Catwalk that has been scaled up to meet the demands of production traffic. 

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

