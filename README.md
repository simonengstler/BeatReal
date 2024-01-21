# BeatReal

## Your new, amazing music (re)discoveries? Beat real about it!

Stumbled upon a new song that you enjoy greatly? Up for some new musical impressions from all over the world?
Use BeatReal to group up with your family and friends and to broaden your musical horizons!

## Getting Started

### Backend

0. Install dependencies with `yarn install`

1. `copy .env.template .env` and add your Spotify Auth token (take note you will need to base64 encode ID:SECRET as per documentation)

2. If you know the private file password, run the following command replacing `$PASSWORD`

```sh
yarn decrypt $PASSWORD
```

3. Otherwise, create a `private/firebase-admin.json` file which contains your Firebase credentials

4. Run `yarn start`

#### Running with Docker

1. Build the image with the password to run the decrypt script

```sh
docker build --build-arg PASSWORD=$PASSWORD -t beatreal .
```

2. Run the image

```sh
docker run -it -p 3000:3000 beatreal
```

### Frontend

0. Install dependencies with `yarn install`

1. `copy .env.template .env` and add the backend URL (currently it is https://beatreal-production.up.railway.app)

2. If you know the private file password, run the following command replacing `$PASSWORD`

```sh
yarn decrypt $PASSWORD
```

3. [Optional] Otherwise, create a `private/google-services.json` and `private/GoogleService-Info.plist` file which contains your Firebase credentials for your Android and iOS service accounts respsectivey

4. Run `npx expo start --clear`
