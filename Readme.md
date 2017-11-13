# GA WDI Project 3 - Bemo
[Premise](#premise "premise") - [Brief](#brief "brief") - [Approach](#approach "approach") - [Technologies](#technologies-used "technologies") - [Features](#features "features") - [Challenges](#challenges "challenges") - [Successes](#successes "successes") - [Improvements](#improvements "improvements") - [Bemo](https://bemo-app.herokuapp.com "Bemo")

<img src="https://i.imgur.com/YSZG3q9.png" alt="bemo home page">

## Premise
Bemo is a social travel app for users to post recomendations of cool places they have visited or write blog posts about their travels.

## Brief
A team project to build a MERN stack app.  As it was a team project significant emphasis was placed upon the importance of planning, communication and version control.  Technical requirements included the use of a CSS framework, a minimum of two database resources (with one fully RESTful resource and the inclusion of referenced data), inclusion of an external API and user authentication.

## Approach
To ensure our team could cooperate effectively and was working towards common objectives, we began the project with a collaborative planning session drawing out wireframes, creating a Trello board and discussing our ideas.  Once we were fully agreed on the scope and direction of our app as well as our 'stretch goals' we pair coded out our first back end resource then split off to work independently for the additional resources.

Once we moved to the front end we continued to work independently, except for when either of us faced a particularly challenging problem which we would paircode solutions to.  We utilised the GitHub slack plugin to allow easy tracking of each others commits and maintain sight of each others work in addition to Agile team meetings.  Towards the end of the project we resumed pair coding to refactor our code base and ensure we both understood each others contributions to our work.

## Technologies used
* HTML5
* CSS, SCSS, Bulma
* JavaScript, **Angular** (ui-router, ngResource)
* Other: MongoDB, Gulp, Yarn, Insomnia, GoogleAPIs

## Features
Bemo includes several features created from GoogleMaps and Places APIs, contextual map markers, polylines and responsive bounds.  A geocoding service.  User profiles featuring user contributions to the site through virtuals.  Two fully RESTful resources, with intuitive create form elements including image uploading and multiple data-bound options for inputing location data.

## Challenges
There were several challenging aspects to this project, one of these was managing version control in a team.  To avoid issues we opted to take advantage of the GitHub plugin for Slack which enabled us to keep track of each others commits with ease, in addition to pair coding at times when we were likely to be working on the same section of the codebase.

More technical challenges included managing data flow with the integration of the GoogleMaps API, and creating a replacement for the Select2 plugin after discovering this was not compatible with our stack.  In response to the Select2 issue we coded out what we called 'selectVlad', this revolved around a text input filtering places from our database and printing the available options with checkboxes to a `<div>` below with `overflow: hidden;` applied.  This solution both met the technical need for our app as well maintaining good UX.

<img src="https://i.imgur.com/h43yFTW.png" alt="selectVlad">

```
<label class="label">Places</label>
    <p><input class="input" name="q" type="text" ng-model="storiesEdit.q"></p>
    <div ng-repeat="place in storiesEdit.story.place">{{ place }}</div>
    <div class="select-place dropdown-content" ng-if="storiesEdit.form.q.$dirty">
      <div class="dropdown-item" ng-show="storiesEdit.form.q.$dirty" ng-hide="!storiesEdit.form.q.$dirty" ng-repeat="place in storiesEdit.places | filter: { name: storiesEdit.q }">
        <p><input ng-click="storiesEdit.togglePlace(place)" type="checkbox" ng-true-value="'{{ place.id }}'" ng-checked="{{ storiesEdit.story.places.includes(place.id) }}">{{place.name}}</p>
      </div>
    </div>
```

## Successes
Particular successes of this project include the versatile [GoogleMap directive](https://github.com/jdLYNC/wdi-project-3/blob/master/src/js/directives/googleMaps.js "GoogleMap directive file") that was widely used throughout the app to display or collect different bits of data.  The UX of the create forms including 'selectVlad', the data bound GoogleMap and GooglePlaces on the new place form, and the drawing polylines on the new story form.  The user profile pages are also a particular success with the use of virtuals to display user contributions to the site.

<img src="https://i.imgur.com/VxBMNgd.png" alt="polyline map and data bound map">

## Improvements
Given more time there are some additions/improvements we would like to make for Bemo.
* Revised styling
* Enhanced form validation
* Replacement of the ISO codes in the country filter field with actual country names

## Link ##
[Visit Bemo on Heroku](https://bemo-app.herokuapp.com "Bemo")
