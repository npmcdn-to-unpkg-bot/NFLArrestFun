# NFL Arrest Fun

This project uses `http://nflarrest.com/api/` and Wikipedia to display nfl arrest data compared to overall draft pick for NFL players.

### Prereqs

* PostgreSQL Database
* npm 2.15.8
* node 4.4.7

### Setup
First Edit `src/config/config.json` to use the Postgre database.

Go to the src directory and run:
```
$> npm install        // installs required packages
$> npm run initDB     // initializes database with API calls
$> npm build-client   // bundles react components
$> npm start          // starts server on port 3000
```

### TODO
Note: Not in order of priority

* Normalize database schema
* Clean up implementation of data fetcher
* Add unit tests!!!!!!!!!
* Check linting
* Add data to compare player salaries
* Add regression line to scatter plot
* Destroy graph before rerendering component.
