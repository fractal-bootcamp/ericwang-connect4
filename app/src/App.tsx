import './App.css'
import Col from './components/Col'
import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

type Cell = {
  index: number,
  player: Player
}

type ColState = Cell[][]
type Board = Player[] 
type Player = 1 | 2 | null
type Status = 'won' | 'tie' | 'ongoing'

type GameState = {
  board: Board,
  currentPlayer: Player | undefined,
  status: Status | undefined
}

const emptyBoard: Board = [
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, 
];


function App() {
  const initialColState = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]
  const socket = io('http://localhost:3000')

  const [colState, setColState] = useState<ColState>(initialColState)
  const [gameState, setGameState] = useState<GameState>()
  const [player, setPlayer] = useState<Player>(1)

  const handleColumnClick = (colIndex:number, allIndexes: number[]) => {
    // const newGameState: GameState = {
    //   board: [null],
    //   currentPlayer: gameState?.currentPlayer,
    //   status: gameState?.status
    // }

    // socket.emit('move', newGameState )

    setColState((prevState) => {
      const newState = [...prevState[colIndex]];
      const nextIndex = allIndexes[allIndexes.length - prevState[colIndex].length-1]

      const cell: Cell = {
        index: nextIndex,
        player: player
      }
      
      if(nextIndex === 0 || nextIndex ) {
        newState.unshift(cell)
      }

      return {
        ...prevState,
        [colIndex]: [...newState]
      }
    })

    setPlayer(player === 1 ? 2 : 1)
  } 

  useEffect(() => {
    socket.on('gameUpdate', (gameState) => {
      setGameState(gameState)
    })
  },[socket])

  useEffect(() => {
    console.log("state updated:", colState)
  },[colState])

  useEffect(() => {
    console.log("gameState updated:", gameState)
  },[gameState])

  return (
    <>
    <main className='max-w-[1440px] w-full mx-auto'>
      <div className='h-[80px] bg-neutral-700 mb-4 p-4'>Nav</div>
      <div className='flex gap-4'>
        <div className='grow bg-neutral-600'>
          <h1 className='text-4xl font-bold mb-8 p-4'>Tailwind CSS Connect Four</h1>
        </div>
        <div className='grow bg-neutral-500 p-4'>
          <div className='px-3'>
          <div className='rounded-full w-[75px] h-[75px] bg-red-800 mb-4'></div>
        </div>
        <div className='grid grid-cols-7 w-full gap-4 rounded-xl overflow-hidden p-4 bg-neutral-700'>
          {Array.from({ length: 7 }, (_, i) => (
              <Col colIndex={i} handleColumnClick={handleColumnClick} player={player} colState={colState[i]} />
          ))}
        </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
