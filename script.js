class SimonGame {
  constructor() {
    this.roundCounter = 0;
    this.playerSequence = [];
    this.randomSequence = [];

    this.startBtn = document.querySelector('.simon-game__start-btn');
    this.roundCounterElement = document.querySelector('.simon-game__round-counter');
    this.circle = document.querySelector('.simon-game__circle');
    this.circleBlocks = document.querySelectorAll('.simon-game__circle-block');

    this.init();
  }

  init() {
    this.startBtn.addEventListener('click', () => {
      this.startGame();
    });
  }

  startGame() {
    this.changeRound(1);
    this.changeRoundView(this.roundCounter);
    
    const randomSequence = this.getRandomSequence(this.roundCounter);

    this.playRandomSequence(randomSequence);
  }

  endGame() {
    alert('GAME OVER');
    this.changeRound(0);
    this.changeRoundView(this.roundCounter);
  }

  playRandomSequence(randomSequence) {
    const elementsToPlay = [];

    randomSequence.forEach((item) => {
      const element = [...this.circleBlocks].find((element) => item === parseInt(element.dataset.id));

      elementsToPlay.push(element);
    });

    elementsToPlay.forEach((element, i) => {
      const count = i + 1;

      setTimeout(() => {
        this.playElement(element);
      }, count * 600);
    });
  }

  playElement(element) {
    element.classList.add('simon-game__circle-block_active');

    setTimeout(() => {
      element.classList.remove('simon-game__circle-block_active');
    }, 600);
  }

  getRandomSequence(roundNumber) {
    const randomSequence = [];

    for (let i = 0; i < roundNumber; i++) {
      const randomNumber = Math.floor(Math.random() * 4) + 1;

      randomSequence.push(randomNumber);
    }

    return randomSequence;
  }

  changeRound(roundNumber) {
    this.roundCounter = roundNumber;
  }

  changeRoundView(round) {
    this.roundCounterElement.textContent = round;
  }
}

new SimonGame();
