export default function GameBoard({ changePlayer, board }) {
    

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>{row.map((col, colIndex) =>
                        <li key={colIndex}>
                            <button disabled={col!==null} onClick={() => changePlayer(rowIndex, colIndex,)}>{col}</button>
                        </li>
                    )}</ol>
                </li>
            )}
        </ol>
    )
}
