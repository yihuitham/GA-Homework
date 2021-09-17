let hull;
let firePower;
let accuracy;
let noOfAlienShips = 6;
let alienShips = [];
let activeAlienShip;

//return random integer
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//return random number with one decimal place
function random2Dec(min, max) {
  return Math.floor(Math.random() * ((max - min) * 10 + 1) + min * 10) / 10;
}

class ship {
  constructor(hull, firePower, accuracy) {
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    this.alive = true;
  }

  attackedBy(opponent) {
    this.hull = this.hull - opponent.firePower;
    if (this.hull <= 0) {
      this.alive = false;
    }
  }
}

const spaceShip = new ship(20, 5, 0.7);

//make 6 alien ships
for (let i = 0; i < noOfAlienShips; i++) {
  alienShips.push(
    new ship(randomNumber(3, 6, 0), randomNumber(2, 4, 0), random2Dec(0.6, 0.8))
  );
}

function attackAlien() {
  if (Math.random() * activeAlienShip.accuracy < activeAlienShip.accuracy) {
    let getIndex = alienShips.indexOf(activeAlienShip);
    activeAlienShip.attackedBy(spaceShip);
    console.log(
      `Alien ship #${getIndex + 1} was attacked, hull: ${activeAlienShip.hull}`
    );
    checkHealth(getIndex);
  } else {
    console.log("USS Schwarzenegger  missed target!");
  }
}

function attackSpaceShip() {
  if (Math.random() * activeAlienShip.accuracy < activeAlienShip.accuracy) {
    spaceShip.attackedBy(activeAlienShip);
    console.log("USS Schwarzenegger was attacked, hull:", spaceShip.hull);
    if (spaceShip.hull <= 0) {
      $("body").append(
        $("<h1>USS Schwarzenegger has been destroyed. Game over.</h1>")
      );
      $(".alien").unbind();
    }
  } else {
    console.log("Alien ship missed target!");
  }
}

function checkHealth(index) {
  if (!activeAlienShip.alive) {
    nextAlienShip(index);
  }
}

//next battle player (alien ship)
function nextAlienShip(index) {
  if (index < noOfAlienShips - 1) {
    activeAlienShip = alienShips[index + 1];
    console.log("Next alien ship #", index + 2, ":", activeAlienShip);
  } else {
    $("body").append($("<h1>USS Schwarzenegger has won!</h1>"));
    $(".alien").unbind();
  }
}

function gamePlay() {
  activeAlienShip = alienShips[0];
  console.log("spaceShip:", spaceShip);
  console.log("alienShip:", alienShips);
  $(".alien").on("click", () => {
    attackAlien();
    attackSpaceShip();
  });
}
$(() => {
  gamePlay();
});
