/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  //console.log(JSON.stringify(solution));
  var board = solution.rows();
  var counter = 0;

  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board.length; col++) {
      if (board[row][col] === 0) {
        solution.togglePiece(row, col);
        //console.log(JSON.stringify(solution));
        board[row][col] = 1;
        counter++;
      }
      
      if (solution.hasAnyRooksConflicts() === false && counter === n) {
        //console.log(JSON.stringify(solution));
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
        return solution.rows();
      } else if (solution.hasAnyRooksConflicts() === true) {
        solution.togglePiece(row, col);
        board[row][col] = 0;
        counter--;
      }
      
    } 
  }
  
  //console.log(JSON.stringify(solution.hasAnyRooksConflicts()));
  //return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var counter = 0;
  var board = new Board({n: n});
  var arrBoard = board.rows();
  var removedPiece = false;
  var newRow = 0;

  var recurse = function (counter) {

    for (var col = 0; col < arrBoard.length; col++) {
      if (arrBoard[newRow][col] === 0) {
        board.togglePiece(newRow, col);
        arrBoard[newRow][col] = 1;
        counter++; 
  
        if (board.hasAnyRooksConflicts() === true) {
          board.togglePiece(newRow, col);
          arrBoard[newRow][col] = 0;
          counter--;
          removedPiece = true;
        } else {
          if (newRow < n - 1) {
            newRow++;
          }
 
          if (counter === n) {
            solutionCount++;
            removedPiece = false;
          } else {
            recurse(counter);
          }

          removedPiece = false;
        }
        //remove piece
        if (!removedPiece) {
          //console.log(newRow);
          board.togglePiece(newRow, col);
          arrBoard[newRow][col] = 0;
          counter--;
          removedPiece = false;
        }
        
      } 
    }
    if (newRow > 0) {
      newRow--;
    }

  };

  recurse(counter);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return (solutionCount);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
 
  var solutionCount = 0;
  var counter = 0;
  var board = new Board({n: n});
  var arrBoard = board.rows();
  var removedPiece = false;
  var newRow = 0;
  var answer = board;
  var OnceEver = false;

  var recurse = function (counter) {
    for (var col = 0; col < arrBoard.length; col++) {
      if (arrBoard[newRow][col] === 0) {
        board.togglePiece(newRow, col);
        arrBoard[newRow][col] = 1;
        counter++; 
  
        if (board.hasAnyQueensConflicts() === true) {
          board.togglePiece(newRow, col);
          arrBoard[newRow][col] = 0;
          counter--;
          removedPiece = true;
        } else {
          if (newRow < n - 1) {
            newRow++;
          }
 
          if (counter === n && !OnceEver) {
            solutionCount++;
            removedPiece = false;
            answer = new Board(arrBoard);
            //console.log(JSON.stringify(answer));
            OnceEver = true;
            return answer.rows();
          } else {
            recurse(counter);
          }

          removedPiece = false;
        }
        //remove piece
        if (!removedPiece) {
          //console.log(newRow);
          board.togglePiece(newRow, col);
          arrBoard[newRow][col] = 0;
          counter--;
          removedPiece = false;
        }
        
      } 
    }
    if (newRow > 0) {
      newRow--;
    }
  };
  recurse(counter);
  

  // } else if (n===1){
  //   console.log(JSON.stringify(new Board({n:1})).rows());
  //   return (new Board({n:1})).rows();
  // }
  console.log('stringified answer', JSON.stringify(answer));
  return answer.rows();

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var counter = 0;
  var board = new Board({n: n});
  var arrBoard = board.rows();
  var removedPiece = false;
  var newRow = 0;

  var recurse = function (counter) {
    for (var col = 0; col < arrBoard.length; col++) {
      if (arrBoard[newRow][col] === 0) {
        board.togglePiece(newRow, col);
        arrBoard[newRow][col] = 1;
        counter++; 
  
        if (board.hasAnyQueensConflicts() === true) {
          board.togglePiece(newRow, col);
          arrBoard[newRow][col] = 0;
          counter--;
          removedPiece = true;
        } else {
          if (newRow < n - 1) {
            newRow++;
          }
 
          if (counter === n) {
            solutionCount++;
            removedPiece = false;
          } else {
            recurse(counter);
          }

          removedPiece = false;
        }
        //remove piece
        if (!removedPiece) {
          //console.log(newRow);
          board.togglePiece(newRow, col);
          arrBoard[newRow][col] = 0;
          counter--;
          removedPiece = false;
        }
        
      } 
    }
    if (newRow > 0) {
      newRow--;
    }
  };
  recurse(counter);

  if (n === 0) {
    return 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return (solutionCount);
};
