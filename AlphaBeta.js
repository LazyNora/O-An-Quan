import { Square } from "./board.js";

export default class AlphaBeta {
	calculate(board, depth, alpha, beta, player) {
		if (board.ktraHetQuan(player)) {
			board.raiQuan(player);
		}

		let squares = board.getSquares();
		let valueRoot = [];
		for (let i = 0; i < 14; i++) {
			valueRoot[i] = squares[i].val;
		}
		let moves = this.generateMoves(board, player);

		let score = 0;
		let bestLocation = -1;
		let dir = "left";

		if (depth == 0 || board.finish()) {
			if (board.finish()) {
				board.addScore(1);
				board.addScore(2);
			}
			score = squares[12].val - squares[13].val;
			console.log("score", score, "bestLocation", bestLocation, "dir", dir);
			return { score, bestLocation, dir };
		} else {
			for (let i = 0; i < moves.length; i++) {
				// left and right
				for (let j = 0; j < 2; j++) {
					let action = j == 0 ? "left" : "right";
					let location = board.action(action, moves[i]);
					if (board.isEatable(location)) {
						let scoreSave = board.eatting(action, location);
						board.setScorePlayer(player, scoreSave);
					}

					if (player == 1) {
						// max
						score = this.calculate(board, depth - 1, alpha, beta, 2).score;
						console.log("score", score, action, location, alpha);
						if (score > alpha) {
							alpha = score;
							bestLocation = moves[i];
							dir = action;
						}
					} else {
						// min
						score = this.calculate(board, depth - 1, alpha, beta, 1).score;
						console.log("score", score, action, location, alpha);
						if (score < beta) {
							beta = score;
							bestLocation = moves[i];
							dir = action;
						}
					}
					console.log(depth, score, alpha, beta, player);

					for (let k = 0; k < 14; k++) {
						if (k == 0 || k == 6) squares[k] = new Square(k, valueRoot[k], true);
						else squares[k] = new Square(k, valueRoot[k], false);
					}
					board.setSquares(squares);
					console.log("board squares", board.getSquares());
				}

				if (alpha >= beta) break;
			}
		}

		return { score: player == 1 ? alpha : beta, bestLocation, dir };
	}

	generateMoves(board, player) {
		let squares = board.getSquares();
		let result = [];
		if (board.finish()) {
			return result;
		}
		if (player == 1) {
			for (let i = 1; i < 6; i++) {
				if (squares[i].val > 0) {
					result.push(squares[i].pos);
				}
			}
		} else {
			for (let i = 7; i < 12; i++) {
				if (squares[i].val > 0) {
					result.push(squares[i].pos);
				}
			}
		}
		return result;
	}
}
