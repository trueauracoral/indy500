function toRadians(angle) {
    return angle * (Math.PI/180);
}
function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}  

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 390;

const halfWidth = canvas.width / 2;
const halfHeight = canvas.height / 2;

ctx.imageSmoothingEnabled= false

const carImage = loadImage("./img/car.png");
const car2Image = loadImage("./img/car2.png");
const fuelguage = loadImage('./img/fuel guage.png');
const tileAtlas = loadImage('./img/indy500 tileset.png')
const p1fuel = loadImage("./img/p1-fuel.png")
const p2fuel = loadImage("./img/p2-fuel.png")
// https://medium.com/geekculture/make-your-own-tile-map-with-vanilla-javascript-a627de67b7d9
// Width 32
// Height 21
let tileSize = 16
let atlasCol = 4;
let atlasRow = 6;
let mapCols = 32;
let mapRows = 21;
let mapHeight = mapRows * tileSize;
let mapWidth = mapCols * tileSize

let sourceX = 0;
let sourceY = 0;

let tileset = [7, 7, 14, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 16, 7, 7, 7, 7, 14, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 16, 7, 7, 7, 14, 12, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 16, 7, 7, 14, 12, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 16, 7, 14, 12, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 16, 14, 12, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 16, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 10, 12, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 2, 4, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 4, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 22, 4, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 24, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 7, 22, 4, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 24, 7, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 7, 7, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 7, 7, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 7, 7, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 7, 7, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 7, 14, 12, 19, 19, 19, 19, 19, 19, 1, 19, 19, 19, 19, 19, 10, 16, 7, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 6, 14, 12, 19, 19, 19, 19, 19, 19, 19, 1, 19, 19, 19, 19, 19, 19, 10, 16, 8, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 10, 12, 19, 19, 19, 19, 19, 19, 19, 19, 1, 19, 19, 19, 19, 19, 19, 19, 10, 12, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 6, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 4, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 6, 22, 4, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 24, 22, 4, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 2, 24, 7, 22, 3, 3, 3, 4, 19, 19, 19, 19, 19, 19, 19, 2, 24, 7, 7, 22, 4, 19, 19, 19, 19, 19, 19, 19, 2, 23, 23, 23, 24, 7, 7, 7, 7, 7, 7, 22, 3, 3, 3, 3, 3, 3, 3, 24, 7, 7, 7, 7, 22, 3, 3, 3, 3, 3, 3, 3, 24, 7, 7, 7, 7, 7];

let die = false;
let maxlaps = 3;
let car1finish = false;
let car2finish = false;

let checkpoints = [
    [{x:500, y:300}, {x:290, y:190}, false],
    [{x:255, y:0}, {x:255, y:150}, false],
    [{x:20, y:300}, {x:220, y:190}, false],
    [{x:255, y:190}, {x:255, y:300}, false],
]

function drawMap() { 
    let mapIndex = 0;
    const offsetX = 0;
    const offsetY = 0;
    for (let col = 0; col < mapHeight; col += tileSize) {
      for (let row = 0; row < mapWidth; row += tileSize) {
         let tileVal = tileset[mapIndex];
         if(tileVal !=0) {
            tileVal -= 1;
            sourceY = Math.floor(tileVal/atlasCol) * tileSize;
            sourceX = (tileVal % atlasCol) * tileSize;
            ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize,
            tileSize, row + offsetX, col + offsetY,
            tileSize, tileSize);
         }
         mapIndex ++;
      }
   }
}

class Timer {
    constructor() {
      this.startTime = null;
      this.elapsedTime = 0; // Time in milliseconds
      this.timerInterval = null;
    }
  
    // Starts the timer
    start() {
      if (!this.timerInterval) {
        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = setInterval(() => {
          this.elapsedTime = Date.now() - this.startTime;
        }, 100);
      }
    }
  
    // Stops the timer
    stop() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }
  
    // Resets the timer
    reset() {
      this.stop();
      this.elapsedTime = 0;
      this.startTime = null;
    }
  
    // Returns the time in seconds
    getSeconds() {
      return Math.floor(this.elapsedTime / 1000);
    }
  
    // Returns the time in minutes:seconds format
    getFormattedTime() {
      const totalSeconds = this.getSeconds();
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }

