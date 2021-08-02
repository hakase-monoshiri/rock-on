# README

# rock-on

Rock On is a very simple app for tracking indoor climbing "sends".

## Description

In rock climbing, sucessfully completing a climb according to the rules of the sport is called a "send". Rock On was designed so that climbers can track who has completed (sent) a particular climb, and when. 

Th application is simple, but it has a large number of uses. It can be used as a competitive tool, since it can show off who has completed  very hard climbs. It could be used as a training tool by tracking different climbs and ratings (how easy or hard a climb is) and showing a person's progress over time. And, it can be used as a source of ecouragement or advice based on the notes that climbers leave when they ceate a send.

## Version Info

The app was build using Ruby on Rails in API mode, with Javascript, HTML and CSS front-end. The database is sqlite.

Rails Version: 6.1.4

Ruby Version: 2.6.1

Sqllite Version: 1.4

*The JavaScript in this repo uses features from ES6 and may not work in Internet Explorer

# How To Install

To install this app:

1. run `bundle install` from the project directory. 

2. Boot up the rails server by running `rails s`, the default port should be 3000. If you wish to run the server on a different port, or are installing the app somwwhere other than localhost, go to "./index.js" and change the baseUrl to reflect your specific server situation.

3. Open the "./index.html" file to view the application

# How to Use the Application

Using the application should be pretty straightforward. All climbs currently in the database will populate in the selector box on the left side of the screen. When a climb is selected, details of the climb will appear in a box below the climb selector. At the same time, The sends selector will populate with a list of sends belonging to that particular climb.

Clicking on a send will cause the send details to appear in the container below the sends selection box. Within the details is a button that will delete the send. 

Note: there is no delete confiramtion and all deletes are final. At this time there is also no option to edit a send once it has been created.

At the bottom of the page is a button to create a new send. This toggles a form to create a new send. Filling in the form with a climber's name, date of climb completion, and (optional) notes, creates a new send and displays it in the details container. If the climber name or date is missing, or if no climb is selected to attach it to, an error will appear at the top of the page, and the send will not be created. 

Note: in the case that an invalid send is created without a climb attached, the fake send may appear in the send details container. As soon as another element is clicked, it will dissapear from the app.

### MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
