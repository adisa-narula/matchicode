
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

  var numOfCards = numsym * 2;
  console.log(numOfCards);

  var board = document.createElement("div"); //create a div element
  board.className = "board-game";

  for (var i = 0; i < numOfCards; i++) {
    var card = document.createElement("div"); //create another div element
    //set all the attributes of the card
    card.className = "card";
    board.appendChild(card);
  }
  //append board game to the body of the html page
  document.body.appendChild(board);

  //availble symbols
  // @ ! * & # ? $ % ~

  var symbols = {
    0: "@",
    1: "!",
    2: "*",
    3: "&",
    4: "#",
    5: "?",
    6: "$",
    7: "%",
    8: "~";
  }

}
