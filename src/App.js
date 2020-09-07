import React from "react";


// Controlled components
// Changed to functional component
function Square(props) {
	 {
		// passing props
		return (
			// remember => {} when working with event handlers.
			<button className='square'
			onClick={props.onClick}>
				{props.value}
			</button>
		);
	
}

class Board extends React.Component {
	// A function of Constructors is used to initialize state
	// super must always be called when defining constructor of a subclass
constructor(props) {
	super (props);
	this.state = {
		squares: Array(9).fill(null),
	};
}

// fucntion that onclick in Square calls
//  Slice preserves immutability, same as assign for objects
//  assign works just like spread on objects
// simplitiy change detection determine rerender (pure components)
handleClick(i) {
	const squares = this.state.squares.slice();
	squares[i] = 'X';
	this.setState({squares: squares})
}

	renderSquare(i) {
		//  making value to be updated by state!
		return <Square value={this.state.squares[i]} 
			onClick={() => this.handleClick(i)}
		/>;
	}

	render() {
		const status = "Next player: X";

		return (
			<div>
				<div className="status">{status}</div>
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
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
			</div>
		);
	}
}

//  ===================


export default Game;