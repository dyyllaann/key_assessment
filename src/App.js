import React from 'react';
import './App.css';

function App() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [player, setPlayer] = React.useState(1);
  const [gameover, setGameover] = React.useState(false);
  const [snapshot, setSnapshot] = React.useState([]);
  const [message, setMessage] = React.useState(`Round ${snapshot.length + 1}`);

  function Banner() {
    return (
      <div id="banner">
        <div id="players">
          <h1 className={(player === 1) ? 'active' : 'none'}>Player 1</h1>
          <h1 className={(player === 2) ? 'active' : 'none'}>Player 2</h1>
        </div>
        <div id="message">
          <p>
            {message}
          </p>
        </div>
      </div>
    );
  }

  function checkGame(player) {
		const possibleWins = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[6, 4, 2],
		];

    // Check for wins
		for (let wins in possibleWins) {
      const arr1 = JSON.stringify(possibleWins[wins].map((i) => board[i]));
      const arr2 = JSON.stringify([player, player, player]);

      if (arr1 === arr2) {
        setGameover(true)
        setSnapshot([...snapshot, board]);
        return setMessage(`Player ${player} wins!`)
      }
		}

    // Check for tie
    if (board.every((i) => i != null)) {
      setGameover(true);
      setSnapshot([...snapshot, board]);
      return setMessage(`It's a tie!`);
    };

	}

  function getUserInput(element) {
    const newArray = board;
    if (newArray[element] === null && gameover === false) {
      newArray[element] = player;
      setBoard(newArray);
      checkGame(player);
      player === 1 ? setPlayer(2) : setPlayer(1);
    }
	}

  const classMap = {
    1: 'x',
    2: 'o'
  }

  const drawSquare = (i) => {
    return (
			<th
				value={board[i]}
				className= {"square " + classMap[board[i]] }
				onClick={() => getUserInput(i)}
			/>
		);
  }

  function Board() {
		return (
			<table id="gameboard">
				<tbody>
					<tr id="row-1" className="row">
						{drawSquare(0)}
						{drawSquare(1)}
						{drawSquare(2)}
					</tr>
					<tr id="row-2" className="row">
						{drawSquare(3)}
						{drawSquare(4)}
						{drawSquare(5)}
					</tr>
					<tr id="row-3" className="row">
						{drawSquare(6)}
						{drawSquare(7)}
						{drawSquare(8)}
					</tr>
				</tbody>
			</table>
		);
	}

  function reset() {
    setBoard(Array(9).fill(null));
    setMessage(`Round ${snapshot.length + 1}`);
    setGameover(false);
  }

  function PreviousGames() {
    const snapshotItems = snapshot.map((array, index) => 
      <li onClick={() => setBoard(snapshot[index])} key={index} >Game {index + 1}</li>
    )

    return (
      <ul id="previous-games">{snapshotItems}</ul>
    )
  }

  return (
		<div className="App">
			<header className="App-header">
				<Banner />
        <Board />
				<div>
					<button id="reset-btn" onClick={() => reset()}>Reset</button>
				</div>
			</header>
      <div>
        <h4>Previous Games</h4>
        <PreviousGames />
      </div>
		</div>
	);
}

export default App;