class car { 
    constructor(pos, velocity, radius, carImage) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = radius;
        this.carImage = carImage
        this.angle = 0;
        this.distance = 0;
        this.angleSpeed = 2;
        this.maxAngleSpeed = 2.4;
        this.friction = 0.1;
        this.acceleration = 0.1;
        this.maxDistance = 4
        this.completedCheckpoints = 0;
        this.checkpoints = checkpoints.slice();
        this.completedLaps = 0;
        this.percentDistance = 0;
        this.timer = new Timer();
        this.timerLaps = []
    }

    update() {
        this.pos.y += Math.round(this.distance) * Math.sin(toRadians(this.angle));
        this.pos.x += Math.round(this.distance) * Math.cos(toRadians(this.angle));
        //console.log(this.angle);
        //console.log(`Distance: ${this.distance}\nAngle: ${toRadians(this.angle)}`);

        if (this.distance > 0) {
            this.distance -= this.friction;
        } else if (this.distance < 0) {
            this.distance += this.friction;
        }
        let currentTile = getTileAtPosition(this.pos.x, this.pos.y);
        //console.log(currentTile);
        if (currentTile == 1 || currentTile == 19) {
            this.maxDistance = 4;
        } else {
            this.maxDistance = 0.5;
        }
        this.percentDistance = Math.floor((this.distance / this.maxDistance)*1000)/1000
        if (this.percentDistance < 0) {
            this.percentDistance *= -1
        }
        //console.log(this.percentDistance);
        //console.log(this.maxDistance);
    
        for (let i = 0; i < this.checkpoints.length; i++) {
            let checkpoint = this.checkpoints[i]
            let checkpointLine = distanceCalculator(checkpoint[1].x, checkpoint[0].x, checkpoint[1].y, checkpoint[0].y)
            let checkpointLeftDistance = distanceCalculator(this.pos.x, checkpoint[0].x, this.pos.y, checkpoint[0].y)
            let checkpointRightDistance = distanceCalculator(this.pos.x, checkpoint[1].x, this.pos.y, checkpoint[1].y)
            let carToLine = checkpointRightDistance + checkpointLeftDistance;
            if (Math.floor(carToLine) == Math.floor(checkpointLine)) {
                checkpoint[2] = true;
                //console.log("Collided")
                //console.log(this.checkpoints)
            }
        }
    
        this.checkpoints = sequentialTrues(this.checkpoints)
        this.completedCheckpoints = 0;
        for (let i = 0; i < this.checkpoints.length; i++) {
            if (this.checkpoints[i].length > 3 && allFalse(this.checkpoints.slice(0, this.checkpoints.length - 1))) {
                this.completedCheckpoints = this.completedCheckpoints
            } else if (this.checkpoints[i][2] == true) {
                this.completedCheckpoints++;
            }
        }
    
        if (this.completedCheckpoints== this.checkpoints.length) {
            //console.log("Completed a lap!")
            this.completedLaps++;
            for (let i = 0; i < checkpoints.length; i++) {
                if (this.checkpoints[i][2] == true) {
                    this.checkpoints[i][2] = false
                }
            }
            this.timer.stop();
            console.log(this.timer.getFormattedTime())
            this.timerLaps.push({timeSeconds: this.timer.getSeconds(), timeFormatted: this.timer.getFormattedTime()})
            console.log(this.timerLaps);
            this.timer.reset();
            this.timer.start();
        }
    };

    draw() {
        ctx.save();
    
        ctx.translate(this.pos.x, this.pos.y);
    
        ctx.rotate(toRadians(this.angle));
    
        ctx.drawImage(
            this.carImage,
            -this.carImage.width / 2,
            -this.carImage.height / 2
        );
    
        ctx.restore();
    }

    turnRight() {
        this.angle += this.angleSpeed;
    }

    turnLeft() {
        this.angle -= this.angleSpeed;
    }

    goUp() {
        if (this.acceleration < this.velocity && this.distance <= this.maxDistance) {
            this.distance += this.acceleration;
            this.acceleration += this.acceleration;
        } else{
            this.acceleration = 0.1
        }
    }

    goDown() {
        if (this.acceleration < this.velocity && this.distance > -this.maxDistance) {
            this.distance -= this.acceleration;
            this.acceleration += this.acceleration;
        } else{
            this.acceleration = 0.05
        }
    }
}

function getTileAtPosition(x, y){
    const col = Math.floor(x/tileSize);
    const row = Math.floor(y/tileSize);
    if (col < 0 || col > mapCols || row < 0 || row > mapRows) {
        return -1;
    }
    return tileset[row * mapCols + col];
}

const Car = new car(vec2(halfWidth +15, halfHeight+30), 0.6, 15, carImage)
Car.timer.start()
const Car2 = new car(vec2(halfWidth+15, halfHeight+60), 0.6, 15, car2Image)
Car2.timer.start()

function startGame() {
    gameLoop();
}

// https://jakesgordon.com/writing/javascript-game-foundations-sound/
function createAudio(src) {
    var audio = document.createElement('audio');
    audio.volume = 0.5;
    //audio.loop   = options.loop;
    audio.src = src;
    return audio;
}

//var bounce = createAudio('./sound/bounce.wav');

