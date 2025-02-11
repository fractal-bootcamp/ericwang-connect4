type Board = Player[]
type Player = 1 | 2 | null
type Status = 'won' | 'tie' | 'ongoing'

type GameState = {
    board: Board,
    currentPlayer: Player,
    status: Status
}

const initialBoard = Array.from({ length: 42 }, (_, i) => null)

const initialGameState: GameState = {
    board: initialBoard,
    currentPlayer: 1,
    status: 'ongoing'
}

const rowBoundaries = [
    [0, 6],
    [7, 13],
    [14, 20],
    [21, 27],
    [28, 34],
    [35, 41],
]

const colBoundaries = [
    [0, 35],
    [1, 36],
    [2, 37],
    [3, 38],
    [4, 39],
    [5, 40],
    [6, 41],
]

const diagBoundariesLTR = [
    [14, 22, 30, 38],
    [7, 15, 23, 31, 39],
    [0, 8, 16, 24, 32, 40],
    [1, 9, 17, 25, 33, 41],
    [2, 10, 18, 26, 34],
    [3, 11, 19, 27],
]

const diagBoundariesRTL = [
    [3, 9, 15, 21],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29, 35],
    [6, 12, 18, 24, 30, 36],
    [13,19, 25, 31, 37],
    [20, 26, 32, 38],
]

function checkWin(board: Board, player: Player): boolean | undefined {
    // rows
    for(const nodes of rowBoundaries) { 
        for(let i=nodes[0]; i<nodes[1]; i++) {
            if(board[i] === player && board[i + 1] === player && board[i + 2] === player && board[i + 3] === player) {
                //console.log("row win")
                return true
            }
        }
    }
    // columns
    for(const nodes of colBoundaries) { 
        for(let i=nodes[0]; i<nodes[1]; i += 7) {
            if(board[i] === player && board[i+7] === player && board[i+14] === player && board[i+21] === player) {
                //console.log("column win")
                return true
            }
        }
    }
    // diagonalLTR
    for (const diagonal of diagBoundariesLTR) {
        for(let i=0; i < diagonal.length - 3; i++) {
            if(board[diagonal[i]] === player && board[diagonal[i+1]] === player && board[diagonal[i+2]] === player && board[diagonal[i+3]] === player) {
                //console.log("diagonalLTR win")
                return true
            }
        }
    }
    // diagonalRTL
    for (const diagonal of diagBoundariesRTL) {
        for(let i=0; i < diagonal.length - 3; i++) {
            if(board[diagonal[i]] === player && board[diagonal[i+1]] === player && board[diagonal[i+2]] === player && board[diagonal[i+3]] === player) {
                //console.log("diagonalRTL win")
                return true
            }
        }
    }

    return false
}

function move( prevGameState:GameState, index:number ): GameState {
    const newGameState = structuredClone(prevGameState)
    
    if(prevGameState.board[index] === null) {
        newGameState.board[index] = newGameState.currentPlayer

        console.log(checkWin(newGameState.board, newGameState.currentPlayer))
        // check win conditions
        if(checkWin(newGameState.board, newGameState.currentPlayer)) {
            newGameState.status = 'won'
            console.log("newGameState:", newGameState, 'won')
            return newGameState
        }
        // check tie
        if(!newGameState.board.includes(null)) {
            newGameState.status = 'tie'
            return newGameState
        }
            
        // switch players
        newGameState.currentPlayer = prevGameState.currentPlayer === 1 ? 2 : 1
    }

    console.log("newGameState:", newGameState)
    return newGameState
}

const winningBoardRTL:Board = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, 1   , null, null, null,
    null, null, 1   , null, null, null, null,
    null, 1   , null, null, null, null, null,
    1   , null, null, null, null, null, null,  // Winning row (bottom)
  ];

  const winningBoardLTR:Board = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    1,   null, null, null, null, null, null,
    null, 1,   null, null, null, null, null,
    null, null, 1,   null, null, null, null,
    null, null, null, 1,   null, null, null, // Winning diagonal (top-left to bottom-right)
  ];

  const winningBoardRow:Board = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    1,    1,    1,    1,   null, null, null,  // Winning row (bottom)
  ];

  const winningBoardCol:Board = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null,  null,   null, null, null, null,
    null, null,  1,   null, null, null, null,
    null, null,  1,   null, null, null, null,
    null, null,  1,   null, null, null, null, // Winning column (player 1)
  ];


const winningGameState:GameState = {
    board: winningBoardRow,
    currentPlayer: 1,
    status: 'ongoing'
}

// checkWin(winningBoardLTR, 1)

move(winningGameState, 23)


export {initialGameState}