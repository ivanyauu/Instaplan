# InstaPlan - Share your daily plans with your friends!

## How to run locally
Clone repository into local machine and install the following packages:
- npm install firebase
- npm install @mui/material @emotion/react @emotion/styled
- npm install @material-ui/core @material-ui/icons

### Using the app
- Sign up with a username, email, and password
  - Unfortunately the function we used to add user data to the database is an async function, so you will have to click the "Sign Up" after inputting your information twice. This will throw an error saying that an account under than email exists, go ahead and click ok for that. But make sure you get the error after signing in
