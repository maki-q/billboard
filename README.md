
# Billboard Top 100

A single user application that allows you to view the Billboard Top 100, save your favorite songs, and view favorited songs.

## Installation

```
npm install
```

## Setup
* Rename server/spotify/config.example.js to server/spotify/config.js
* Replace CLIENT_ID and CLIENT_SECRET with Spotify Access tokens. If no tokens are provided, the app will use a Top 100 list generated on 1/23/2022.
* Rename server/db/config.example.js to server/db/config.js
* Replace with local postgres login information.

First time running, set up local database with
```
npm run setup-db
```

In two different terminals run

```
npm start
npm run build-client
```

open

```
http://localhost:3000/

```