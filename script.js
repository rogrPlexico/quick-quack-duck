


// populate empty array with nulls, enabling proper use of splice() array method
const nullsBoardArray = (() => {
    let emptyBoardArray = [];
    let squares = 9;
    let addNulls = numSquares => {
        for(let i = 0; i <= numSquares-1; i++) {
            emptyBoardArray.push('null');    
        }
    };
    addNulls(squares);
    return emptyBoardArray;
})();

// const player = (userName, gamePiece) => {
//     const getName = () => userName;
//     const getGamePiece = () => gamePiece; 
//     return { getName, getGamePiece };
// };


const player1 = {
    userName: 'player1',
    gamePiece: 'x',
};

const player2 = {
    userName: 'player2',
    gamePiece: 'o',
};

// const gameFlow = (function() {
//     playRound = () => {
//         +prompt('0-8');
//     }
// })();



const gameFlow = {
    initiateGame: () => {
        let initialBoard = nullsBoardArray;
        let playerTurn = player1;
        return gameFlow.initiateTurn(initialBoard, playerTurn);
    },
  
    initiateTurn: (boardState, currentPlayer) => {
        let currentBoardState = boardState;
        let player = currentPlayer;
        return gameFlow.addPieceToBoard(currentBoardState, player);
    },

    addPieceToBoard: (boardState, player) => {
        let playerSquareChoice = +prompt('0-8');
        let currentPlayerPiece = player.gamePiece;
        let updatedBoardState = boardState;
        updatedBoardState.splice(playerSquareChoice, 1, currentPlayerPiece);
        console.log(updatedBoardState);
        return gameFlow.evaluateGameState(updatedBoardState, player);
    },

    changePlayerTurn: (previousPlayer) => {
        if (previousPlayer.userName == 'player1') nextPlayer = player2;
        else nextPlayer = player1;
        return nextPlayer;
    },
    evaluateGameState: (boardState, player) => {
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
    },
}

let result = gameFlow.initiateGame();
console.log('result: ')
console.log(result);


