# React Firebase Mongo Template (with role selection)

This is a template for a React app with Firebase authentication and MongoDB. It also includes a role selection feature.

### Watch the YT video link for tutorial: [RFMT Video](https://www.youtube.com/watch?v=LQQfauazZDE)


## Features

- Firebase authentication
- MongoDB
- Role selection
- Protected routes
- Error handling

## Installation

1. Clone the repository `git clone https://github.com/subhadeeproy3902/react-firebase-mongo-template.git` or download the zip file.
2. Open the project in your favorite code editor.
3. Navigate to the project directory `cd react-firebase-mongo-template`.

## Usage (Frontend)

1. Navigate to the frontend directory `cd frontend`.
2. Install the dependencies `npm install` or `yarn install` or `pnpm install` or `bun install`.
3. Create a .env file in the frontend directory and add the following environment variables:

```
REACT_APP_FIREBASE_API_KEY= <Your Firebase Api Key>

REACT_APP_FIREBASE_AUTH_DOMAIN= <Your Firebase Auth Domain>

REACT_APP_FIREBASE_PROJECT_ID= <Your Firebase Project ID>

REACT_APP_FIREBASE_STORAGE_BUCKET= <Your Firebase Storage Bucket>

REACT_APP_FIREBASE_MESSAGING_SENDER_ID= <Your Firebase Messaging Sender ID>

REACT_APP_FIREBASE_APP_ID= <Your Firebase App ID>

REACT_APP_NODE_ENV= <development in local> || <production in deployment>
```

4. Start the development server `npm start` or `yarn start` or `pnpm start` or `bun start`.
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage (Backend)

1. Navigate to the backend directory `cd backend`.
2. Install the dependencies `npm install` or `yarn install` or `pnpm install`.
3. Create a .env file in the backend directory and add the following environment variables:

```
REACT_APP_NODE_ENV= <development in local> || <production in deployment>

MONGO_URI= <Your Mongo Connection String>
```

4. Start the development server `npm start` or `yarn start` or `pnpm start`.
5. The server will start at [http://localhost:5000](http://localhost:5000).

## Working

1. The user can sign up with email and password or with Google. The Credentials are stored in Firebase and the user data is stored in MongoDB.

2. After signing up, the user can select a role (Default 1 or Default 2). You can also change the role. Search in the workspace for `default1` and `default2`


![ok](https://i.postimg.cc/rpRYyXjG/image.png)


3. The user will be redirected to the respective dashboard page. In case the user signs up with Google, your Google profile DP,name and email will be displayed and in case he signs up with email and password, random avatar image, signup name and signup email will be displayed.

4. The user can sign out from the dashboard page and will be redirected to the signup page.

5. Once a user has already signed up, he can directly sign in with email and password or with Google and will be redirected to the respective dashboard page.

6. The same user cannot signup with the same email again. If he tries to do so, an error message will be displayed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Where to Contact

- [Subhadeep Roy](https://www.linkedin.com/in/subhadeeproy3902/)

## Support

If you like the project, give a star ⭐ to the repository and share it with others. Also you can use this as a template too for your works as well
