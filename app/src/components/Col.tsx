import React from 'react';
import Cell from './Cell';
import { useState } from 'react';

type Player = 1 | 2 | null
type Cell = {
    index: number,
    player: Player
  }

type ColProps = {
    handleColumnClick: (colIndex:number, allIndexes:number[]) => void,
    player: Player | undefined,
    colIndex: number,
    colState: Cell[]
}

const Col: React.FC<ColProps> = ({ colIndex, handleColumnClick, player, colState }) => {

    const allRows = [];
    const allIndexes: number[] = []

    for(let i=0; i<42; i+=7) {
        allIndexes.push(i + colIndex)
    }

    allIndexes.forEach((cellIndex, index) => {
        const cellPlayer = colState.find((cell) => {
            return cell.index === cellIndex
        })
        allRows.push(
            <Cell player={cellPlayer?.player} index={cellIndex} />
        )
    })

    return (
        <div 
            className='grid grid-rows-6 gap-4 hover:bg-green-400'
            onClick={() => handleColumnClick(colIndex, allIndexes)}
        >
          {allRows}
        </div>
    )
}

export default Col