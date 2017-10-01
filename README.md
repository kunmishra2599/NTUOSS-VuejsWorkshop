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

So what this command does is download a template for a single page Vue application for use in our project. We also need to install dependencies for Firebase, our backend database. Run the following commands:

```
npm install firebase vuefire --save
```
N.B, the --save is really, really important.
