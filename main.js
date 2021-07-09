function disablecontext(e) {
  let clickedEl = e == null ? event.srcElement.tagName : e.target.tagName;
  if (clickedEl == 'IMG') {
    return false;
  }
}
document.oncontextmenu = disablecontext;

let images = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
];
function shuffleImages(img) {
  let i = 0,
    j = 0,
    temp = null;
  for (i = img.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = img[i];
    img[i] = img[j];
    img[j] = temp;
  }
}

const enterNumber = document.querySelector('.enter-a-number');
const buttonBegin = document.querySelector('.btn-begin');
const cardDeck = document.querySelector('.card-deck');
const noCard = document.querySelector('.no-card');

const stopwatchStart = document.querySelector('.btn-stopwatch-start');
const stopwatchOut = document.querySelector('.stopwatch');
const milliseconds = document.getElementById('milliseconds');
const seconds = document.getElementById('seconds');
let stopWatchIntervalId;
let prevTime;
const buttonWin = document.querySelector('.btn-win');
const timer = document.querySelector('.timer');

function createСards(cardCount) {
  const image = images.slice(0, (cardCount * cardCount) / 2);
  const myImages = image.concat(image);
  for (let i = 0; i < cardCount * cardCount; i++) {
    let card = document.createElement('div');
    if (cardCount == 2) {
      card.classList.add('playing-card-two', 'playing-card');
    }
    if (cardCount == 4) {
      card.classList.add('playing-card');
    }
    if (cardCount == 6) {
      card.classList.add('playing-card-six', 'playing-card');
    }
    if (cardCount == 8) {
      card.classList.add('playing-card-eight', 'playing-card');
    }
    if (cardCount == 10) {
      card.classList.add('playing-card-ten', 'playing-card');
    }
    let img = document.createElement('img');
    img.classList = 'picture';
    img.setAttribute('src', 'img/' + myImages[i] + '.svg');
    let imgBack = document.createElement('img');
    imgBack.classList = 'back';
    imgBack.setAttribute('src', 'img/772.jpg');
    card.append(img);
    card.append(imgBack);
    card.dataset.card = myImages[i];
    cardDeck.append(card);
  }
}

function numberOfCards() {
  if (enterNumber.value) {
    if (
      enterNumber.value % 2 !== 0 ||
      enterNumber.value <= 0 ||
      enterNumber.value > 10
    ) {
      enterNumber.value = 4;
    }
  }
  return enterNumber.value;
}

buttonBegin.addEventListener('click', (e) => {
  timer.classList.add('active');

  if (enterNumber.value == '') {
    noCard.classList.add('active');
    console.log(12);
  }else{
    noCard.classList.remove('active');
  }

  shuffleImages(images);
  cardDeck.textContent = '';
  e.preventDefault();
  const numberOfCard = numberOfCards();
  createСards(numberOfCard);

  const cards = document.querySelectorAll('.playing-card');
  let blockСards = false;
  let myFuncCalls = 0;
  let firstCard, secondCard;

  function flipСards() {
    if (blockСards) return;
    if (this === firstCard) return;
    this.classList.add('flip');
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
    firstCard.removeEventListener('click', flipСards);
    secondCard.removeEventListener('click', flipСards);
    myFuncCalls++;
    if (myFuncCalls == (numberOfCard * numberOfCard) / 2) {
      setTimeout(() => {
        buttonWin.classList.add('active');
        buttonWin.textContent = 'Победа!';
        clearInterval(stopWatchIntervalId);
      }, 80);
    }
    resetCards();
  }

  function removeCards() {
    blockСards = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      blockСards = false;
      resetCards();
    }, 1200);
  }

  function resetCards() {
    [firstCard, secondCard] = [null, null];
  }

  (function shuffleCards() {
    cards.forEach((card) => {
      card.style.order = Math.floor(Math.random() * 50);
    });
  })();
  cards.forEach((card) => card.addEventListener('click', flipСards));
});
stopwatchStart.addEventListener('click', () => {
  if (stopWatchIntervalId) {
    clearInterval(stopWatchIntervalId);
    prevTime = new Date().getTime();
    stopWatchIntervalId = setInterval(timerTick, 10);
  } else {
    prevTime = new Date().getTime();
    stopWatchIntervalId = setInterval(timerTick, 10);
  }
});
function timerTick() {
  let curTime = new Date().getTime();
  let diff = curTime - prevTime;
  let sec = Math.floor(diff / 1000);
  seconds.textContent = sec;
  milliseconds.textContent = Math.floor((diff - sec * 1000) / 10);
  if (sec >= 5) {
    clearInterval(stopWatchIntervalId);
    prevTime = null;
    buttonWin.classList.add('active');
    buttonWin.textContent = 'Сыграть еще раз?';
  }
}

buttonWin.addEventListener('click',()=>{
  buttonWin.classList.remove('active');
  buttonWin.textContent = '';
  cardDeck.textContent = '';
  enterNumber.value = '';
  timer.classList.remove('active');
  milliseconds.textContent = '00';
  seconds.textContent = '00';
});
