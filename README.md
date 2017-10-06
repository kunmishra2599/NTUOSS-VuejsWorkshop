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

### Task 1.1 - Importing Bootstrap into the Project

While Vue can help us with the functionality it needs, it still needs some front-end framework to go along with it, and for that, we can use Bootstrap 4, which was covered in [TGIF Hacks #68](https://github.com/SuyashLakhotia/NTUOSS-BootstrapWorkshop). Navigate to `index.html`, and in the `head` portion of the html file, add these lines of code:
```
<link href="https://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
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
### Task 1.2 - Integrating with Firebase

Now that we have this set up, lets add firebase to our app (Better keep that tab open guys).
Open the file `main.js`, and replace *everything* with the following lines of code:
```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
Vue.config.productionTip = false

Vue.use(VueFire)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

```

Next, lets move back to `App.vue`, and add the following lines of code inside the `script` section of the file.
```
import Firebase from 'firebase'

let config = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  storageBucket: '...',
  messagingSenderId: '...'
}

let app = Firebase.initializeApp(config)
let db = app.database()

let entryRef = db.ref('entries')
```
Ah, now this is interesting. Before we move any further, lets move back to the tab with our firebase console in the browser. Navigate back to the homepage by clicking on Overview, and click the last, red(or purple? idk?) circle, that lets us add Firebase to our Web App

![task1.2_1](screenshots/task1.2_1.png?raw=true)

Once you click on the button, you'll see the following screen. 

![task1.2_2](screenshots/task1.2_2.png?raw=true)

Do some of these variables look familiar? Copy them into the corresponding variables in the config portion in `App.vue`. Take 5.
Lastly, edit the ```export default { ...} ``` portion of the script, and add this line of code:
```
firebase: {
    entries: entryRef
  },
```
The ```export``` portion should now look like this:

```
export default {
  name: 'app',
  firebase: {
    entries: entryRef
  },
  computed: {
    reversedentries: function () {
      return this.entries.reverse()
    }
  },
  components: {

  }
}
```
Awesome, lets move on to see how we can call the Firebase Realtime Database

## Task 2 - Using Firebase for real

### Task 2.1 - Displaying the Data

We'll be displaying the data in the form of cards, which will be dynamically generated for each entry in the 'journal'. Vue makes it easy for us by allowing us to loop over entries using the `v-for` method. `v-for` is an example of a Vue directive, and another example of that is `v-model`, which we'll be using later. More on this [here](https://vuejs.org/v2/guide/list.html).
We can use Bootstrap 4's cards, which have the following code structure:
```
<div class="card text-center">
  <div class="card-header">
    Entry
  </div>
  <div class="card-body">
    <h4 class="card-title">Title of Card</h4>
    <p class="card-text">Some text here</p>
  </div>
  <div class="card-footer text-muted">
    Date
  </div>
</div>
```

We can add the v-for method in this way:
```
<div class="container">
    <div v-for="entry in reversedentries" class="card text-center" style="margin:30px;">
        <div class="card-header">
          Journal Entry
        </div>
        <div class="card-body">
          <h4 class="card-title">{{entry.title}}</h4>
          <p class="card-text">{{entry.content}}</p>
        </div>
        <div class="card-footer text-muted">
          {{entry.date}}
        </div>
    </div>
  </div>
  ```
Add this code to the template section of the `App.vue` file, and if all goes well, you should see this:
  
![task_2.1_1](screenshots/task_2.1_1.png?raw=true)

Yay! We've just pulled stuff from the Firebase Realtime database. This means your VueJS app is now linked to your firebase account, and we can get cool stuff happening now.

### Task 2.2 - Adding to the Realtime Database

Now that we can display data from the database, we can get to adding stuff to it. After all, what good is a daily journal when you can't add to it, right?
First, let's create some empty variables as a data model in the ```export``` part of the script. Add the following code to ```export```:
```
data () {
    return {
      newEntry: {
          title: '',
          content: '',
          date: ''
      }
    }
  },
```

The export should now look like this:
```
export default {
  name: 'app',
  firebase: {
    entries: entryRef
  },

  data () {
    return {
      newEntry: {
        title: '',
        content: '',
        date: ''
      }
    }
  },
  computed: {
    reversedentries: function () {
      return this.entries.reverse()
    }
  },
  components: {

  }
}
```
Next, let's create a form group in the template portion, to be put before the `v-for` code. Lol, it's be-for the `v-for`. Anyway, we'll be using another vue directive called `v-model`. We use v-model in this way:
```
<div class="card" style="width:100%;">
      <div class="card-heading">
        <h3 class="card-title" style="margin:20px; text-align:center; font-family:'Lato';">New Entry</h3>
      </div>
      <div class="card-body">
        <form id="form"  v-on:submit.prevent="addEntry">
          <div class="row">
            <div class="col">
              <label for="entryTitle">Title:</label>
              <input type="text" id="entryTitle" class="form-control" v-model="newEntry.title">
            </div>
            <div class="col">
              <label for="entryDate">Date:</label>
              <input type="text" id="entryDate" class="form-control" v-model="newEntry.date" >
            </div>
          </div>
          <div class="form-group" style="margin-top:20px;">
            <label for="entryContent">Content:</label>
            <textarea type="text" id="entryContent" class="form-control" v-model="newEntry.content" ></textarea>
          </div>
          <input type="submit" class="btn btn-primary" value="Add Entry">
        </form>
      </div>
    </div>
