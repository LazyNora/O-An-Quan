import Phaser from "phaser";

/**
 * @class EndScene - The scene that shows the final score and the winner of the game.
 */
export default class EndScene extends Phaser.Scene {
	/**
	 * Constructor. Set the key of the scene.
	 */
	constructor() {
		super("EndScene");
	}

	/**
	 * Initialize the scene.
	 * @param {{ score1: number, score2: number, playMode: "single"|"multi" }} data - The data passed from the previous scene.
	 */
	init(data) {
		/**
		 * @type {number} The score of player 1.
		 */
		this.score1 = data.score1;
		/**
		 * @type {number} The score of player 2.
		 */
		this.score2 = data.score2;
		/**
		 * @type {"single"|"multi"} The play mode.
		 */
		this.playMode = data.playMode;
	}

	/**
	 * Preload the assets.
	 */
	preload() {}

	/**
	 * Create the scene. Add the final score and the option to play again.
	 */
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

	/**
	 * Update the scene. Called every frame.
	 */
	update() {}
}
