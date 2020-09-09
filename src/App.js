//  In react, it is safer not to mutate data structures.
import React from "react";

// Controlled components
// Changed to functional component
function Square(props) {
	// passing props
	return (
		// remember => {} when working with event handlers.
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		//  making value to be updated by state!
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
				{/* <div className="status">{status}</div> */}
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	// A function of Constructors is used to initialize state
	// super must always be called when defining constructor of a subclass

	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			xIsNext: true,
			stepNumber: 0
		};
	}

	// fucntion that onclick in Square calls
	//  Slice preserves immutability, same as assign for objects
	//  assign works just like spread on objects
	// simplitiy change detection determine rerender (pure components)
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] =
			this.state.xIsNext ? "X" :
			"O";
		this.setState({
			squares: squares,
			history: history.concat([
				{
					squares: squares
				}
			]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}
	// Handles time travel of moves
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		// showing past moves as buttons
		const moves = history.map((step, move) => {
			const desc =
				move ? `Go to move #${move}` :
				"Go to game start";
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = `Winner ${winner}`;
		}
		else {
			status = `Next Player ${
				this.state.xIsNext ? "X" :
				"O"}`;
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
					{/* add new element for moves */}
					<div className="game-info">
						<div>{status}</div>
						<ol>{moves}</ol>
					</div>
				</div>
			</div>
		);
	}
}

//  ===================

// helper function for tic-tac-toe winner
function calculateWinner(squares) {
	const lines = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];
	for (let i = 0; i < lines.length; i++) {
		const [ a, b, c ] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export default Game;
