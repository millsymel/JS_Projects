export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;

    this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(flipRow, flipColumn) {
    if (this._playerBoard[flipRow][flipColumn] !== ' ') {
      return;
    }
    if (this._bombBoard[flipRow][flipColumn] === 'B') {
      this._playerBoard[flipRow][flipColumn] = 'B';
    }
    else {
      this._playerBoard[flipRow][flipColumn] = this.getNumberOfSurroundingBombs(flipRow, flipColumn);
    }
    this._numberOfEmptySpaces--;
  }


  getNumberOfSurroundingBombs(flipRow, flipColumn) {
    const nextOffsets = [
      [0,1], [1,1], [1,0], [1,-1], [0, -1], [-1,-1], [-1,0], [-1,1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfSurroundingBombs = 0;

    nextOffsets.forEach(offset => {
      const neighborRowIndex = offset [0] + flipRow;
      const neighborColumnIndex = offset [1] + flipColumn;

      if (neighborRow >= 0 &&
        neighborRow < numberOfRows &&
        neighborColumn >= 0 &&
        neighborColumn < numberOfColumns) {
      if (this._bombBoard[neighborRow][neighborColumn] === 'B') {
        numberOfSurroundingBombs++;
      }
     }
    });
    return numberOfSurroundingBombs;
  }


  hasNonBombEmptySpaces () {
    return this._numberOfBombs !== this._numberOfEmptySpaces;
  }


  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for ( let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
  return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0

    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomColumnIndex][randomRowIndex] !== 'B') {
        board[randomColumnIndex][randomRowIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }
}
