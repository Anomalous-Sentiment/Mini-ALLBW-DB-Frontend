# Mini ALLBW DB Frontend

This is frontend of the Mini ALLBW DB project which displays data obtained from the Assault Lily Last Bullet W
APK file, as well as data obtained from the game APIs.

An existing database filled with the required data is required to use this.

For information on setting up a database and obtaining the required data, refer to the [Mini ALLBW DB project](https://github.com/Anomalous-Sentiment/Mini-ALLBW-DB)

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

Create a `.env` file to store environment variables. Refer to the `example.env` file for the required environment variables for the project and complete as needed.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build and run the application for production:

```bash
# npm
npm run build

npm run start
```