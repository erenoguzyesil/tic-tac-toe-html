class Board {
  constructor() {
    this.marks = ['', '', '', '', '', '', '', '', ''];
  }

  static WINNING_POSITIONS() {
    return [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // Diagonals
      [0, 4, 8],
      [6, 4, 2]
    ];
  }

  static VALID_MARKS() {
    return ['X', 'O'];
  }

  getMark(index) {
    return this.marks[index];
  }

  placeMark(index, mark) {
    if (!Board.VALID_MARKS().includes(mark.toUpperCase())) return false;

    this.marks[index] = mark.toUpperCase();
  }

  getAvailablePositions() {
    let list = [];

    for (let i = 0; i < this.marks.length; i++) {
      if (this.marks[i] === '')
        list.push(i);
    }

    return list;
  }

  getRandomAvailablePosition() {
    let availablePositions = this.getAvailablePositions();
    let randomIndex = Math.floor(Math.random() * availablePositions.length);

    return availablePositions[randomIndex];
  }

  getWinner() {
    for (const positions of Board.WINNING_POSITIONS()) {
      let marksScanned = [];

      for (const index of positions) {
        let mark = this.getMark(index);

        marksScanned.push(mark);
      }

      if (!marksScanned.includes('') && new Set(marksScanned).size === 1)
        return [true, marksScanned[0], positions];
    }

    return [false, ''];
  }

  isTie() {
    return !this.getWinner()[0] && this.getAvailablePositions().length == 0;
  }

  getCloseToWinPositions(markToCheck) { // For the computer to play smarter
    let result = [];

    for (const positions of Board.WINNING_POSITIONS()) {
      let occurencesOfMarkToCheck = [];
      let emptyBoxIndexes = [];

      for (const index of positions) {
        let mark = this.getMark(index);

        if (mark == markToCheck)
          occurencesOfMarkToCheck.push(index);
        
        if (mark == '')
          emptyBoxIndexes.push(index);
      }

      if (occurencesOfMarkToCheck.length == 2 && emptyBoxIndexes.length == 1)
        result.push(emptyBoxIndexes[0]);
    }
    
    return result;
  }
}
