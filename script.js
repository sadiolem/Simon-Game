class SimonGame {
  constructor() {
    this.roundCounter = 0;
    this.playerSequence = [];
    this.randomSequence = [];

    this.startBtn = document.querySelector('.simon-game__start-btn');
    this.roundCounterElement = document.querySelector('.simon-game__round-counter');
    this.circleBlocks = document.querySelectorAll('.simon-game__circle-block');

    this.audio = {
      '1': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      '2': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      '3': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
      '4': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    }


    this.init();
  }

  init() {
    this.startBtn.addEventListener('click', () => {
      this.startGame();
    });

    this.circleBlocks.forEach((circleBlock, i) => {
      circleBlock.addEventListener('click', () => {
        this.handleUserInput(circleBlock, i);
      });
    });
  }

  startGame() {
    this.changeRound();
    this.playRandomSequence();
  }

  playRandomSequence() {
    const randomSequence = this.getRandomSequence(this.roundCounter);
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
    this.playAudio(element);

    setTimeout(() => {
      element.classList.remove('simon-game__circle-block_active');
    }, 600);
  }

  playAudio(element) {
    this.audio[element.dataset.id].play();
  }

  handleUserInput(circleBlock, i) {
    this.playAudio(circleBlock);
    const circleBlockId = parseInt(circleBlock.dataset.id);
    this.playerSequence.push(circleBlockId);

    if (this.playerSequence.length !== this.randomSequence.length) return;

    if (this.playerSequence[i] === this.randomSequence[i]) {
      this.playerSequence = [];
      this.randomSequence = [];
      alert('next round');
      this.startGame();

      return;
    }

    this.endGame();
  }

  getRandomSequence(roundNumber) {
    for (let i = 0; i < roundNumber; i++) {
      const randomNumber = Math.floor(Math.random() * 4) + 1;

      this.randomSequence.push(randomNumber);
    }

    return this.randomSequence;
  }

  changeRound() {
    this.roundCounter += 1;
    this.roundCounterElement.textContent = this.roundCounter;
  }

  endGame() {
    alert('GAME OVER');

    this.playerSequence = [];
    this.randomSequence = [];
    this.roundCounter = 0;
    this.roundCounterElement.textContent = this.roundCounter;
  }
}

new SimonGame();
