# NFL Arrest Fun

This project uses `http://nflarrest.com/api/` and Wikipedia to display nfl arrest data compared to overall draft pick for NFL players.

### Prereqs

* PostgreSQL database
* npm 2.15.8
* node 4.4.7

### Setup
First Edit `src/config/config.json` to use the Postgre database.

Go to the src directory and run:
```
$> npm install        // installs required packages
$> npm run initDB     // initializes database with API calls
$> npm client-build   // bundles react components
$> npm start          // starts server on port 3000
```
