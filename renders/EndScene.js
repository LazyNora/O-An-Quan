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
			.text(450, 100, "Game Over  ", { fontSize: "50px", fill: "#AE445A", fontFamily: "Nunito", fontStyle: "italic" })
			.setOrigin(0.5, 0.5);

		let msg1 = "",
			msg2 = "";
		if (this.score1 > this.score2) {
			msg1 = "WIN 🥇";
			msg2 = "LOSE 🐔";
		} else if (this.score1 < this.score2) {
			msg1 = "LOSE 🐔";
			msg2 = "WIN 🥇";
		} else {
			msg1 = "DRAW";
			msg2 = "DRAW";
		}

		if (this.playMode == "single") {
			this.add
				.text(450, 200, "Computer: " + this.score1 + " (" + msg1 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
			this.add
				.text(450, 300, "You: " + this.score2 + " (" + msg2 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
		} else {
			this.add
				.text(450, 200, "Player 2: " + this.score1 + " (" + msg1 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
			this.add
				.text(450, 300, "Player 1: " + this.score2 + " (" + msg2 + ")", {
					fontSize: "30px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);
		}


		let winner = "computer"; // or "player"

		// Determine the message based on the winner
		let message = winner === "computer" ? "Găm ba đê 🦾" : "Congratulations 👏";

		// Display the result message
		const resultText = this.add
			.text(450, 425, message, { fontSize: "35px", fill: "#1B1833", fontFamily: "Nunito" }) // Adjusted position and color
			.setOrigin(0.5, 0.5);

		// Create the rounded rectangle for the "Play again" button
		const backGraphics = this.add.graphics();
		backGraphics.lineStyle(2, 0xAE445A, 1); // Set border color to white and thickness to 2px
		backGraphics.fillStyle(0xAE445A, 1); // Set background color to red
		backGraphics.strokeRoundedRect(350, 485, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		backGraphics.fillRoundedRect(350, 485, 200, 50, 10); // Fill rounded rectangle with border radius 10px

		// Display the "Play again" button
		const playAgainText = this.add
			.text(450, 510, "Play again ◀", { fontSize: "30px", fill: "#FFF", fontFamily: "Nunito" }) // Adjusted position and color
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
