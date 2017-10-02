# TGIF Hacks #70: A Vue.JS and Firebase based Daily Journal

Today we'll be making a daily events journal in Vue.JS, a really cool emerging Javascript framework based on a Virtual DOM that's really easy to work with for beginners. We'll be using Google's Firebase (yay!) as a simple backend, to help familiarise you guys with Firebase.

Prerequisites:
  - Basic knowledge of HTML, CSS and Javascript / Node.js
  - Latest installation of Node.js
  - Code Editor
  - Google Account
  - Comfy clothes

Things to install:
  - Node.js CLI (Latest version available [here](https://nodejs.org/en/)
  - Vue.JS CLI (instructions available below, or check [this](https://vuejs.org/v2/guide/installation.html#CLI) out)

## What's the point of vue?

With the increasing popularity of Javascript as a language, there have been increasing numbers of frameworks made available to the public. Compared to the likes of React or Angular, Vue is lesser known. 

To help developers shift between these, Vue's syntax is quite like that of Angular or React, which brings us to an important point in Javascript programming.

You don't have to use every single framework that exists out there. There's just so many.

The best thing for you as a developer is to find one, stick with it long enough to understand if it suits your programming style, and they're all touch and go.

For instance, both Vue and React use a [Virtual DOM](https://tonyfreed.blog/what-is-virtual-dom-c0ec6d6a925c) and give you the option to compose and reuse your components in other larger components. Things like navbars, sidebars, footers and headers can be dynamically injected into pages where needed. 

While I could go on about the differences between each of the frameworks, I think [this](https://medium.com/unicorn-supplies/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176) dude sums it up quite well, if you're up for some nice lunch time reading. For the purpose of this workshop, I'll demonstrate how Vue is optimised and heckin useful for SPAs(Single Page Applications), making them really good for hackathons ;).


## Task 0 - Setting up the environment and gathering supplies
Let's start of by installing the Vue.JS CLI. Open your terminal and enter the following command:

```
npm install --global vue-cli
```
Once this is done, navigate to your preferred working environment and run the following command:

```
vue init webpack dailyjournal
```
You'll be prompted with some steps, and just follow the following steps:
```
$ vue init webpack dailyjournal

? Project name dailyjournal
? Project description A Vue.js project
? Author (Enter your name here)
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No

```

So what this command does is download a template for a single page Vue application for use in our project, in a folder called ``` dailyjournal```. We also need to install dependencies for Firebase, our backend database. This'll come in handy later on. Run the following commands:

```
cd dailyjournal
npm install firebase vuefire --save
```
N.B, the ``` --save ``` is really, really important. Now run the final command to start our development server:

```
npm run dev
```
Your browser should now open up a new tab and show you the page below, which you can also get to at http://localhost:8080
![task0](screenshots/task0.png?raw=true)
### Setting up Firebase

This is a good time to get our Firebase database set up as well. Before we get to that, let's understand what exactly Firebase is.
Firebase is essentially a console where you can control your entire app, wherever it is (Android, iOS, Web, wherever). The core of firebase is a JSON database, where things are stored and can be accessed if you have the config files.

While Firebase has lots of cool things like Authentication and Crash testing, we're going to focus on the central database. 
#### Step 1: Sign in with your Google Account

Open your browser and navigate to https://firebase.google.com/. Click on the link that says GO TO CONSOLE.
Follow the instructions and sign in with your Google / Gmail Account
#### Step 2: Creating a new project

Once you've done this, you'll be redirected to a page where you can create your own Project. Click on the big square that says Add Project. The page should look like how it does below (Don't worry about the project ID for now)

![task0step2](screenshots/task0step2.png?raw=true)

#### Step 3: Adding entries to the Database

Once you've created the project, you'll see a page which looks like this:

![task0step3_1](screenshots/task0step3_1.png?raw=true)

Navigate to Database, and click on the side menu and select upload JSON.

![task0step3_2](screenshots/task0step3_2.png?raw=true)

I've prepared a starting database for you guys to work with which you can upload. Upload the file called `entries.json` to Firebase.
Once you've uploaded, you'll be greeted with this sight
![task0step3_3](screenshots/task0step3_3.png?raw=true)

#### Step 4: Changing the database rules

The last thing we need to do to configure the database is to change the read/write rules. First, click on the Rules tab in the Database part of the console. You'll see this screen.
![task0step3_4](screenshots/task0step3_4.png?raw=true)

Edit the rules to make them this:
```
 {
  "rules": {
    ".read": true,
    ".write": true
  }
 }
```
Now read and write database access is possible without authentication.

Awesome, lets get to coding. Also, keep this tab open. We'll need it later on.

## Task 1 - Getting to know Vue and Integrating with Firebase

Before we begin, lets look at the file structure that the webpack template creates:
```
dailyjournal:
    /build
    /config
    /node_modules
    /src
        /assets
        /components
        App.vue
        main.js
    static
    index.html
```
You may see some other files in there, like package.json or .postcssrc.json, but you can ignore those for now. The folder we should be looking at is ```/src```. 

Now, it may be intimidating to see all these files, but lets take these one at a time. inside ```/src``` we see the following:
```
    /src
        /assets
        /components
        App.vue
        main.js
```
The /assets folder wouldn't be of much use now, and you can choose to delete it, or use it to store things like images or logos. That leaves us with `/components`, `App.vue` and ```main.js```. Let's take a look at App.vue first. The webpack gives us this:
```
<template>
      <div id="app">
        <img src="./assets/logo.png">
        <hello></hello>
      </div>
</template>

<script>
      import Hello from './components/Hello'

      export default {
        name: 'app',
        components: {
          Hello
        }
      }
</script>

<style>
      #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
      }
</style>
```
We can see three main sections within this file, `template`, `script` and `style`. It's quite intuitive to guess that that's where the HTML, CSS and Javascript portions of our code go. The entirety of App.vue can essentially be broken down to form this:
```
<template>
  ...
</template>

<script>
  ...
</script>

<style>
  ...
</style>
```

## Task 1.1 - Importing Bootstrap into the Project

While Vue can help us with the functionality it needs, it still needs some front-end framework to go along with it, and for that, we can use Bootstrap, which was covered in [TGIF Hacks #68](https://github.com/SuyashLakhotia/NTUOSS-BootstrapWorkshop). Navigate to `index.html`, and in the `head` portion of the html file, add these lines of code:
```
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet">
```
N.B, if you want to use things like Font Awesome or Google Fonts, you ought to link them in the `index.html` file, and *not* within the App.vue file.

Now, navigate *back* to `App.vue` and replace *everything* in the file with the following:
```
<template>
  <div id="app">
    <div class="jumbotron">
      <h1>My Daily Journal</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>

.jumbotron{
  text-align: center;
  background-color: white;

}
.jumbotron h1{
  font-family: 'Lato';
  font-weight: 300;
}


</style>
```
Go back to your browser, your screen should now look like this:

![task1.1](screenshots/task1.1.png?raw=true)

*N.B, if you're really lost, you can try downloading the folder marked `lost_send_nodes` and it'll have everything set up until task 1.1.*

In order to use it, you'll need to run the following commands once you've navigated to the directory
```
npm install
npm run dev
```
## Task 1.2 - Integrating with Firebase

Now that we have this set up, lets add firebase to our app (Better keep that tab open guys).
Open the file `main.js`, and replace *everything* with the following lines of code:
```
import Vue from 'vue'
import VueFire from 'vuefire'


import App from './App'

Vue.use(VueFire)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
```
Let's take this step by step. The first line imports the main Vue module. The second is new, it imports VueFire, which was the module we installed earlier. The third imports a component from the file `App.vue`. The fourth makes the library `VueFire` available for use in our project, and the other lines just create a new Vue component.

Next, lets move back to `App.vue`, and add the following lines of code inside the `script` section of the file.
```
import Firebase from 'firebase'

let config = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    storageBucket: "...",
    messagingSenderId: "..."
  };
  
let app = Firebase.initializeApp(config)
let db = app.database()

let entryRef = db.ref('entries')
```
Ah, now this is interesting. Before we move any further, lets move back to the tab with our firebase console in the browser. Navigate back to the homepage by clicking on Overview, and click the last, red(or purple? idk?) circle, that lets us add Firebase to our Web App

![task1.2_1](screenshots/task1.2_1.png?raw=true)

Once you click on the button, you'll see the following screen. 

![task1.2_2](screenshots/task1.2_2.png?raw=true)

Do some of these variables look familiar? Copy them into the corresponding variables in the config portion in `App.vue`. Take 5.

