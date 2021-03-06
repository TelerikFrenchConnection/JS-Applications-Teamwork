 Team "French Connection"
*************************************************
E-Library Catalog is a Single-Page Application developed by Team "French Conection" as part of the JavaScript Applications course at Telerik Academy 2015/16.

##Team
| Nickname  | Name |
| ------------- | ------------- |
| Stev3n  |  Стивън Цветков  |
| BaSk3T  | Васил Вълков  |
|  PaperNick | Николай Павлов  |
| divided.zero  | Николай Илиев  |
| dushka.dragoeva  | Душка Драгоева  |

##Application Desription 

The main purpuse of the application is to help the user easy to find books. Paging and searching functionality allow the user to easily navigate around the aplication. He can easy dowload book for Kindle from Amazon and share this with friends via tweeter.

## Aplication Logic

Twitter Bootstrap is used for the responsive design.
e-Libray have 2 type of users - administrator and users.
[Administrator](http://french-connection.apphb.com/#/admin) recive latest messages from contacts form. 

He can [add](http://french-connection.apphb.com/#/admin/addbook),[edit](http://french-connection.apphb.com/#/admin/editbook)  and [remove](http://french-connection.apphb.com/#/admin/removebook) books by ID, title or ISBN.

From [Home page](http://french-connection.apphb.com/#/home), the user can explore library or top books (most viewed books from application.)

When clicked on the [book](http://french-connection.apphb.com/#/library/detailed/G0MMeBZtxI), the user can view all book details from our Parse Backend Services, to dowload the book for Kindle from Amazon and shared via Twitter.

In the [Category](http://french-connection.apphb.com/#/categories) page, all existing categories are listed.
The [Search](http://french-connection.apphb.com/#/library/search) is using Underscore.js and jQuery for filtering the books by title, auther, category, description.

Users can [signup](http://french-connection.apphb.com/#/account/signup) and [login](http://french-connection.apphb.com/#/account/login) if all their data is valid. 

## Used Libreries
[SystemJS](https://github.com/systemjs/systemjs)
[jQuery](https://jquery.com/)
[Handlebars](http://handlebarsjs.com/)
[Twitter Bootstrap](http://getbootstrap.com/)
[Sammy] (http://sammyjs.org/) as route loader 
[Undescore](http://underscorejs.org/)
[Babel](https://babeljs.io/)

-------------------------------------------------------------------------------------

#JavaScript Applications: Teamwork Assignment
*****************************************

This document describes the teamwork assignment for Telerik Academy students in "JavaScript Applications" course

#Project Description

Design and implement an **object-oriented web SPA application** by choice.

It could be a simple game , component library , business application or any other
*   You are absolutely free to choose the topic of your work
*   Sample applications:
    *   Snake
    *   Chess
    *   Backgammon
    *   Minesweeper
    *   Tetris
    *   Xonix
    *   Supermario
    *   Components library(windows, buttons, text boxes, menus, etc.)
    *   Book store
    *   Auction
    *   Movie rental
    *   Bug tracker
    *   Knowledge management system
    *   E-library
    *   Text editor

##General Requirements
Please define and implement the following assets in your project:
*   Use [jQuery](https://jquery.com/)
*   Implement OOP design
    *   Application logic using objects, modules and data hiding
        *   Both Prototypal and classical inheritances are Ok
    *   At least 3 modules
    *   At least 7 types of objects
*   Unit tests
    *   Using [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/) and [SinonJS](http://sinonjs.org/)
*   Implement a UI for your application
    *   Use KendoUI, jQueryUI or implement your own UI logic
*   Use some kind of web data storage, one of the following is Ok
    *   Your backend with Node.js, PHP, ASP.NET, Django, Ruby on Rails, Spring, etc...
    *   Telerik Backend Services
    *   Parse
    *   Microsoft Mobile App Services
*   Use some kind of local storage, one of the following is Ok:
    *   `localStorage`
    *   `sessionStorage`
*   Use [Twitter Bootstrap](http://getbootstrap.com/)
    *   Research and use Bootstrap for your application
    *   Make the application responsive for different screens and resolutions
*   At least one third-party API to share something from your application
    *   Samples:
        *   Share status to Facebook, Google+, Twitter, etc...
        *   Upload images to Facebook, Flickr, Instagram
*   **The application must work in the latest versions of the browsers: Google Chrome, Mozilla Firefox, Internet Explorer 10/11, Opera and Apple Safari**

##Additional Requirements
Follow the best practices for producing high-quality code:
*   **Correct naming**
*   **Data encapsulation**
    *   Use OOP and modules
*   **Strong cohesion** and **loose coupling**
*   Use **GIT** as a source control system
*   Host it on [http://github.com](http://github.com)

##Optional Requirements
If you have a chance, time and a suitable situation, you might add some of the following to your project:
*   Backward compatibility (make the application usable on browsers like IE8, IE7 and IE6)
*   Integration tests
*   Usage of a structural JavaScript framework:
    *   AngularJS, KendoUI, Knockout.js, Backbone.js, etc...

##Non-required Work
*   Completely finished project is not obligatory required. It will not be a big problem if your project is not completely finished or is not working greatly
    *   This team work project is for educational purpose
    *   Its main purpose it to experience using graphics, DOM manipulation and OOP in a real-world-like project and to get some experience in team working and team collaboration with a source control system.
*   Implementation of server-side logic with ASP.NET, PHP, Java or Node.js

##Deliverables

*   Register your application at [Telerik Academy Showcase System](http://best.telerikacademy.com)
    *   Provide a link for the github repository of your application
    *   Host your application on a server, and provide a link
        *   You can host your application on http://appharbor.com, http://heroku.com or just use the http://rawgit.com

##Public Project Defense
Each team will have to deliver a public defense of its work to the other students and trainers. You will have only 10 minutes for the following:
*   Demonstrate the application (very shortly)
*   Show the source code
*   Show the commits logs to confirm that team member have contributed.
*   Optionally you might prepare a presentation (3-4 slides)
Please be **strict in timing!** Be well prepared for presenting maximum of your work for minimum time. Bring your own laptop. Test it preliminary with the multimedia projector. Open the project assets beforehand to save time. You have 10 minutes, no more

##Give Feedback about Your Teammates
You will be invited to provide feedback about all your teammates, their attitude to this project, their technical skills, their team working skills, their contribution to the project, etc. The feedback is important part of the project evaluation so take it seriously and be honest
