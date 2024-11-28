import OCo from "./OCo";
import "./style.css";
import Phaser from "phaser";
import WebFontFile from "./WebFontFile";
import Board from "./board";
import AlphaBeta from "./AlphaBeta";
import Minimax from "./Minimax";

const sizes = {
	width: 900,
	height: 650,
};

class StartScene extends Phaser.Scene {
	constructor() {
		super("StartScene");
	}

	preload() {
		this.load.image("default", "./assets/default.png");
		this.load.image("quanTrai", "./assets/quanTrai.png");
		this.load.image("arrowRight", "./assets/arrowRight.png");
		this.load.image("score", "./assets/score.png");
		this.load.addFile(new WebFontFile(this.load, "Nunito"));
	}

	create() {
		this.Bot = "AlphaBeta";
		this.cameras.main.setBackgroundColor("#ffffff");
		this.add
			.text(450, 100, "Menu", { fontSize: "50px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5);
		const single = this.add
			.text(450, 200, "Single Player", {
				fontSize: "30px",
				fill: "#000",
				fontFamily: "Nunito",
			})
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				single.setVisible(false);
				multi.setVisible(false);
				minimax.setVisible(true);
				alphaBeta.setVisible(true);
				back.setVisible(true);
			});
		const multi = this.add
			.text(450, 300, "Multi Player", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "multi", difficulty: 1 });
			});

		const minimax = this.add
			.text(450, 200, "Minimax", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.Bot = "Minimax";
				minimax.setVisible(false);
				alphaBeta.setVisible(false);
				easy.setVisible(true);
				medium.setVisible(true);
				hard.setVisible(true);
				back.setVisible(true);
			})
			.setVisible(false);

		const alphaBeta = this.add
			.text(450, 300, "AlphaBeta", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.Bot = "AlphaBeta";
				minimax.setVisible(false);
				alphaBeta.setVisible(false);
				easy.setVisible(true);
				medium.setVisible(true);
				hard.setVisible(true);
				back.setVisible(true);
			})
			.setVisible(false);

		const easy = this.add
			.text(450, 200, "Easy", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 1, Bot: this.Bot });
			})
			.setVisible(false);

		const medium = this.add
			.text(450, 300, "Medium", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 2, Bot: this.Bot });
			})
			.setVisible(false);

		const hard = this.add
			.text(450, 400, "Hard", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 3, Bot: this.Bot });
			})
			.setVisible(false);

		const back = this.add
			.text(450, 500, "Back", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				single.setVisible(true);
				multi.setVisible(true);
				minimax.setVisible(false);
				alphaBeta.setVisible(false);
				easy.setVisible(false);
				medium.setVisible(false);
				hard.setVisible(false);
				back.setVisible(false);
			})
			.setVisible(false);
	}

	update(time, delta) { }
}

class EndScene extends Phaser.Scene {
	constructor() {
		super("EndScene");
	}

	init(data) {
		this.score1 = data.score1;
		this.score2 = data.score2;
		this.playMode = data.playMode;
	}

	preload() { }

	create() {
		this.cameras.main.setBackgroundColor("#ffffff");
		this.add
			.text(450, 100, "Game Over", { fontSize: "50px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5);

		let msg1 = "",
			msg2 = "";
		if (this.score1 > this.score2) {
			msg1 = "WIN";
			msg2 = "LOSE";
		} else if (this.score1 < this.score2) {
			msg1 = "LOSE";
			msg2 = "WIN";
		} else {
			msg1 = "DRAW";
			msg2 = "DRAW";
		}

		if (this.playMode == "single") {
			this.add
				.text(450, 200, "Computer: " + this.score1 + "(" + msg1 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
			this.add
				.text(450, 300, "You: " + this.score2 + "(" + msg2 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
		} else {
			this.add
				.text(450, 200, "Player 2: " + this.score1 + "(" + msg1 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
			this.add
				.text(450, 300, "Player 1: " + this.score2 + "(" + msg2 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
		}

		this.add
			.text(450, 500, "Play again", { fontSize: "30px", fill: "#000", fontFamily: "Nunito" })
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("StartScene");
			});
	}

	update(time, delta) { }
}

class GameScene extends Phaser.Scene {
	constructor() {
		super("GameScene");
	}

	updateBanCo(state, ocos) {
		for (let i = 0; i < state.squares.length; i++) {
			ocos[i].setValue(state.squares[i].val);
		}
	}

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

	minimax(board, difficulty, player) {
		let b = new Board();
		b.setSquares(board.getSquares());
		let a = this.Bot_Minimax.calculate(b, difficulty, player);
		return { location: a.bestLocation, dir: a.dir };
	}

	init(data) {
		this.playMode = data.playMode;
		this.difficulty = data.difficulty;
		this.player = 2;
		this.board = new Board();
		this.index = 0;
		this.finish = false;
		this.raiQuan = false;
		this.click = false;
		this.pos = 0;
		this.dir = "left";
		this.drawing = false;
		this.lastRunTime = undefined;
		this.Bot_AlphaBeta = new AlphaBeta();
		this.Bot_Minimax = new Minimax();
		this.Bot = data.Bot || "AlphaBeta";

		console.log("Bot: ", this.Bot);
	}

	preload() { }

	create() {
		this.cameras.main.setBackgroundColor("#ffffff");

		this.add
			.text(10, 10, "Back", { fontSize: "25px", fill: "#000", fontFamily: "Nunito" })
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

	update(time, delta) {
		if (this.board.finish()) {
			if (this.drawing && this.index < this.board.getStates().length) {
				if (this.lastRunTime === undefined) {
					this.lastRunTime = time;
				}

				if (time - this.lastRunTime < 500) {
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

			if (time - this.lastRunTime < 500) {
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
			if (time - this.lastRunTime < 500) {
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
				console.log("location", location, "dir", dir);

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

const config = {
	type: Phaser.CANVAS,
	width: sizes.width,
	height: sizes.height,
	canvas: gameCanvas,
	scene: [StartScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
