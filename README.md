# Indy 500 (Atari) in JS
This is my fourth game for the 20 games challenge. The goal is to implement physics
# TODO
- [X] Speedometer
- [X] Second Player
- [ ] Level Select
# Daily Log
## 12/21/24
- Figured out the rotational physics stuff for this in desmos
  - https://www.desmos.com/calculator/te7fzczlya 
## 12/22/24
- set up the project 
- implemented the rotational physics of the car
- made tileset using a tutorial
- Put it into tiled. 
  - I found out that rotating/flipping is super bad and that you have to manually place everything :( 
- Also implemented key strokes that work at the same time using a tutorial which I had to heavily modify the code of in order to get working because they were using an older JS version.
## 12/23/24
- I  fixed the tileset in tiled from yesterday.
- Made the tileset not have any duplicate tiles and more compact
- Found an article on how to implement it tiled into JS and used their code with slight variable modifications.
- Used CSS to make it more pixeled.
- Implemented the ability to know what tile is being touched by the **CENTER** of the car.
- Implemented slowing down when not on the road tile or on the dash tile.
## 12/24/24 
- Figured out how to make point to line detection from a tutorial 
  - https://www.jeffreythompson.org/collision-detection/line-point.php
  - Desmos demo: https://www.jeffreythompson.org/collision-detection/line-point.php
- Fixed the float drift by rounding
- Implemented checkpoint collision checks.
- Implemented fonts
- WIP Laps
## 12/25/24 
- Fixed Laps counter
## 12/26/24
- Got multiplayer working
  - All it took was putting all the variables in the class and putting `this` infront
- Drew some art for the speedometer
  - I think in order to do the speedometer all I got to do is take the current distance divided by the maxDistance and multiply it by the width of the guage
## 12/27/24 
- Made the speedometer work.
- Made the canvas smaller
## 12/28/24
- Made a timer class and put it inside of the car class
  - used it to count up the times each lap took and then displayed it to the screen
- made game die when either thing made 3 laps.
- display which player won