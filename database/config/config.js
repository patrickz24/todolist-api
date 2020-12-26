require('dotenv').config({ path: __dirname + '/.env' });
module.exports={
  "development": {
    "username": "root",
    "password": "root",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },

}
