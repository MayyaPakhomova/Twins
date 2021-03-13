function disablecontext(e) {
  let clickedEl = e == null ? event.srcElement.tagName : e.target.tagName;
  if (clickedEl == "IMG") {
    return false;
  }
}
document.oncontextmenu = disablecontext;

let images = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
];
function shuffleImages(images) {
  let i = 0,
    j = 0,
    temp = null;
  for (i = images.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }
}
shuffleImages(images);
let enterNumber = document.querySelector(".enter-a-number");
let buttonBegin = document.querySelector(".btn-begin");
let numberOfCards = JSON.parse(localStorage.getItem("Количество карточек"));

enterNumber.addEventListener("input", function (e) {
  if (e.target.value === "") {
    buttonBegin.disabled = true;
  } else {
    buttonBegin.disabled = false;
  }
});

buttonBegin.addEventListener("click", function () {
  if (
    enterNumber.value % 2 !== 0 ||enterNumber.value <= 0||enterNumber.value > 10 
  ) {
    enterNumber.value = 4;
  }
  localStorage.setItem("Количество карточек", enterNumber.value);
  window.location.reload();
});

images = images.slice(0, (numberOfCards * numberOfCards) / 2);
let myImages = images.concat(images);

function createСards(cardCount) {
  for (let i = 0; i < cardCount; i++) {
    let card = document.createElement("div");
    if (numberOfCards === 2) {
      card.classList.add("playing-card-two", "playing-card");
    }
    if (numberOfCards === 4) {
      card.classList.add("playing-card");
    }
    if (numberOfCards === 6) {
      card.classList.add("playing-card-six", "playing-card");
    }
    if (numberOfCards === 8) {
      card.classList.add("playing-card-eight", "playing-card");
    }
    if (numberOfCards === 10) {
      card.classList.add("playing-card-ten", "playing-card");
    }
    let img = document.createElement("img");
    img.classList = "picture";
    img.setAttribute("src", "img/" + myImages[i] + ".png");
    let imgBack = document.createElement("img");
    imgBack.classList = "back";
    imgBack.setAttribute("src", "img/772.jpg");

    card.append(img);
    card.append(imgBack);
    card.dataset.card = myImages[i];

    let cardDeck = document.querySelector(".card-deck");
    cardDeck.append(card);
  }
}
createСards(numberOfCards * numberOfCards);

const cards = document.querySelectorAll(".playing-card");
let blockСards = false;
let myFuncCalls = 0;
let firstCard, secondCard;

function flipСards() {
  if (blockСards) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  controlCards();
}

function controlCards() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    twinsCards();
  } else {
    removeCards();
  }
}

function twinsCards() {
  firstCard.removeEventListener("click", flipСards);
  secondCard.removeEventListener("click", flipСards);
  myFuncCalls++;
  if (myFuncCalls === (numberOfCards * numberOfCards) / 2) {
    setTimeout(() => {
      buttonWin.style.display = "block";
    }, 800);
  }
  resetCards();
}

function removeCards() {
  blockСards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    blockСards = false;
    resetCards();
  }, 1200);
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  cards.forEach((card) => {
    card.style.order  = Math.floor(Math.random() * 50); 
  });
})();
cards.forEach((card) => card.addEventListener("click", flipСards));

let stopwatchStart = document.querySelector(".btn-stopwatch-start");
let stopwatchOut = document.querySelector(".stopwatch");
let milliseconds = document.getElementById("milliseconds");
let seconds = document.getElementById("seconds");
let stopWatchIntervalId = null;
let prevTime = null;
let buttonReplay = document.querySelector(".btn-replay");
let buttonWin = document.querySelector(".btn-win");

function timerTick() {
  stopwatchStart.disabled = true;
  curTime = new Date().getTime();
  let diff = curTime - prevTime;
  let sec = Math.floor(diff / 1000);
  seconds.innerHTML = sec;
  milliseconds.innerHTML = Math.floor((diff - sec * 1000) / 10);

  if (sec >= 60) {
    prevTime = null;
    clearInterval(stopWatchIntervalId);
    cards.forEach((card) => card.removeEventListener("click", flipCard));
    buttonReplay.style.display = "block";
  }
}
stopwatchStart.addEventListener("click", function () {
  prevTime = new Date().getTime();
  stopWatchIntervalId = setInterval(timerTick, 10);
});

buttonReplay.addEventListener("click", function () {
  window.location.reload();
});

buttonWin.addEventListener("click", function () {
  setTimeout(() => {
    buttonWin.style.display = "none";
    window.location.reload();
  }, 500);
});
