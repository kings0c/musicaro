# Musicaro
All your music in one place - a browser-based music player and organiser.

## Project Status
**Alpha**  
Accepts FileList via HTML5 File API
Pulls album art and track info from ID3 Tags, or Deezer API if not found.
Basic front-end design in place.  
Sorting of tracks works  
Search working
Web player working

##Live example
https://www.hetherington.tv/projects/musicaro

## Requirements
* A local web server running PHP and MySQL ([EasyPHP](http://www.easyphp.org/) for Windows or [AMPPS](http://www.ampps.com/) for MacOS for example)

## How to use
1. Clone or download repository to a folder on your PC
2. Place musicaro folder in your web server directory
6. Open index.htm in a browser

## Design Specs
* Looks pretty (material design at the moment)
* Responsive design
* Pulls album art and track info from a web API (Deezer)
* Play tracks via browser
* Playlists

## To Do
 * User Playlists
 * Test on mobiles
 * Speed up library update
 * Show tracks currently in playlist
 * Persistent Library Storage
 * Make into chrome extension
 * Weird bug. Album art deezer callback doesn't fire. Sleeping and resuming laptop fixes? wtf?