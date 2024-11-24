import Phaser from "phaser";
import Board, { State } from "../bots/board";
import OCo from "./OCo";
import AlphaBeta from "../bots/AlphaBeta";
import Minimax from "../bots/Minimax";

/**
 * @class GameScene - The scene that shows the game board and the game logic.
 */
export default class GameScene extends Phaser.Scene {
	/**
	 * Constructor. Set the key of the scene.
	 */
	constructor() {
		super("GameScene");
	}

	/**
	 * Update the game state.
	 * @param {State} state - The game state.
	 * @param {OCo[]} ocos - The squares in the game.
	 */
	updateBanCo(state, ocos) {
		for (let i = 0; i < state.squares.length; i++) {
			ocos[i].setValue(state.squares[i].val);
		}
	}

	/**
	 * Calculate the best move for a player using the AlphaBeta algorithm.
	 * @param {Board} board - The game board.
	 * @param {number} difficulty - The difficulty of the game.
	 * @param {number} alpha - The alpha value.
	 * @param {number} beta - The beta value.
	 * @param {1|2} player - The current player (1 for Max, 2 for Min).
	 * @returns {{ location: number, dir: "left"|"right" }} An object containing the best location and direction of the move.
	 */
	alphaBeta(board, difficulty, alpha, beta, player) {
		let b = new Board();
		b.setSquares(board.getSquares());
		let max = -2147483648;
		let location = -1;
		let dir = "left";
		let a = this.Bot_AlphaBeta.calculate(b, difficulty, alpha, beta, player);
		if (a.score > max) {
			max = a.score;
			location = a.bestLocation;
			dir = a.dir;
		}
		return { location, dir };
	}

	/**
	 * Calculate the best move for a player using the Minimax algorithm.
	 * @param {Board} board - The game board.
	 * @param {number} difficulty - The difficulty of the game.
	 * @param {1|2} player - The current player (1 for Max, 2 for Min).
	 * @returns {{ location: number, dir: "left"|"right" }} An object containing the best location and direction of the move.
	 */
	minimax(board, difficulty, player) {
		let b = new Board();
		b.setSquares(board.getSquares());
		let a = this.Bot_Minimax.calculate(b, difficulty, player);
		return { location: a.bestLocation, dir: a.dir };
	}

	/**
	 * Initialize the game.
	 * @param {{ playMode: "single"|"multi", difficulty: 1|2|3, Bot: "AlphaBeta"|"Minimax" }} data - The data of the game.
	 */
	init(data) {
		/**
		 * @type {"single"|"multi"} - The play mode of the game.
		 */
		this.playMode = data.playMode;
		/**
		 * @type {1|2|3} - The difficulty of the game.
		 */
		this.difficulty = data.difficulty;
		/**
		 * @type {1|2} - The current player.
		 */
		this.player = 2;
		/**
		 * @type {Board} - The game board.
		 */
		this.board = new Board();
		/**
		 * @type {number} - The index of the game state.
		 */
		this.index = 0;
		/**
		 * @type {boolean} - The flag to check if the game is finished.
		 */
		this.finish = false;
		/**
		 * @type {boolean} - The flag to check if the stones are being spread.
		 */
		this.raiQuan = false;
		/**
		 * @type {boolean} - The flag to check if the player has clicked.
		 */
		this.click = false;
		/**
		 * @type {number} - The position of the square.
		 */
		this.pos = 0;
		/**
		 * @type {"left"|"right"} - The direction of the move.
		 */
		this.dir = "left";
		/**
		 * @type {boolean} - The flag to check if the game is being drawn.
		 */
		this.drawing = false;
		/**
		 * @type {number} - The last run time.
		 */
		this.lastRunTime = undefined;
		/**
		 * @type {AlphaBeta} - The AlphaBeta bot.
		 */
		this.Bot_AlphaBeta = new AlphaBeta();
		/**
		 * @type {Minimax} - The Minimax bot.
		 */
		this.Bot_Minimax = new Minimax();
		/**
		 * @type {"AlphaBeta"|"Minimax"} - The bot to play against.
		 */
		this.Bot = data.Bot || "AlphaBeta";
		/**
		 * @type {OCo[]} - The array of OCo objects to render the game board.
		 */
		this.ocos = [];
		/**
		 * @type {number} - The step time of the game.
		 */
		this.stepTime = 500;
	}

