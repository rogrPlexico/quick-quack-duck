const gameDisplay = (() => {
    let renderEmptyBoard = emptyBoardArray => {
        let boardDiv = document.querySelector('.board');
        
        if (Math.sqrt(emptyBoardArray.length) % 1 === 0) {
            let rows = Math.sqrt(emptyBoardArray.length);
            
            for (let j = 1; j <= rows*rows; j++) {
                let displayCell = document.createElement('div');
                displayCell.setAttribute('class', 'board-cell');
                displayCell.setAttribute('data-board-column', j);
                displayCell.textContent = 'Quack';
                boardDiv.appendChild(displayCell);
                }
                
        } else console.error('board must be a perfect square');
    };
    
    let addRenderGamePieceEventListener = () => {
        let displayCells = document.querySelectorAll('.board-cell');
        
        let clickSquare = (cell, index) => {
            let player = gameFlow.getPlayerTurn();
            console.log(player);
            let playerPiece = player.gamePiece;
            cell.textContent = playerPiece;
            // cell.player = player;
            return initiateTurn(index);
        } 

        displayCells.forEach((cell, index) => {
            cell.addEventListener('click', () => clickSquare(cell, index), {once: true});
        });
    };

        let endGame = () => {
            let displayCells = document.querySelectorAll('.board-cell');
            displayCells.forEach((cell) => {
                const cellRemovedEventListner = cell.cloneNode(true);
                cell.parentNode.replaceChild(cellRemovedEventListner, cell)
            });
        };

        let displayWinner = (winner) => {
            let winnerDiv = document.querySelector('.result');
            winnerDiv.textContent = winner;
        }
    
    return {renderEmptyBoard, addRenderGamePieceEventListener, endGame, displayWinner};
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
    gameDisplay.renderEmptyBoard(emptyBoardArray);
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
    let playerTurn = player1;
    let boardState = nullsBoardArray;
    
    initiateGame = () => {
        gameDisplay.addRenderGamePieceEventListener();
    };
  
    initiateTurn = (index) => {
        return gameFlow.addPieceToBoard(index);
    };

    addPieceToBoard = (index) => {
        let playerPiece = playerTurn.gamePiece;
        
        boardState.splice(index, 1, playerPiece);
        return gameFlow.evaluateGameState();
    };

    changePlayerTurn = () => {
        if (playerTurn.userName == 'player1') playerTurn = player2;
        else playerTurn = player1;
    };

    getPlayerTurn = () => {
        return playerTurn;
    };

    evaluateGameState = () => {
        console.log(boardState);
        if ( 
            boardState[0] == 'x' && boardState[1] == 'x' && boardState[2] == 'x' ||
            boardState[3] == 'x' && boardState[4] == 'x' && boardState[5] == 'x' ||
            boardState[6] == 'x' && boardState[7] == 'x' && boardState[8] == 'x' ||
            boardState[0] == 'x' && boardState[3] == 'x' && boardState[6] == 'x' ||
            boardState[1] == 'x' && boardState[4] == 'x' && boardState[7] == 'x' ||
            boardState[2] == 'x' && boardState[5] == 'x' && boardState[8] == 'x' ||
            boardState[0] == 'x' && boardState[4] == 'x' && boardState[8] == 'x' ||
            boardState[2] == 'x' && boardState[4] == 'x' && boardState[6] == 'x'
        ) {
            gameDisplay.displayWinner('x wins')
            console.log('x wins');
            gameDisplay.endGame();
            return 'x wins';
        }
        else if (
            boardState[0] == 'o' && boardState[1] == 'o' && boardState[2] == 'o' ||
            boardState[3] == 'o' && boardState[4] == 'o' && boardState[5] == 'o' ||
            boardState[6] == 'o' && boardState[7] == 'o' && boardState[8] == 'o' ||
            boardState[0] == 'o' && boardState[3] == 'o' && boardState[6] == 'o' ||
            boardState[1] == 'o' && boardState[4] == 'o' && boardState[7] == 'o' ||
            boardState[2] == 'o' && boardState[5] == 'o' && boardState[8] == 'o' ||
            boardState[0] == 'o' && boardState[4] == 'o' && boardState[8] == 'o' ||
            boardState[2] == 'o' && boardState[4] == 'o' && boardState[6] == 'o' 
        ) {
            gameDisplay.displayWinner('o wins')
            console.log('o wins');
            gameDisplay.endGame();
            return 'o wins';
        }
        else if (boardState.every(value => value !== 'null' )) {
            gameDisplay.displayWinner('you both lose')
            console.log('tie');
            gameDisplay.endGame();
            return 'tie';
        }
        else { 
            gameFlow.changePlayerTurn();
        }   
    };
    return {
        playerTurn,
        boardState,
        initiateGame, 
        initiateTurn, 
        addPieceToBoard,
        changePlayerTurn,
        getPlayerTurn,
        evaluateGameState,
        }
})();


let result = gameFlow.initiateGame();



