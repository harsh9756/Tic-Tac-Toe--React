import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/player"
import Logs from "./components/Logs"
import { WINNING_COMBINATIONS } from "./winner"
import GameOver from "./components/GameOver"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function getActivePlayer(data) {
  let currentPlayer = "X"
  if (data.length > 0 && data[0].player == 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function App() {

  const [Turns, setTurns] = useState([])
  const [Players, setPlayers] = useState({'X':'Player 1','O':'Player 2'})
  let winner = null;

  const resetTurns = () => {
    setTurns([])
  }
  const activePlayer = getActivePlayer(Turns)
  const changePlayer = (rowIndex, colIndex) => {
    setTurns((last) => {
      const currentPlayer = getActivePlayer(last)
      const newTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...last]
      return newTurns
    });
  }

  let gameBoard = [...initialGameBoard.map(arr => [...arr])];
  for (const turn of Turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player
  }

  for (const combination of WINNING_COMBINATIONS) {
    let sym1 = gameBoard[combination[0].row][combination[0].column]
    let sym2 = gameBoard[combination[1].row][combination[1].column]
    let sym3 = gameBoard[combination[2].row][combination[2].column]

    if (sym1 && sym1 === sym2 && sym1 == sym3) {
      winner = Players[sym1];
    }
  }
  const draw = Turns.length === 9 && !winner

  const handleName=(symbol,newName)=> {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player activePlayer={activePlayer} name="player 1" symbol="X" changeName={handleName} active={activePlayer === 'X'} />
          <Player activePlayer={activePlayer} name="player 2" symbol="O" changeName={handleName} active={activePlayer === 'O'} />
        </ol>
        {(winner || draw) && <GameOver reset={resetTurns} winner={winner} />}
        <GameBoard changePlayer={changePlayer} board={gameBoard} />
      </div>
      <Logs turns={Turns} />
    </main>
  )
}

export default App