	/**
	 * Preload the assets.
	 */
	preload() {}

	/**
	 * Create the game scene. Add the game board and the game logic.
	 */
	create() {
		this.cameras.main.setBackgroundColor("#ffffff");

		this.add
			.text(10, 10, "↩ Back", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("StartScene");
			});

		this.add
			.text(
				890,
				10,
				this.playMode == "single"
					? "Single (" +
							(this.difficulty == 1 ? "Easy" : this.difficulty == 2 ? "Medium" : "Hard") +
							", " +
							this.Bot +
							")"
					: "Multi",
				{ fontSize: "25px", fill: "#000", fontFamily: "Nunito" }
			)
			.setOrigin(1, 0);

		this.ocos = [];
		for (let i = 1; i < 6; i++) {
			this.ocos[i] = new OCo(
				this,
				i * 100 + 100,
				100 * 2,
				5,
				i,
				false,
				() => {
					this.pos = i;
					this.dir = "right";
					this.click = true;
				},
				() => {
					this.pos = i;
					this.dir = "left";
					this.click = true;
				}
			);
		}
		for (let i = 7; i < 12; i++) {
			this.ocos[i] = new OCo(
				this,
				(12 - i) * 100 + 100,
				100 * 3,
				5,
				i,
				false,
				() => {
					this.pos = i;
					this.dir = "left";
					this.click = true;
				},
				() => {
					this.pos = i;
					this.dir = "right";
					this.click = true;
				}
			);
		}

		this.ocos[0] = new OCo(this, 100, 100 * 2, 10, 0, true, null, null);
		this.ocos[6] = new OCo(this, 100 * 6 + 100, 100 * 2, 10, 6, true, null, null);
		this.ocos[12] = new OCo(this, 100 * 3 + 100, 50, 0, 12, false, null, null);
		this.ocos[13] = new OCo(this, 100 * 3 + 100, 50 + 100 * 4, 0, 13, false, null, null);

		this.ocos.forEach((oco) => {
			this.add.existing(oco);
		});

