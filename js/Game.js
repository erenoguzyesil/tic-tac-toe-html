const Game = {
  boardObject: new Board(),

  clearBoard: function () {
    for (let box of DOM.boardBoxes) {
      box.classList.remove('x', 'o', 'highlighted');
      box.innerHTML = '';
    }
  },

  setBoardState: function (enabled) {
    for (let box of DOM.boardBoxes)
      box.disabled = !enabled
  },

  setBoxMark: function (index, mark) {
    let box = DOM.boardBoxes[index];

    this.boardObject.placeMark(index, mark);

    box.innerHTML = mark.toUpperCase();
    box.classList.add(mark.toLowerCase());

    box.disabled = true;
  },

  placeComputerMark: function () {
    let computerWinPositions = this.boardObject.getCloseToWinPositions(markOf.computer);
    let playerWinPositions = this.boardObject.getCloseToWinPositions(markOf.player);

    let index;

    if (computerWinPositions.length != 0)
      index = computerWinPositions[0];

    else if (playerWinPositions.length != 0)
      index = playerWinPositions[0];

    else
      index = this.boardObject.getRandomAvailablePosition();

    if (DOM.boardBoxes[index].disabled) return false;

    this.setBoxMark(index, markOf.computer);
    this.checkForWin();
  },

  checkForWin: function () {
    let [winnerExists, winner, ,] = this.boardObject.getWinner();
    let isTie = this.boardObject.isTie();

    if (isTie)
      DOM.winnerIndicator.innerHTML = 'No winners! Tie.';

    if (winnerExists) {
      if (winner === markOf.player) {
        DOM.winnerIndicator.innerHTML = 'You (' + winner + ') won. Congrats!';
        DOM.winnerDiv.classList.add('player-won');
      } else {
        DOM.winnerIndicator.innerHTML = 'You lost! Computer (' + winner + ') won.';
        DOM.winnerDiv.classList.add('player-lost');
      }

      this.highlightWin();
    }

    if (winnerExists || isTie) {
      DOM.winnerDiv.style.display = 'flex';

      this.boardObject = new Board();
      this.setBoardState(false);
    }
  },

  highlightWin: function () {
    let [winnerExists, , positions] = this.boardObject.getWinner();

    if (winnerExists) {
      for (let index of positions)
        DOM.boardBoxes[index].classList.add('highlighted');

      return true;
    }

    return false;
  }
}
