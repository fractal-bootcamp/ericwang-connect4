import React from 'react'

type CellProps = {
    player: number,
    index: number
}

const Cell: React.FC<CellProps> = ({ player, index }) => {
  return (
    <article
        className={`rounded-full p-6  h-[75px] ${ player === 1 ? 'bg-red-400':'bg-neutral-400'}`}
    >
      <div>{index}</div>
      <div>{player}</div>
    </article>
  )
}

export default Cell