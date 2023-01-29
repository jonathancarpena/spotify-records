# Spotify Records

> A Spotify web application that displays your top tracks/top artists and creates a playlist based on user's Spotify history.

## 🚀 Objective

> To implement OAuth and work with a third-party API.

## 📸 Screenshots

<ul style="display:flex flex-direction:column">
<img src="./screenshots/landing.PNG" style="max-width:100%; max-height:375px;" alt="landing"> 
<img src="./screenshots/dateOnHover.PNG" style="max-width:100%; max-height:375px;" alt="dateOnHover">
<img src="./screenshots/photoOpen.PNG" style="max-width:100%; max-height:375px;" alt="photoOpen">    
</ul>

### Mobile Design

<ul style="display:flex">
<img src="./screenshots/tablet.PNG" width="271" height="361" alt="tablet">  
<img src="./screenshots/mobile.PNG" width="173" height="361" alt="mobile">  
</ul>

## ⚙ Technologies

-  React
-  Typescript
-  Next.js
-  Spotify API



## 🛠 Installation and Setup

Clone down this repository. You will need node and npm installed globally on
your machine.

```
$ git clone https://github.com/jonathancarpena/spotify-records.git
```

1. Install project folder `npm install`

### Environment Variables

To run this project, you will need to add the following environment variables to
your `.env` file inside the server folder.

`NEXT_PUBLIC_CLIENT_ID`: Retrieve Client ID from your Spotify Dashboard

`NEXT_PUBLIC_CLIENT_SECRET`: Retrieve Client Secret from your Spotify Dashboard

`NEXT_PUBLIC_REDIRECT_URI`: Retrieve Redirect URI from your Spotify Dashboard

### Scripts

Development mode. Open http://localhost:3000 to view it in the browser.

```
npm run start
```
