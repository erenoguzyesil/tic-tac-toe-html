let markOf = { player: '', computer: '' }
const oppositeMarkOf = { X: 'O', O: 'X' }

let isPlayerTurn = false;

for (let button of DOM.markSelectionButtons) {
  button.addEventListener('click', () => {
    Game.clearBoard();
    Game.setBoardState(true);

    markOf.player = DOM.escapeHTML(button.innerText);
    markOf.computer = oppositeMarkOf[markOf.player];

    if (markOf.player === 'O')
      Game.placeComputerMark();

    DOM.preGameMenu.style.display = 'none';
    DOM.boardDiv.style.display = 'grid';

    DOM.turnIndicator.style.display = 'block';
    DOM.turnIndicator.innerHTML = "<b>It's your turn! Press on one of the empty boxes in the board above to place your mark (" + markOf.player + ').</b>';
  });
}

for (let box of DOM.boardBoxes) {
  box.addEventListener('click', () => {
    let boxIndex = parseInt(box.id) - 1;

    DOM.turnIndicator.style.display = 'none';

    Game.setBoxMark(boxIndex, markOf.player);
    Game.checkForWin();

    Game.placeComputerMark();
  });
}

DOM.playAgainButton.addEventListener('click', () => {
  DOM.winnerDiv.style.display = 'none';
  DOM.winnerDiv.classList.remove('player-won', 'player-lost');

  DOM.preGameMenu.style.display = 'block';
  DOM.boardDiv.style.display = 'none';
});
