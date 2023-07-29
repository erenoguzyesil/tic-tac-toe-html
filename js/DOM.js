const DOM = {
  preGameMenu: document.querySelector('#pre-game-menu'),
  markSelectionButtons: [ document.querySelector('#x-button'), document.querySelector('#o-button') ],

  boardDiv: document.querySelector('#board'),
  boardBoxes: document.querySelectorAll('#board .box'),
  turnIndicator: document.querySelector('#turn-indicator'),

  winnerDiv: document.querySelector('#winner'),
  winnerIndicator: document.querySelector('#winner-indicator'),
  playAgainButton: document.querySelector('#play-again'),

  escapeHTML: (string) => {
    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

if (!CSS.supports('aspect-ratio', '1/1')) {
  let width = window.innerWidth + 'px';

  DOM.boardDiv.style.width = width;
  DOM.boardDiv.style.height = width;

  console.log('a');
}
