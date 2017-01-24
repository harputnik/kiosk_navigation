# README #

1) What are the browser versions that will display correctly this navigation?

All modern and relatively modern browser versions will display this navigation corretly.

Issues may occure with:

- inline-block layout in IE6/7 - if support for these versions would be required, changing inline-block divs into spans would resolve the issue. 

- cosmetics like box shadow, rounded corners in IE6/7/(8) that do not affect readability.


2) What libraries, tools you have used for your work and in case of frameworks please describe

Library used: jQuery v3.1.1

Tools:

- npm for managing packages

- gulp as a task manager: less compiler, scripts minifier

Frameworks: none

---------------------------------------------------------------

# BRANCH INFO #

master is a distribution branch, without tools and packages. To check project development environment, please switch to dev.

---------------------------------------------------------------

# REQUIREMENTS #

whole navigation depends on a json file describing the paths tree, so it requires a server to work. (node, wamp, lamp or any kind)



---------------------------------------------------------------

# DEMO #

http://smialy.bdl.pl/kiosk/nav_with_loaded_data.html