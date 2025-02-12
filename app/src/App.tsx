import './App.css'
import Col from './components/Col'
import { useState, useEffect } from 'react'

function App() {
  type ColState = Record<number, number[]>
  const initialColState = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }

  const [colState, setColState] = useState<ColState>(initialColState)
  const [player, setPlayer] = useState(2)

  const handleColumnClick = (colIndex:number, allIndexes: number[]) => {
    setColState((prevState) => {
      const newState = [];
      allIndexes.forEach((index) => {
        if(prevState[colIndex].includes(index)) {
          newState.push(index)
        }
      })

      if(allIndexes[allIndexes.length - prevState[colIndex].length-1] === 0 || allIndexes[allIndexes.length - prevState[colIndex].length-1]) {
        newState.unshift(allIndexes[allIndexes.length - prevState[colIndex].length-1])
      }

      return {
        ...prevState,
        [colIndex]: [...newState]
      }
    })

    setPlayer(player === 1 ? 2 : 1)
  } 

  useEffect(() => {
    console.log("state:", colState)
  },[colState])

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
              <Col colIndex={i} handleColumnClick={handleColumnClick} player={player} />
          ))}
        </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
