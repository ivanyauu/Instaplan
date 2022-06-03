# InstaPlan - Share your daily plans with your friends!

## How to run locally
Clone repository into local machine and install the following packages:
- npm install firebase
- npm install @mui/material @emotion/react @emotion/styled
- npm install @material-ui/core @material-ui/icons

### Using the app
- Sign up with a username, email, and password
  - Unfortunately the function we used to add user data to the database is an async function, so you will have to click the "Sign Up" after inputting your information twice. This will throw an error saying that an account under than email exists, go ahead and click ok for that. But make sure you get the error after signing in
- Afterwards, head over to the "Profile" page at the top of the screen
  - Here, you can select a date and create an event with a name, description, start and end time.
  - At the bottom left, there is also a "make public" checkbox which will display your event to your followers if checked
- In the search tab, you can search for other users. Once a desired user is found, you can go ahead and click the "follow user" button, which will add them to your following list
- After following other users, head over to the "Home" page from the navbar
  - In this page, you will be able to see all of the events the users you are following have for the current date
- Make sure to log out once done!
