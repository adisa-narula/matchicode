
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
  board.setAttribute("data-numflip", 0);

  for (var i = 0; i < numOfCards; i++) {
    var card = document.createElement("div"); //create another div element
    //set all the attributes of the card
    var sym = randomSymbol(numsym, symbols);
    console.log(sym);
    card.className = "card";
    card.setAttribute("data-symbol", sym);
    card.id = i;
    card.addEventListener("click", showCard);
    board.appendChild(card);
  }
  //append board game to the body of the html page
  document.body.appendChild(board);
}

function showCard() {

  var board = document.getElementById("board-game");
  var numflip = board.getAttribute("data-numflip");
  console.log(numflip);

  if ((document.getElementById(this.id).disabled) && numflip >= 2) {
    //flip back
  }

  else {
    document.getElementById(this.id).disabled = true;
    var para = document.createElement("p");
    var sym = document.createTextNode(this.getAttribute("data-symbol"));
    console.log('symbol: ', sym);
    para.appendChild(sym);
    this.appendChild(para);
    document.getElementById(this.id).style.backgroundColor = "#ffa64d";

    numflip++;
    board.setAttribute("data-numflip", numflip);
  }
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