function vec2(x, y) {
    return {x: x, y: y};
}
const loadFont = () => {
    const font = new FontFace('PixelFont', 'url(./font/upheavtt.ttf)');
    font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        ctx.font = "20px 'PixelFont'";
    });
};

loadFont();
function drawPixelText(text, x, y, outline, color="black") {
    ctx.imageSmoothingEnabled = false; 
    ctx.textBaseline = 'top';
    ctx.fillStyle = color; 
    
    charLength = text.toString().length;
    if (charLength == 2) {
        x -= 4
    }

    if (outline) {
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeText(text, x, y);
    }

    ctx.fillText(text, x, y);
}

function distanceCalculator(x1, x2, y1, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
function allFalse(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
        return false; // Found a truthy value, so return false
        }
    }
    return true; // All values were falsy
}
function sequentialTrues(checkpoints) {
    let foundFalse = false;

    return checkpoints.map(checkpoint => {
        if (foundFalse) {
            checkpoint[2] = false;
        } else if (!checkpoint[2]) {
            foundFalse = true; 
        }
        return checkpoint;
    });
}
function gameUpdate() {
    if (!die) {
        executeMoves();
        Car.update();
        Car2.update();
        if (Car2.completedLaps == maxlaps) {
            die = true;
            car2finish = true;
        } else if (Car.completedLaps == maxlaps) {
            die = true;
            car1finish = true;
        }
    }
}

function gameDraw() {
    drawMap();

//    for (let i = 0; i < checkpoints.length; i++) {
//        ctx.lineWidth = 5;
//        ctx.beginPath();
//        ctx.moveTo(checkpoints[i][0].x,checkpoints[i][0].y);
//
//        ctx.lineTo(checkpoints[i][1].x,checkpoints[i][1].y);
//
//        ctx.stroke();
//    }
    Car.draw();
    Car2.draw();
    drawPixelText(`P1  Laps: ${Car.completedLaps}`, 400, 330, false, "#000000");
    drawPixelText(`P2 Laps: ${Car2.completedLaps}`, 400, 345, false, "#000000");
    ctx.drawImage(p1fuel, 11, 341);
    ctx.drawImage(fuelguage, 0, 0, Car.percentDistance * fuelguage.width, fuelguage.height, 15, 345, Car.percentDistance * fuelguage.width, fuelguage.height);
    ctx.drawImage(p2fuel,11,366);
    ctx.drawImage(fuelguage, 0, 0, Car2.percentDistance * fuelguage.width, fuelguage.height, 15, 370, Car2.percentDistance * fuelguage.width, fuelguage.height);
    //ctx.drawImage(fuelguage, 15, 370);

    if (die) {
        function formatLaps(car,startX) {
            let totalSeconds = 0
            for (var i = 0; i < car.timerLaps.length; i++) {
                drawPixelText(`Lap  ${i+1}: ${car.timerLaps[i].timeFormatted}`, startX,30+15*i, false, "#000000")
                totalSeconds += car.timerLaps[i].timeSeconds
            }
            drawPixelText(`Total: ${totalSeconds} Sec`, startX,30+15+15*car.timerLaps.length, false, "#000000")
        }
        drawPixelText("Car 1:", 30,10, false, "#000000")
        formatLaps(Car, 30);
        drawPixelText("Car 2:", 350,10, false, "#000000")
        formatLaps(Car2, 350);
        if (car2finish == true) {
            drawPixelText("Player 2 Won!", halfWidth - 50, halfHeight - 10, false, "#000000");
        } else if (car1finish == true) {
            drawPixelText("Player 1 Won!", halfWidth - 50, halfHeight - 10, false, "#000000");
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);
    
    gameUpdate();
    gameDraw()
}
//https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7
const controller = {
    "ArrowUp": { pressed: false, func: () => Car.goUp() },
    "ArrowDown": { pressed: false, func: () => Car.goDown() },
    "ArrowRight": { pressed: false, func: () => Car.turnRight() },
    "ArrowLeft": { pressed: false, func: () => Car.turnLeft() },
    "w": { pressed: false, func: () => Car2.goUp() }, // Add controls for Car2
    "s": { pressed: false, func: () => Car2.goDown() }, // Add controls for Car2
    "d": { pressed: false, func: () => Car2.turnRight() }, // Add controls for Car2
    "a": { pressed: false, func: () => Car2.turnLeft() }, // Add controls for Car2
  };

document.addEventListener("keydown", (e) => {
    if (controller[e.key]) {
        controller[e.key].pressed = true
    }
}) 
document.addEventListener("keyup", (e) => {
    if (controller[e.key]) {
        controller[e.key].pressed = false
    }
})
const executeMoves = () => {
    Object.keys(controller).forEach(key=> {
        if (controller[key].pressed) {
            controller[key].func() 
        }
    })
}

gameLoop();
