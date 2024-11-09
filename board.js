export class Square {
	constructor(pos, val, isQuan) {
		this.pos = pos;
		this.val = val;
		this.isQuan = isQuan;
	}
}

export class State {
	constructor(squares) {
		this.squares = squares;
	}

	getState() {
		return this.squares;
	}

	setState(squares) {
		this.squares = squares;
	}
}

export default class Board {
	constructor() {
		this.squares = [];
		this.states = [];

		for (let i = 1; i < 6; i++) {
			this.squares[i] = new Square(i, 5, false);
			this.squares[i + 6] = new Square(i + 6, 5, false);
		}

		this.squares[0] = new Square(0, 10, true);
		this.squares[6] = new Square(6, 10, true);
		this.squares[12] = new Square(12, 0, false);
		this.squares[13] = new Square(13, 0, false);
	}

	action(dir, pos) {
		if (dir == "left") return this.left(pos);
		else return this.right(pos);
	}

	eatting(dir, pos) {
		if (dir == "left") return this.eatLeft(pos);
		else return this.eatRight(pos);
	}

	adapter(squares) {
		let s = [];
		for (let i = 0; i < squares.length; i++) {
			s[i] = new Square(squares[i].pos, squares[i].val, squares[i].isQuan);
		}
		return s;
	}

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

	isEatable(pos) {
		if (this.squares[pos].val == 0 && (pos != 0 || pos != 6)) return true;
		return false;
	}

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

	finish() {
		if (this.squares[0].val == 0 && this.squares[6].val == 0) return true;

		if (this.squares[12].val == 0) if (this.ktraHetQuan(1)) return true;

		if (this.squares[13].val == 0) if (this.ktraHetQuan(2)) return true;

		return false;
	}

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

	setScorePlayer(player, score) {
		if (player == 1) {
			this.squares[12].val += score;
		} else {
			this.squares[13].val += score;
		}

		let state = new State(this.adapter(this.squares));
		this.states.push(state);
	}

	getSquares() {
		return this.squares;
	}

	setSquares(squares) {
		this.squares = squares;
	}

	getStates() {
		return this.states;
	}

	setStates(states) {
		this.states = states;
	}
}
