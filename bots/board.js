/**
 * Square class to represent a square in the board.
 */
export class Square {
	/**
	 * Square constructor
	 * @param {number} pos - The position of the square (0-13).
	 * @param {number} val - The value of the square.
	 * @param {boolean} isQuan - Indicates if the square is a Quan.
	 */
	constructor(pos, val, isQuan) {
		/**
		 * @type {number} The position of the square (0-13).
		 */
		this.pos = pos;

		/**
		 * @type {number} The value of the square.
		 */
		this.val = val;

		/**
		 * @type {boolean} Indicates if the square is a Quan.
		 */
		this.isQuan = isQuan;
	}
}

/**
 * State class to represent the state of the board.
 */
export class State {
	/**
	 * State constructor
	 * @param {Square[]} squares - The squares of the board.
	 */
	constructor(squares) {
		/**
		 * @type {Square[]} The squares of the board.
		 */
		this.squares = squares;
	}

	/**
	 * Returns the squares of the board.
	 * @returns {Square[]} The squares of the board.
	 */
	getState() {
		return this.squares;
	}

	/**
	 * Sets the squares of the board.
	 * @param {Square[]} squares - The squares of the board.
	 */
	setState(squares) {
		this.squares = squares;
	}
}

/**
 * Board class to represent the board of the game.
 */
export default class Board {
	/**
	 * Board constructor
	 */
	constructor() {
		/**
		 * @type {Square[]} The squares of the board.
		 */
		this.squares = [];
		/**
		 * @type {State[]} The states of the board.
		 */
		this.states = [];

		for (let i = 1; i < 6; i++) {
			this.squares[i] = new Square(i, 5, false); // Ô 1-5
			this.squares[i + 6] = new Square(i + 6, 5, false); // Ô 7-11
		}

		this.squares[0] = new Square(0, 10, true); // Quan trái
		this.squares[6] = new Square(6, 10, true); // Quan phải
		this.squares[12] = new Square(12, 0, false); // Điểm người chơi 2 || máy
		this.squares[13] = new Square(13, 0, false); // Điểm người chơi 1
	}

	/**
	 * Makes a move on the board.
	 * @param {"left"|"right"} dir - The direction of the move.
	 * @param {number} pos - The position of the move.
	 * @returns {number} The new position after the move.
	 */
	action(dir, pos) {
		if (dir == "left") return this.left(pos);
		else return this.right(pos);
	}

	/**
	 * Eats the squares to the left or right of the move.
	 * @param {"left"|"right"} dir
	 * @param {number} pos - The position of the move.
	 * @returns {number} The score of the eat.
	 */
	eatting(dir, pos) {
		if (dir == "left") return this.eatLeft(pos);
		else return this.eatRight(pos);
	}

	/**
	 * Adapts the squares to the Square class.
	 * @param {Square[]} squares - The squares to adapt.
	 * @returns {Square[]} The adapted squares.
	 */
	adapter(squares) {
		/**
		 * @type {Square[]} The adapted squares.
		 */
		let s = [];
		for (let i = 0; i < squares.length; i++) {
			s[i] = new Square(squares[i].pos, squares[i].val, squares[i].isQuan);
		}
		return s;
	}

	/**
	 * Checks if the square is eatable.
	 * @param {number} pos - The position of the square.
	 * @returns {boolean} True if the square is eatable, false otherwise.
	 */
	isEatable(pos) {
		if (this.squares[pos].val == 0 && (pos != 0 || pos != 6)) return true;
		return false;
	}

	/**
	 * Moves to the left.
	 * @param {number} pos - The position of the move.
	 * @returns {number} The new position after the move.
	 */
	left(pos) {
		let value = this.squares[pos].val;
		this.squares[pos].val = 0;
		let state = new State(this.adapter(this.squares));
		this.states.push(state);

		while (value > 0) {
			pos++;
			if (pos == 12) pos = 0;

			this.squares[pos].val++;
			value--;

			let state2 = new State(this.adapter(this.squares));
			this.states.push(state2);
		}

		pos++;
		if (pos == 12) pos = 0;

		if (this.squares[pos].val != 0 && pos % 6 != 0) return this.left(pos);
		else return pos--;
	}

	/**
	 * Moves to the right.
	 * @param {number} pos - The position of the move.
	 * @returns {number} The new position after the move.
	 */
	right(pos) {
		let value = this.squares[pos].val;
		this.squares[pos].val = 0;
		let state = new State(this.adapter(this.squares));
		this.states.push(state);

		while (value > 0) {
			pos--;
			if (pos == -1) pos = 11;

			this.squares[pos].val++;
			value--;

			let state2 = new State(this.adapter(this.squares));
			this.states.push(state2);
		}

		pos--;
		if (pos == -1) pos = 11;

		if (this.squares[pos].val != 0 && pos % 6 != 0) return this.right(pos);
		else return pos--; //?
	}

	/**
	 * Eats the squares to the left.
	 * @param {number} pos - The position of the move.
	 * @returns {number} The score of the eat.
	 */
	eatLeft(pos) {
		if (this.squares[pos].val == 0 && pos % 6 != 0) {
			pos++;
			if (pos == 12) pos = 0;

			if (this.squares[pos].val > 0) {
				// if (this.squares[pos].val < 5 && (pos == 0 || pos == 6)) return 0;

				let score = this.squares[pos].val;
				this.squares[pos].val = 0;

				let state = new State(this.adapter(this.squares));
				this.states.push(state);

				pos++;
				if (pos == 12) pos = 0;

				if (this.squares[pos].val == 0 && pos % 6 != 0) return score + this.eatLeft(pos);
				else return score;
			}
		}
		return 0;
	}