```
Add the code above inside the `containter` div tag. If done correctly, your screen should look like this:
![task2.2_1](screenshots/task2.2_1.png?raw=true)

Basically, we've used the input as the model for the variables we created earlier in the data model. Now that we've created methods to save the data in the model, we need to push it to the database using a method. Once again, in the `export` section, add the following lines of code:
```
methods: {
    addEntry: function () {
      entryRef.push(this.newEntry)
      this.newEntry.title = ''
      this.newEntry.content = ''
      this.newEntry.date = ''
      location.reload()
    }
  },
```
Now, when we add a new entry, it'll appear on the top of the other entries. Go ahead, try it out.
By now, your code should look like this:
```
<template>
  <div id="app">
    <div class="jumbotron">
      <h1>My Daily Journal</h1>
    </div>
    <div class="container">
      <div class="card" style="width:100%;">
      <div class="card-heading">
        <h3 class="card-title" style="margin:20px; text-align:center; font-family:'Lato';">New Entry</h3>
      </div>
      <div class="card-body">
        <form id="form"  v-on:submit.prevent="addEntry">
          <div class="row">
            <div class="col">
              <label for="entryTitle">Title:</label>
              <input type="text" id="entryTitle" class="form-control" v-model="newEntry.title">
            </div>
            <div class="col">
              <label for="entryDate">Date:</label>
              <input type="text" id="entryDate" class="form-control" v-model="newEntry.date" >
            </div>
          </div>
          <div class="form-group" style="margin-top:20px;">
            <label for="entryContent">Content:</label>
            <textarea type="text" id="entryContent" class="form-control" v-model="newEntry.content" ></textarea>
          </div>
          <input type="submit" class="btn btn-primary" value="Add Entry">
        </form>
      </div>
    </div>
    <div v-for="entry in reversedentries" class="card text-center" style="margin:30px;">
        <div class="card-header">
          Journal Entry
        </div>
        <div class="card-body">
          <h4 class="card-title">{{entry.title}}</h4>
          <p class="card-text">{{entry.content}}</p>
        </div>
        <div class="card-footer text-muted">
          {{entry.date}}
        </div>

    </div>
  </div>
</div>

</template>

<script>
import Firebase from 'firebase'

let config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
}

let app = Firebase.initializeApp(config)
let db = app.database()

let entryRef = db.ref('entries')

export default {
  name: 'app',
  firebase: {
    entries: entryRef
  },

  data () {
    return {
      newEntry: {
        title: '',
        content: '',
        date: ''
      }
    }
  },
  methods: {
    addEntry: function () {
      entryRef.push(this.newEntry)
      this.newEntry.title = ''
      this.newEntry.content = ''
      this.newEntry.date = ''
      location.reload()
    }
  },
  computed: {
    reversedentries: function () {
      return this.entries.reverse()
    }
  },
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
Let's move on to the last part.

### Task 2.3 - Implementing a Delete button

With our journal, we'd also want to be able to delete posts at will. We can follow the same `method` way of defining a function in Vue. Let's start by adding an icon to each card. We'll use Font Awesome for this. Add the following link to the `<head>` portion of the `index.html` file:
```
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
```
Now, move back to `App.vue` and add the following line of code to the card title:
```
<button v-on:click="removeEntry(entry)" ><i class="fa fa-trash-o" aria-hidden="true" ></i></button>
```
Your card should now look like this:
```
<div v-for="entry in reversedentries" class="card text-center" style="margin:30px;">
        <div class="card-header">
          Journal Entry
        </div>
        <div class="card-body">
          <h4 class="card-title">{{entry.title}} <button v-on:click="removeEntry(entry)" ><i class="fa fa-trash-o" aria-hidden="true" ></i></button></h4>
          <p class="card-text">{{entry.content}}</p>
        </div>
        <div class="card-footer text-muted">
          {{entry.date}}
        </div>

    </div>
```
Once this is done, let's define a method called `removeEntry` in methods, in the script section. Use the following code:
```
    removeEntry: function (entry) {
      entryRef.child(entry['.key']).remove()
    }
```
Your methods section should now look like this:
```
  methods: {
    addEntry: function () {
      entryRef.push(this.newEntry)
      this.newEntry.title = ''
      this.newEntry.content = ''
      this.newEntry.date = ''
      location.reload()
    },
    removeEntry: function (entry) {
      entryRef.child(entry['.key']).remove()
    }
  },
```

Yay! We can now add *and* delete things from the Firebase library from our end! Let's move to the last part of our tutorial, hosting the journal on firebase's server

## Task 3 - Hosting on Firebase

Firebase also provides really good hosting services. They let you start off on a free plan which covers alot of stuff, and give you the option to upgrade to better plans when the time comes, so do check those out as well.


We've now created a build version of our app which we can upload to firebase hosting. Lets first install firebase tools on our console. Enter the following command in the terminal

```
npm install -g firebase-tools
```
This might take a while depending on the internet connection, so bear with it for a while.

Once it's done, run the following command:
```
firebase init
```
You'll see some cool text animation and stuff. Select Yes and click enter. Next, elect Database and Hosting using the spacebar and click enter to move on. Using the arrow keys, select the project we created earlier and click enter twice. When it asks you for the public directory, type 'dist' and enter. 

Node allows us to package our builds and run them on a HTTP server such as one on Firebase. Exit the loop using CTRL+C or Command+C and enter the following command in the terminal
```
npm run build
```
When completed, the terminal will show 'Build Complete'. 
Enter one final command and let's take it home
```
firebase deploy
```
And the page is live! Look for the link in the terminal and visit it in your browser!
N.B, if you can't see any posts, make sure your database rules are set to `true` (Covered in Task 0).


