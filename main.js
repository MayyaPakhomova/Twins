function disablecontext(e) {
  if ('IMG' == (null == e ? e.srcElement.tagName : e.target.tagName)) return !1;
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
function shuffleImages(e) {
  let t = 0,
    n = 0,
    a = null;
  for (t = e.length - 1; t > 0; t -= 1)
    (n = Math.floor(Math.random() * (t + 1))),
      (a = e[t]),
      (e[t] = e[n]),
      (e[n] = a);
}
const enterNumber = document.querySelector('.enter-a-number'),
  buttonBegin = document.querySelector('.btn-begin'),
  cardDeck = document.querySelector('.card-deck'),
  noCard = document.querySelector('.no-card'),
  stopwatchStart = document.querySelector('.btn-stopwatch-start'),
  stopwatchOut = document.querySelector('.stopwatch'),
  milliseconds = document.getElementById('milliseconds'),
  seconds = document.getElementById('seconds');
let stopWatchIntervalId, prevTime;
const buttonWin = document.querySelector('.btn-win'),
  timer = document.querySelector('.timer');
function createСards(e) {
  const t = images.slice(0, (e * e) / 2),
    n = t.concat(t);
  for (let t = 0; t < e * e; t++) {
    let a = document.createElement('div');
    2 == e && a.classList.add('playing-card-two', 'playing-card'),
      4 == e && a.classList.add('playing-card'),
      6 == e && a.classList.add('playing-card-six', 'playing-card'),
      8 == e && a.classList.add('playing-card-eight', 'playing-card'),
      10 == e && a.classList.add('playing-card-ten', 'playing-card');
    let c = document.createElement('img');
    (c.classList = 'picture'), c.setAttribute('src', 'img/' + n[t] + '.svg');
    let r = document.createElement('img');
    (r.classList = 'back'),
      r.setAttribute('src', 'img/772.jpg'),
      a.append(c),
      a.append(r),
      (a.dataset.card = n[t]),
      cardDeck.append(a);
  }
}
function numberOfCards() {
  return (
    enterNumber.value &&
      (enterNumber.value % 2 != 0 ||
        enterNumber.value <= 0 ||
        enterNumber.value > 10) &&
      (enterNumber.value = 4),
    enterNumber.value
  );
}
function timerTick() {
  let e = new Date().getTime() - prevTime,
    t = Math.floor(e / 1e3);
  return (
    (seconds.textContent = t),
    (milliseconds.textContent = Math.floor((e - 1e3 * t) / 10)),
    t >= 60 &&
      (clearInterval(stopWatchIntervalId),
      (prevTime = null),
      buttonWin.classList.add('active'),
      (buttonWin.textContent = 'Сыграть еще раз?')),
    `${seconds.textContent},${milliseconds.textContent}`
  );
}
buttonBegin.addEventListener('click', (e) => {
  '' == enterNumber.value
    ? noCard.classList.add('active')
    : (noCard.classList.remove('active'), timer.classList.add('active')),
    shuffleImages(images),
    (cardDeck.textContent = ''),
    e.preventDefault();
  const t = numberOfCards();
  createСards(t);
  const n = document.querySelectorAll('.playing-card');
  let a,
    c,
    r = !1,
    s = 0;
  function i() {
    r ||
      (this !== a &&
        (this.classList.add('flip'),
        a
          ? ((c = this),
            a.dataset.card === c.dataset.card
              ? (a.removeEventListener('click', i),
                c.removeEventListener('click', i),
                ++s == (t * t) / 2 &&
                  setTimeout(() => {
                    buttonWin.classList.add('active'),
                      clearInterval(stopWatchIntervalId),
                      seconds.textContent > 1
                        ? (buttonWin.innerHTML = `Победа! <br/> Ваш результат ${timerTick()} сек`)
                        : (buttonWin.innerHTML = 'Победа!');
                  }, 80),
                l())
              : ((r = !0),
                setTimeout(() => {
                  a.classList.remove('flip'),
                    c.classList.remove('flip'),
                    (r = !1),
                    l();
                }, 1200)))
          : (a = this)));
  }
  function l() {
    [a, c] = [null, null];
  }
  n.forEach((e) => {
    e.style.order = Math.floor(50 * Math.random());
  }),
    n.forEach((e) => e.addEventListener('click', i));
}),
  stopwatchStart.addEventListener('click', () => {
    stopWatchIntervalId
      ? (clearInterval(stopWatchIntervalId),
        (prevTime = new Date().getTime()),
        (stopWatchIntervalId = setInterval(timerTick, 10)))
      : ((prevTime = new Date().getTime()),
        (stopWatchIntervalId = setInterval(timerTick, 10)));
  }),
  buttonWin.addEventListener('click', () => {
    buttonWin.classList.remove('active'),
      (buttonWin.textContent = ''),
      (cardDeck.textContent = ''),
      (enterNumber.value = ''),
      timer.classList.remove('active'),
      (milliseconds.textContent = '00'),
      (seconds.textContent = '00');
  });
