import { Square } from "./board.js";

export default class AlphaBeta {
	calculate(board, depth, alpha, beta, player) {
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

		let score = 0;
		let bestLocation = -1;
		let dir = "left";

		if (depth == 0 || board.finish()) {
			// stop condition
			if (board.finish()) {
				board.addScore(1);
				board.addScore(2);
			}
			score = squares[12].val - squares[13].val;
			return { score, bestLocation, dir }; // trả về điểm
		} else {
			for (let i = 0; i < moves.length; i++) {
				// left and right
				for (let j = 0; j < 2; j++) {
					let action = j == 0 ? "left" : "right";
					let location = board.action(action, moves[i]); // thực hiện nước đi
					if (board.isEatable(location)) {
						// kiểm tra có thể ăn được không
						let scoreSave = board.eatting(action, location); // ăn
						board.setScorePlayer(player, scoreSave); // cập nhật điểm
					}

					if (player == 1) {
						// max
						score = this.calculate(board, depth - 1, alpha, beta, 2).score; // gọi đệ quy
						if (score > alpha) {
							// cập nhật alpha
							alpha = score;
							bestLocation = moves[i];
							dir = action;
						}
					} else {
						// min
						score = this.calculate(board, depth - 1, alpha, beta, 1).score; // gọi đệ quy
						if (score < beta) {
							// cập nhật beta
							beta = score;
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

				if (alpha >= beta) break; // cắt tỉa
			}
		}

		return { score: player == 1 ? alpha : beta, bestLocation, dir }; // trả về giá trị tốt nhất
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
