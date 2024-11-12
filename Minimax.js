import { Square } from "./board.js";

export default class Minimax {
	calculate(board, depth, player) {
		if (board.ktraHetQuan(player)) {
			// kiểm tra hết quân
			board.raiQuan(player); // rải quân
		}

		let squares = board.getSquares();
		let valueRoot = [];
		for (let i = 0; i < 14; i++) {
			// lưu giá trị các ô ban đầu
			valueRoot[i] = squares[i].val;
		}
		let moves = this.generateMoves(board, player); // List các nước đi có thể đi được

		let bestScore = player == 1 ? -2147483648 : 2147483648; // Player 1: Max, Player 2: Min
		let currentScore;
		let bestLocation = -1;
		let dir = "left";

		if (depth == 0 || board.finish()) {
			// stop condition
			if (board.finish()) {
				board.addScore(1);
				board.addScore(2);
			}
			bestScore = squares[12].val - squares[13].val;
		} else {
			for (let i = 0; i < moves.length; i++) {
				// left and right
				for (let j = 0; j < 2; j++) {
					let action = j == 0 ? "left" : "right";
					let score = 0;
					let location = board.action(action, moves[i]); // thực hiện nước đi
					if (board.isEatable(location)) {
						// kiểm tra có thể ăn được không
						score = board.eatting(action, location); // ăn
					}

					if (player == 1) {
						// max
						board.setScorePlayer(player, score); // cập nhật điểm
						currentScore = this.calculate(board, depth - 1, 2).bestScore; // gọi đệ quy
						if (currentScore > bestScore) {
							bestScore = currentScore;
							bestLocation = moves[i];
							dir = action;
						}
					} else {
						// min
						board.setScorePlayer(player, score); // cập nhật điểm
						currentScore = this.calculate(board, depth - 1, 1).bestScore; // gọi đệ quy
						if (currentScore < bestScore) {
							bestScore = currentScore;
							bestLocation = moves[i];
							dir = action;
						}
					}

					for (let k = 0; k < 14; k++) {
						// reset lại giá trị các ô
						if (k == 0 || k == 6) squares[k] = new Square(k, valueRoot[k], true);
						else squares[k] = new Square(k, valueRoot[k], false);
					}
					board.setSquares(squares);
				}
			}
		}
		return { bestScore, bestLocation, dir };
	}

	generateMoves(board, player) {
		let squares = board.getSquares();
		let result = [];
		if (board.finish()) {
			// kiểm tra kết thúc
			return result;
		}
		// lấy các nước đi có thể đi được
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