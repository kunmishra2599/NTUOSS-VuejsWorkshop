# TGIF Hacks #70: A Vue.JS and Firebase based Daily Journal

Today we'll be making a daily events journal in Vue.JS, a really cool emerging Javascript framework based on a Virtual DOM that's really easy to work with for beginners. We'll be using Google's Firebase (yay!) as a simple backend, to help familiarise you guys with Firebase.

Prerequisites:
  - Basic knowledge of HTML, CSS and Javascript / Node.js
  - Code Editor
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

So what this command does is download a template for a single page Vue application for use in our project, in a folder called ``` dailyjournal```. We also need to install dependencies for Firebase, our backend database. Run the following commands:

```
npm install firebase vuefire --save
cd dailyjournal
```
N.B, the ``` --save ``` is really, really important. Now run the final command to start our development server:

```
npm run dev
```
Your browser should now open up a new tab and show you the page below, which you can also get to at http://localhost:8080
![task0](screenshots/task0.png?raw=true)

Awesome, lets get to coding.

## Task 1 - Understanding the structure of Vue.JS

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
