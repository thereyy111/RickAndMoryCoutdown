# Rick and Morty Countdown

## 1. Firebase setup
1. Create a project at https://console.firebase.google.com/ and add a Web App.
2. Copy the web config and replace the `firebaseConfig` values in `index.html`.
3. In Authentication > Sign-in method, enable Google and GitHub. Configure GitHub OAuth app credentials and callback URL shown by Firebase.
4. In Authentication > Settings > Authorized domains, add the domain where the site is hosted.

## 2. Deploy callable functions
Use a terminal with Firebase CLI, in this project directory:
- `npm install -g firebase-tools`
- `firebase login`
- `firebase init` (select Functions; use existing project and JavaScript; preserve this folder)
- `cd functions && npm install && cd ..`
- `firebase deploy --only functions`

## 3. Host the website
Host `index.html` on Firebase Hosting, GitHub Pages, or another web host. Do not open it using `file://`.

## Admin identity
The backend checks for the verified email `rrobertsrayisthebestbud@gmail.com`. GitHub username alone is not verified as admin identity; configure GitHub sign-in so it supplies the same verified email if you want it to qualify.

## Terminal
The admin terminal is restricted to informational demo commands (`help`, `status`, `users`, `clear`, `close`, `logout`). The server checks admin permission on every call.

## Countdown
The dates are placeholders in the `releases` array near the end of `index.html`. Replace them with announced dates.
