import React from 'react'

type Player = 1 | 2 | null
type CellProps = {
    player: Player | undefined,
    index: number
}

const Cell: React.FC<CellProps> = ({ player, index }) => {
  let color:string;
  switch(player) {
    case(1):
      color ='bg-red-400'
      break
    case(2):
      color = 'bg-blue-400'
      break
    default:
      color = 'bg-neutral-400'
      break
  }

  return (
    <article
        className={`rounded-full p-6  h-[75px] ${ color }`}
    >
      <div>{index}</div>
      <div>{player}</div>
    </article>
  )
}

export default Cell