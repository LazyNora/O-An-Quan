import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

/**
 * @class StartScene - The scene that appears when the game starts.
 */
export default class StartScene extends Phaser.Scene {
	/**
	 * Constructor. Set the key of the scene.
	 */
	constructor() {
		super("StartScene");
	}

	/**
	 * Preload the assets.
	 */
	preload() {
		this.load.image("default", "./assets/default.png");
		this.load.image("quanTrai", "./assets/quanTrai.png");
		this.load.image("arrowRight", "./assets/arrowRight.png");
		this.load.image("score", "./assets/score.png");
		this.load.addFile(new WebFontFile(this.load, "Nunito"));
	}

	/**
	 * Create the scene. Add the menu items.
	 */
	create() {
		/**
		 * @type {"Minimax"|"AlphaBeta"} The bot type. Default is "AlphaBeta".
		 */
		this.Bot = "AlphaBeta";
		/**
		 * @type {Phaser.Types.GameObjects.Text.TextStyle} The font style.
		 */
		this.fontStyle = { fontSize: "30px", fill: "#000", fontFamily: "Nunito" };
		this.cameras.main.setBackgroundColor("#ffffff");
		this.add.text(450, 100, "Menu", this.fontStyle).setOrigin(0.5, 0.5);
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
			.text(450, 300, "Multi Player", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "multi", difficulty: 1 });
			});

		const minimax = this.add
			.text(450, 200, "Minimax", this.fontStyle)
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
			.text(450, 300, "AlphaBeta", this.fontStyle)
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
			.text(450, 200, "Easy", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 1, Bot: this.Bot });
			})
			.setVisible(false);

		const medium = this.add
			.text(450, 300, "Medium", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 2, Bot: this.Bot });
			})
			.setVisible(false);

		const hard = this.add
			.text(450, 400, "Hard", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 3, Bot: this.Bot });
			})
			.setVisible(false);

		const back = this.add
			.text(450, 500, "↩ Back", this.fontStyle)
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

	/**
	 * Update the scene. This method is called every frame.
	 */
	update() {}
}
