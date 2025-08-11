// Cards container element
const LockBoard = document.querySelector(".cards-container");

// List of cards with name and image
const cards = [
    {
        name: "apple",
        img: "images/apple.jpg"
    },
    {
        name: "arrow",
        img:"images/arrow.jpg"
    },
    {
        name: "bear",
        img:"images/bear.jpg"
    },
    {
        name:"bird",
        img: "images/bird.jpg"
    },
    {
        name : "cake",
        img: "images/cake.jpg"
    },
    {
        name: "cat",
        img:"images/cat.jpg"
    },
    {
        name: "chicken",
        img:"images/chicken.jpg"
    },
    {
        name :"circle",
        img:"images/circle.jpg"
    },
    {
        name: "diamond",
        img : "images/diamond.jpg"
    },
    {
        name: "duck",
        img: "images/duck.jpg"
    },
    {
        name:"fish",
        img:"images/fish.jpg"
    },
    {
        name:"flower",
        img:"images/flower.jpg"
    },
    {
        name : "fox",
        img:"images/fox.jpg"
    },
    {
        name:"heart",
        img:"images/heart.jpg"
    },
    {
        name:"hexagon",
        img:"images/hexagon.jpg"
    },
    {
        name:"iceCream",
        img:"images/ice-cream.jpg"
    },
    {
        name:"moon",
        img:"images/moon.jpg"
    },
    {
        name: "panda",
        img:"images/panda.jpg"
    },
    {
        name:"pawPrint",
        img:"images/paw-print.jpg"
    },
    {
        name:"rabbit",
        img:"images/rabbit.jpg"
    },
    {
        name:"semiCircle",
        img:"images/semi-circle.jpg"
    },
    {
        name:"skull",
        img:"images/skull.jpg"
    },
    {
        name:"smile",
        img:"images/smile.jpg"
    },
    {
        name:"square",
        img:"images/square.jpg"
    },
    {
        name:"star",
        img:"images/star.jpg"
    },
    {
        name:"stone",
        img:"images/stone.jpg"
    },
    {
        name:"strawberry",
        img:"images/strawberry.jpg"
    },
    {
        name:"tortoise",
        img:"images/tortoise.jpg"
    },
    {
        name:"tree",
        img:"images/tree.jpg"
    },
    {
        name:"traingle",
        img:"images/triangle.jpg"
    },
    {
        name:"unicorn",
        img:"images/unicorn.jpg"
    },
    {
        name:"tree2",
        img:"images/tree2.jpg"
    },
];

// Button and display elements
const shuffle = document.getElementById("shuffle");
const Moves = document.getElementById("moves");
const TotalCounts = document.getElementById("total-moves");
const timer = document.getElementById("counter");

//Game Levels
const GameLevels = {
    easy: 4,
    medium: 6,
    hard: 8
};

//Maximum number of moves
const totalMoves = {
    easy : 18,
    medium : 44,
    hard : 65
};

let DuplicateCards = []; //cards in game
let firstCard = null; //first card
let secondCard = null; //second picked card
let currentLevel = null; //Level chosen
let count = 0;  //Moves done by player

//timer variables
let seconds = 0;
let minutes = 0;

//function that updates time
function Timer() {
    timer.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

//increase timer every sec
const setSeconds = setInterval(() => {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++; 
  }
  Timer();
}, 1000);

//display cards by the level chosen
function PickCardLevels(level) {
    currentLevel = level;
    const cardGrid = GameLevels[level];
    const totalCard = cardGrid * cardGrid;
    const totalPairs = totalCard / 2;
    const SelectedPairs = cards.slice(0, totalPairs);

    DuplicateCards = SelectedPairs.concat(SelectedPairs);
    LockBoard.classList.add(level);

    shuffleCards(DuplicateCards);
    TotalCounts.innerHTML = `TotalMoves: ${totalMoves[currentLevel]}`;
}

//show cards on board
function playcards() {
    LockBoard.innerHTML = "";
    DuplicateCards.forEach((card) => {
        const CardImage = document.createElement("img");
        CardImage.src = "images/face-card-down.jpg";
        CardImage.classList.add("card-images");
        LockBoard.appendChild(CardImage);

        CardImage.addEventListener('click', () => {
            const cardClick = new Audio("card-click.wav");
            cardClick.play();
            CardImage.style.transform = "rotateY(180deg)";

            setTimeout(() => {
                CardImage.src = card.img;
            }, 300);

            if (firstCard && CardImage === firstCard.Image) return;

            if (!firstCard) {
                firstCard = { Cardname: card.name, Image: CardImage };
            } else {
                secondCard = { Cardname: card.name, Image: CardImage };
                MatchCards(firstCard, secondCard);
            }
        });
    });
}

let matchedPairs = 0;
//comparing 2 cards
function MatchCards(name1, name2) {
    if (name1.Cardname === name2.Cardname) {
        setTimeout(() => {
            const cardMatches = new Audio("card-matched.wav");
            cardMatches.play();
        }, 600);

        matchedPairs++; 

        // Check if all pairs are matched
        if (matchedPairs === DuplicateCards.length / 2) {
            showAlert("You Won!");
            setTimeout(() => {
                restartGame();
            }, 3000);
            return;
        }
    } else {
        setTimeout(() => {
            const cardnotMatches = new Audio("error-04-199275.mp3");
            cardnotMatches.play();
        }, 600);
        setTimeout(() => {
            name1.Image.style.transform = "rotateY(0deg)";
            name2.Image.style.transform = "rotateY(0deg)";
            name1.Image.src = "images/face-card-down.jpg";
            name2.Image.src = "images/face-card-down.jpg";
        }, 1000);
    }

    firstCard = null;
    secondCard = null;
    count++;
    Moves.innerHTML = `Moves: ${count}`;

    //check for out of moves
    if (count === totalMoves[currentLevel] && matchedPairs < DuplicateCards.length / 2) {
        showAlert("You are Out of Moves!");
        setTimeout(() => {
            restartGame();
        }, 3000);
    }
}



//shuffle the cards
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

//shuffle animation
function ShuffleAnimation() {
    const cards = document.querySelectorAll(".card-images");

    cards.forEach(card => {
        card.style.transition = "transform 0.6s";
        card.style.transform = "rotate(360deg)";
    });

    setTimeout(() => {
        cards.forEach(card => {
            card.style.transition = "transform 0s";
            card.style.transform = "rotate(0deg)";
        });
    }, 600);
}

//shuffle button click
shuffle.addEventListener('click', () => {
    shuffleCards(DuplicateCards);
    ShuffleAnimation();
    const shuffleSound = new Audio("shuffle-cards-46455.mp3");
    shuffleSound.play();
    setTimeout(() => {
        playcards();
    }, 700);
});

//custom alert message
function showAlert(message) {
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    alertOverlay.style.display = 'flex';
    setTimeout(() => {
        alertOverlay.style.display = 'none'
    }, 3000);
  }

function restartGame(){
    location.reload();
}