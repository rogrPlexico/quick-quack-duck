const gameDisplay = (() => {
    let renderBoard = currentBoard => {
        let boardDiv = document.querySelector('.board');
        
        if (Math.sqrt(currentBoard.length) % 1 === 0) {
            let rows = Math.sqrt(currentBoard.length);
            
            for (let j = 1; j <= rows*rows; j++) {
                let displayCell = document.createElement('div');
                displayCell.setAttribute('class', 'board-cell');
                displayCell.setAttribute('data-board-column', j);
                displayCell.textContent = 'Quack';
                boardDiv.appendChild(displayCell);
                }
                
        } else console.error('board must be a perfect square');
    };
    
    let renderGamePiece = (boardState, player) => {
        let displayCells = document.querySelectorAll('.board-cell');
        let playerPiece = player.gamePiece;

        let clickSquare = (cell, index) => {
            cell.textContent = playerPiece;
            console.log(event);
            // cell.removeEventListener('click', clickSquare);
            return gameFlow.addPieceToBoard(boardState, player, index);
        } 

        displayCells.forEach((cell, index) => {
            cell.addEventListener('click', () => clickSquare(cell, index));
        });
    };
    
    return {renderBoard, renderGamePiece};
})(); 

// module to create board array and populate empty array with nulls, enabling proper use of splice() array method
const nullsBoardArray = (() => {
    let emptyBoardArray = [];
    let squares = 9;
    let addNulls = numSquares => {
        for(let i = 0; i <= numSquares-1; i++) {
            emptyBoardArray.push('null');    
        }
    };
    addNulls(squares);
    gameDisplay.renderBoard(emptyBoardArray);
    return emptyBoardArray;
})();

// factory to create players
const createPlayer = (userName, gamePiece) => {
    return {userName, gamePiece};
}

// gameFlow module. Object contains methods for all game actions
const gameFlow = (() => {
    let player1 = createPlayer('player1', 'x');
    let player2 = createPlayer('player2', 'o');
    
    initiateGame = () => {
        let initialBoard = nullsBoardArray;
        let playerTurn = player1;
        return gameFlow.initiateTurn(initialBoard, playerTurn);
    };
  
    initiateTurn = (boardState, currentPlayer) => {
        let currentBoardState = boardState;
        console.log(currentBoardState);
        let player = currentPlayer;
        // renderGamePiece should be called once at initiateGame. Need to pass in playerState to the event
        return gameDisplay.renderGamePiece(currentBoardState, player);
    };

    addPieceToBoard = (boardState, player, index) => {
        let currentPlayerPiece = player.gamePiece;
        let updatedBoardState = boardState;
        updatedBoardState.splice(index, 1, currentPlayerPiece);
        return gameFlow.evaluateGameState(updatedBoardState, player);
    };

  changePlayerTurn = (previousPlayer) => {
        if (previousPlayer.userName == 'player1') nextPlayer = player2;
        else nextPlayer = player1;
        return nextPlayer;
    };
    evaluateGameState = (boardState, player) => {
        if ( 
            boardState[1] == 'x' && boardState[2] == 'x' && boardState[3] == 'x' ||
            boardState[4] == 'x' && boardState[5] == 'x' && boardState[6] == 'x' ||
            boardState[7] == 'x' && boardState[8] == 'x' && boardState[9] == 'x' ||
            boardState[1] == 'x' && boardState[4] == 'x' && boardState[7] == 'x' ||
            boardState[2] == 'x' && boardState[5] == 'x' && boardState[8] == 'x' ||
            boardState[3] == 'x' && boardState[6] == 'x' && boardState[9] == 'x' ||
            boardState[1] == 'x' && boardState[5] == 'x' && boardState[9] == 'x' ||
            boardState[3] == 'x' && boardState[5] == 'x' && boardState[7] == 'x'
        ) {
            console.log('x wins');
            return 'x wins';
        }
        else if (
            boardState[1] == 'o' && boardState[2] == 'o' && boardState[3] == 'o' ||
            boardState[4] == 'o' && boardState[5] == 'o' && boardState[6] == 'o' ||
            boardState[7] == 'o' && boardState[8] == 'o' && boardState[9] == 'o' ||
            boardState[1] == 'o' && boardState[4] == 'o' && boardState[7] == 'o' ||
            boardState[2] == 'o' && boardState[5] == 'o' && boardState[8] == 'o' ||
            boardState[3] == 'o' && boardState[6] == 'o' && boardState[9] == 'o' ||
            boardState[1] == 'o' && boardState[5] == 'o' && boardState[9] == 'o' ||
            boardState[3] == 'o' && boardState[5] == 'o' && boardState[7] == 'o' 
        ) {
            console.log('o wins');
            return 'o wins';
        }
        else if (boardState.every(value => value !== 'null' )) {
            console.log('tie');
            return 'tie';
        }
        else { 
            let nextPlayer = gameFlow.changePlayerTurn(player);
            return gameFlow.initiateTurn(boardState, nextPlayer);
        }   
    };
    return {
        initiateGame, 
        initiateTurn, 
        addPieceToBoard,
        changePlayerTurn,
        evaluateGameState}
})();


let result = gameFlow.initiateGame();
console.log('result: ')
console.log(result);


