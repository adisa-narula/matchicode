
//add event listen for the first click when the document has loaded

document.addEventListener('DOMContentLoaded', firstClick);

function firstClick() {
  document.getElementById("startButton").addEventListener('click', handleClick);
}

function handleClick() {
  var input = document.getElementById("numSymbols").value;
  var numsym = +input; //convert to number

  if (!(numsym >= 1 && numsym<= 8)) {
    numsym = 8; //set maximum number of symbol and default
  }
  console.log("num of symbols:", numsym);
  //hide the form
  hideForm();
  generateGameBoard(numsym);
}

function hideForm() {
  var form = document.getElementById("startForm");
  form.style.display = "none";
}

function generateGameBoard (numsym) {

  var currentCards = [];
  var numFlipped = 0;
  var numGuess = 0;
  var numMatches = 0;
  var numOfCards = numsym * 2;
  console.log(numOfCards);

  var playGame = function(event) {

    //display the card
    displayCard(this);
    document.getElementById(this.id).removeEventListener('click', playGame);

    //add numflipped and the card that was flipped
    currentCards.push(this.id);
    numFlipped++;
    console.log(numFlipped);
    console.log(currentCards[0], currentCards[1]);

    if (numFlipped == 2) {
      //check matches
      //match
      numGuess++;
      var card1 = document.getElementById(currentCards[0]);
      var card2 = document.getElementById(currentCards[1]);

      //change the number of guesses
      document.getElementById("current-score").textContent = "#?'s: " + numGuess;

      console.log(card1.textContent);
      console.log(card2.textContent);
      console.log(card1.id);

      if (card1.textContent != card2.textContent) {
        //flip them back
        // allow user to look at cards - set timer
        setTimeout(function() {
          turnCardOver(card1.id);
          turnCardOver(card2.id);},
          650);
        }
      //there's a match!
      else {
        numMatches++;
        console.log("num matches:",numMatches);
      }
        //reset numflipped to 0 and cards from currentCards
      numFlipped = 0;
      currentCards.pop();
      currentCards.pop();

      if (numMatches == numsym) {
        //get the board game
        setTimeout(win,750);
      }
    }
  }

  var turnCardOver = function (id) {

    console.log(id);
    document.getElementById(id).style.backgroundColor = "#8080ff";
    //add event listener back
    document.getElementById(id).addEventListener('click', playGame);
    //hide text content
    document.getElementById(id).textContent = "";
  }
  //cards available during round - 0 to numSym - 1

  var symbols = [
      { symbol: "@" , used: 0 },
      { symbol: "!" , used: 0 },
      { symbol: "*" , used: 0 },
      { symbol: "&" , used: 0 },
      { symbol: "#" , used: 0 },
      { symbol: "?" , used: 0 },
      { symbol: "$" , used: 0 },
      { symbol: "%" , used: 0 } ];

  var board = document.createElement("div"); //create a div element
  board.id = "board-game";
  var scoreBoard = document.createElement("div"); //create another div element
  var showScore = document.createElement("p");
  showScore.id = "current-score";
  showScore.textContent = "#?'s: 0";
  scoreBoard.id = "score-board";
  scoreBoard.appendChild(showScore);

  for (var i = 0; i < numOfCards; i++) {
    var card = document.createElement("div"); //create another div element
    //set all the attributes of the card
    var sym = randomSymbol(numsym, symbols);
    console.log(sym);
    card.className = "card";
    card.setAttribute("data-symbol", sym);
    card.id = i;
    card.addEventListener("click", playGame);
    board.appendChild(card);
  }
  //append board game to the body of the html page
  document.body.appendChild(scoreBoard);
  document.body.appendChild(board);
}

function displayCard(event) {
  var para = document.createElement("p");
  var sym = document.createTextNode(event.getAttribute("data-symbol"));
  console.log('symbol: ', sym);
  para.appendChild(sym);
  event.appendChild(para);
  document.getElementById(event.id).style.backgroundColor = "#ffa64d";
}

function win() {
  var removeBoard = document.getElementById("board-game");
  removeBoard.parentNode.removeChild(removeBoard);
  var winMessage = document.createElement("p");
  winMessage.textContent = "You Won! Thanks for playing :)";
  document.body.appendChild(winMessage);
}

function randomSymbol(numsym, symbols) {

  //return the symbol that was picked
  var found = 0;
  while (!found) {
    var random = Math.floor(Math.random()*(numsym));
    if(symbols[random].used == 2) {
      found = 0;
    }
    else {
      symbols[random].used++;
      found = 1;
      return symbols[random].symbol;
    }
  }
}
