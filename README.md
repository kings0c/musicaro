# Musicaro
All your music in one place - a browser-based music player and organiser.

## Project Status
**Alpha**  
Searches library folder and adds tracks to library correctly with album art.  
Basic front-end design in place.  
Sorting of tracks works  
Search working
Web player working

## Requirements
* A local web server running PHP and MySQL ([EasyPHP](http://www.easyphp.org/) for Windows or [AMPPS](http://www.ampps.com/) for MacOS for example)

## How to use
1. Clone or download repository to a folder on your PC
2. Create a new MYSQL database named "musicaro" without quotes
3. Add a new user named musicaro to localhost
4. Import musicaro.sql into your new database (phpmyadmin is probably the easiest way)
5. Edit the password stored in php/db_connect.php
6. Open index.php in a browser

## Design Specs
* Track music from multiple sources (Local, Spotify, Google Music...)
* Looks pretty (material design at the moment)
* Responsive design
* Pulls album art and track info from a web API (Discogs possibly)
* Play tracks via browser
* Batch rename local library
* Playlists

## To Do
 * 3rd Party Music provider integration (Spotify etc) 
 * Test on mobiles
 * Folder structure organising
 * Playlists
 * Speed up library update
 * Incorrect track name bug