		if (this.playMode == "single") {
			this.add
				.text(450, 30, "Computer", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
				.setOrigin(0.5, 0.5);
			this.add
				.text(450, 570, "You", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
				.setOrigin(0.5, 0.5);

			for (let i = 1; i < 6; i++) {
				this.ocos[i].disableInteractive();
			}
		} else {
			this.add
				.text(450, 30, "Player 2", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
				.setOrigin(0.5, 0.5);
			this.add
				.text(450, 560, "Player 1", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
				.setOrigin(0.5, 0.5);
		}

		this.msg1 = this.add
			.text(450, 160, "", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5);
		this.msg2 = this.add
			.text(450, 430, "", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5);
	}

	/**
	 * Update the game state. If the game is finished, show the end scene.
	 * @param {number} time - The current time.
	 * @param {number} delta - The delta time.
	 * @returns {void}
	 */
	update(time, delta) {
		if (this.board.finish()) {
			if (this.drawing && this.index < this.board.getStates().length) {
				if (this.lastRunTime === undefined) {
					this.lastRunTime = time;
				}

				if (time - this.lastRunTime < this.stepTime) {
					return;
				}

				this.updateBanCo(this.board.getStates()[this.index], this.ocos);
				this.index++;
				this.lastRunTime = time;
				this.ocos.forEach((oco) => {
					oco.disableInteractive();
				});
				return;
			}

			this.drawing = false;

			if (this.finish) return;
			this.index = 0;
			this.board.setStates([]);

			this.board.addScore(1);
			this.board.addScore(2);
			this.updateBanCo(this.board.getStates()[this.index], this.ocos);
			this.index++;

			this.finish = true;

			this.scene.start("EndScene", {
				score1: this.board.getSquares()[12].val,
				score2: this.board.getSquares()[13].val,
				playMode: this.playMode,
			});
			return;
		}

		if (this.drawing && this.index < this.board.getStates().length) {
			if (this.lastRunTime === undefined) {
				this.lastRunTime = time;
			}

			if (time - this.lastRunTime < this.stepTime) {
				return;
			}

			this.updateBanCo(this.board.getStates()[this.index], this.ocos);
			this.index++;
			this.lastRunTime = time;
			this.ocos.forEach((oco) => {
				oco.disableInteractive();
			});
			return;
		}

		if (this.raiQuan) {
			if (this.playMode == "single") {
				if (this.player == 1) {
					this.msg1.setText("Computer rải quân");
					this.msg2.setText("");
				} else {
					this.msg1.setText("");
					this.msg2.setText("Bạn rải quân");
				}
			} else {
				if (this.player == 1) {
					this.msg1.setText("Player 2 rải quân");
					this.msg2.setText("");
				} else {
					this.msg1.setText("");
					this.msg2.setText("Player 1 rải quân");
				}
			}
			this.lastRunTime = time;
		} else {
			if (time - this.lastRunTime < this.stepTime) {
				return;
			}

			if (this.playMode == "single") {
				if (this.player == 1) {
					this.msg1.setText("Lượt của máy");
					this.msg2.setText("");
				} else {
					this.msg1.setText("");
					this.msg2.setText("Lượt của bạn");
				}
			} else {
				if (this.player == 1) {
					this.msg1.setText("Lượt của Player 2");
					this.msg2.setText("");
				} else {
					this.msg2.setText("Lượt của Player 1");
					this.msg1.setText("");
				}
			}
		}

		this.drawing = false;
		this.raiQuan = false;

		if (this.playMode == "single") {
			if (this.player == 1) {
				for (let i = 7; i < 12; i++) {
					this.ocos[i].disableInteractive();
				}
			} else {
				for (let i = 7; i < 12; i++) {
					this.ocos[i].setInteractive();
				}
			}
		} else {
			if (this.player == 1) {
				for (let i = 1; i < 6; i++) {
					this.ocos[i].setInteractive();
					this.ocos[i + 6].disableInteractive();
				}
			} else {
				for (let i = 1; i < 6; i++) {
					this.ocos[i].disableInteractive();
					this.ocos[i + 6].setInteractive();
				}
			}
		}

		this.index = 0;
		this.board.setStates([]);

		if (this.board.ktraHetQuan(this.player)) {
			this.board.raiQuan(this.player);
			this.raiQuan = true;
			this.updateBanCo(this.board.getStates()[this.index], this.ocos);
			return;
		}

		this.board.setStates([]);
		if (this.playMode == "single") {
			if (this.player == 1) {
				let location, dir;
				if (this.Bot == "AlphaBeta") {
					let a = this.alphaBeta(this.board, this.difficulty, -2147483648, 2147483648, this.player);
					location = a.location;
					dir = a.dir;
				} else {
					let a = this.minimax(this.board, this.difficulty, this.player);
					location = a.location;
					dir = a.dir;
				}
				//console.log("location", location, "dir", dir);

				let score = 0;
				if (dir == "left") {
					score = this.board.eatLeft(this.board.left(location));
				} else {
					score = this.board.eatRight(this.board.right(location));
				}
				this.board.setScorePlayer(this.player, score);
				this.player = 3 - this.player;
				this.drawing = true;
			} else {
				if (this.click) {
					this.click = false;
					let score = 0;
					if (this.dir == "left") {
						score = this.board.eatLeft(this.board.left(this.pos));
					} else {
						score = this.board.eatRight(this.board.right(this.pos));
					}
					this.board.setScorePlayer(this.player, score);
					this.player = 3 - this.player;
					this.drawing = true;
				}
			}
		} else {
			if (this.click) {
				this.click = false;
				let score = 0;
				if (this.dir == "left") {
					score = this.board.eatLeft(this.board.left(this.pos));
				} else {
					score = this.board.eatRight(this.board.right(this.pos));
				}
				this.board.setScorePlayer(this.player, score);
				this.player = 3 - this.player;
				this.drawing = true;
			}
		}
	}
}