	/**
	 * Eats the squares to the right.
	 * @param {number} pos - The position of the move.
	 * @returns {number} The score of the eat.
	 */
	eatRight(pos) {
		if (this.squares[pos].val == 0 && pos % 6 != 0) {
			pos--;
			if (pos == -1) pos = 11;

			if (this.squares[pos].val > 0) {
				// if (this.squares[pos].val < 5 && (pos == 0 || pos == 6)) return 0;

				let score = this.squares[pos].val;
				this.squares[pos].val = 0;

				let state = new State(this.adapter(this.squares));
				this.states.push(state);

				pos--;
				if (pos == -1) pos = 11;

				if (this.squares[pos].val == 0 && pos % 6 != 0) return score + this.eatRight(pos);
				else return score;
			}
		}
		return 0;
	}

	/**
	 * Checks if the game is finished.
	 * @returns {boolean} True if the game is finished, false otherwise.
	 */
	finish() {
		if (this.squares[0].val == 0 && this.squares[6].val == 0) return true;

		if (this.squares[12].val == 0) if (this.ktraHetQuan(1)) return true;

		if (this.squares[13].val == 0) if (this.ktraHetQuan(2)) return true;

		return false;
	}

	/**
	 * Checks if the move is valid.
	 * @param {number} pos - The position of the move.
	 * @param {1|2} player - The current player (1 or 2).
	 * @returns {boolean} True if the move is valid, false otherwise.
	 */
	check(pos, player) {
		if (player == 1) {
			if (pos > 6 || pos < 0) return false;

			if (this.squares[pos].val == 0 || pos % 6 == 0) return false;
		} else {
			if (pos < 6 || pos > 11) return false;

			if (this.squares[pos].val == 0 || pos % 6 == 0) return false;
		}

		return true;
	}

	/**
	 * Adds the score to the player.
	 * @param {1|2} player - The current player (1 or 2).
	 * @returns {number} The score of the player.
	 */
	addScore(player) {
		let score = 0;
		if (player == 1) {
			for (let i = 1; i < 6; i++) {
				score += this.squares[i].val;
				this.squares[i].val = 0;
			}
		} else {
			for (let i = 7; i < 12; i++) {
				score += this.squares[i].val;
				this.squares[i].val = 0;
			}
		}
		this.setScorePlayer(player, score);
		return score;
	}

	/**
	 * Checks if the player has no remaining stones.
	 * @param {1|2} player - The current player (1 or 2).
	 * @returns {boolean} True if the player has no squares, false otherwise.
	 */
	ktraHetQuan(player) {
		if (player == 1) {
			let score = 0;
			for (let i = 1; i < 6; i++) {
				score += this.squares[i].val;
			}
			if (score == 0) return true;
		} else {
			let score = 0;
			for (let i = 7; i < 12; i++) {
				score += this.squares[i].val;
			}
			if (score == 0) return true;
		}
		return false;
	}

	/**
	 * Spread the stones of the player.
	 * @param {1|2} player - The current player (1 or 2).
	 * @returns {number} The number of stones spreaded.
	 */
	raiQuan(player) {
		if (player == 1) {
			let score = this.squares[12].val;
			if (score <= 5) {
				for (let i = 1; i <= score; i++) {
					this.squares[i].val++;
				}
				this.squares[12].val = 0;

				let state = new State(this.adapter(this.squares));
				this.states.push(state);
				return score;
			} else {
				for (let i = 1; i < 6; i++) {
					this.squares[i].val++;
				}
				this.squares[12].val -= 5;
				let state = new State(this.adapter(this.squares));
				this.states.push(state);
				return 5;
			}
		} else {
			let score = this.squares[13].val;
			if (score <= 5) {
				for (let i = 7; i <= score; i++) {
					this.squares[i].val++;
				}
				this.squares[13].val = 0;

				let state = new State(this.adapter(this.squares));
				this.states.push(state);
				return score;
			} else {
				for (let i = 7; i < 12; i++) {
					this.squares[i].val++;
				}
				this.squares[13].val -= 5;
				let state = new State(this.adapter(this.squares));
				this.states.push(state);
				return 5;
			}
		}
	}

	/**
	 * Sets the score of the player.
	 * @param {1|2} player - The current player (1 or 2).
	 * @param {number} score - The score of the player.
	 */
	setScorePlayer(player, score) {
		if (player == 1) {
			this.squares[12].val += score;
		} else {
			this.squares[13].val += score;
		}

		let state = new State(this.adapter(this.squares));
		this.states.push(state);
	}

	/**
	 * Returns the squares of the board.
	 * @returns {Square[]} The squares of the board.
	 */
	getSquares() {
		return this.squares;
	}

	/**
	 * Sets the squares of the board.
	 * @param {Square[]} squares - The squares of the board.
	 */
	setSquares(squares) {
		this.squares = squares;
	}

	/**
	 * Returns the states of the board.
	 * @returns {State[]} The states of the board.
	 */
	getStates() {
		return this.states;
	}

	/**
	 * Sets the states of the board.
	 * @param {State[]} states - The states of the board.
	 */
	setStates(states) {
		this.states = states;
	}
}
