import React from 'react';
import Cell from './Cell';

type ColProps = {
    handleColumnClick: (colIndex:number, allIndexes:number[]) => void,
    player: number,
    colIndex: number,
}

const Col: React.FC<ColProps> = ({ colIndex, handleColumnClick, player }) => {

    const allRows = [];
    const allIndexes: number[] = []

    for(let i=0; i<42; i+=7) {
        allIndexes.push(i + colIndex)
        allRows.push(
            <Cell player={player} index={i + colIndex} />
        )
    }

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