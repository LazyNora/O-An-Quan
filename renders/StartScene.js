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

	
		const menu = this.add.text(450, 100, "MENU ", {
			...this.fontStyle,
			fontSize: '50px',
			fontWeight: 'bold',
			fontStyle: 'italic',
			fill: "#AE445A"
		}).setOrigin(0.5, 0.5).setVisible(true);

		const algorithm = this.add.text(450, 100, "ALGOTHIRMS", {
			...this.fontStyle,
			fontSize: '50px',
			fontWeight: 'bold',
			fontStyle: 'italic',
			fill: "#AE445A"
		}).setOrigin(0.5, 0.5).setVisible(false);


		const level = this.add.text(450, 100, "LEVEL", {
			...this.fontStyle,
			fontSize: '50px',
			fontWeight: 'bold',
			fontStyle: 'italic',
			fill: "#AE445A"
		}).setOrigin(0.5, 0.5).setVisible(false);


		const singleGraphics = this.add.graphics();
		singleGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		singleGraphics.fillStyle(0x3DD1E7, 1); // Set background color to red
		singleGraphics.strokeRoundedRect(350, 185, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		singleGraphics.fillRoundedRect(350, 185, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		singleGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const single = this.add
			.text(450, 206, "Single player", {
				fontSize: "30px",
				fill: "#000",
				fontFamily: "Nunito",
				fontWeight: '700',
				align: 'center',
			})
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				single.setVisible(false);
				multi.setVisible(false);
				minimax.setVisible(true).setAlpha(1); // Set minimax to visible and fully opaque
				alphaBeta.setVisible(true).setAlpha(0.5); // Set alphaBeta to visible and semi-transparent
				back.setVisible(true); // Show the back button
				backGraphics.setAlpha(1); // Show the back button background
				intro.setVisible(false);
				heart.setVisible(false);
				algorithm.setVisible(true); // Show "Thuật toán"
				menu.setVisible(false); // Hide "Menu"
				level.setVisible(false);
			})
			.on("pointerover", () => {
				this.tweens.add({
					targets: singleGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2',
					onComplete: () => {
						singleGraphics.setVisible(true); // Ensure visibility is set to true after fade-in
					}
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: singleGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2',
					onComplete: () => {
						singleGraphics.setVisible(false); // Ensure visibility is set to false after fade-out
					}
				});
			});

		const multiGraphics = this.add.graphics();
		multiGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		multiGraphics.fillStyle(0x3DD1E7, 1); // Set background color to red
		multiGraphics.strokeRoundedRect(350, 280, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		multiGraphics.fillRoundedRect(350, 280, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		multiGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const multi = this.add
			.text(450, 305, "Multi player", {
				fontSize: "30px",
				fill: "#000",
				fontFamily: "Nunito",
				fontWeight: '700',
				align: 'center',
			})
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				intro.setVisible(false);
				this.scene.start("GameScene", { playMode: "multi", difficulty: 1 });
			})
			.on("pointerover", () => {
				this.tweens.add({
					targets: multiGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2'
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: multiGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2'
				});
			});

		const intro = this.add.text(450, 400, "Chơi nhiều sẽ hay! Enjoy ", {
			fontFamily: 'Nunito',
			fontSize: '40px',
			color: 'red',
			fontStyle: 'italic',
			fill:"#AE445A"
		}).setOrigin(0.5, 0.5);

		const heart = this.add.text(700, 400, "❤  ", {
			fontFamily: 'Nunito',
			fontSize: '40px',
			color: 'red',
			fontStyle: 'italic',
			fill: "#AE445A"

		}).setOrigin(0.5, 0.5);

		const minimaxGraphics = this.add.graphics();
		minimaxGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		minimaxGraphics.fillStyle(0x3DD1E7, 1); // Set background color to red
		minimaxGraphics.strokeRoundedRect(350, 185, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		minimaxGraphics.fillRoundedRect(350, 185, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		minimaxGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const minimax = this.add
			.text(450, 207, "Minimax", this.fontStyle)
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
				level.setVisible(true);
				algorithm.setVisible(false);
			})
			.on("pointerover", () => {
				this.tweens.add({
					targets: minimaxGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2'
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: minimaxGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2'
				});
			})
			.setVisible(false);

		const alphaBetaGraphics = this.add.graphics();
		alphaBetaGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		alphaBetaGraphics.fillStyle(0x3DD1E7, 1); // Set background color 
		alphaBetaGraphics.strokeRoundedRect(350, 280, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		alphaBetaGraphics.fillRoundedRect(350, 280, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		alphaBetaGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const alphaBeta = this.add
			.text(450, 305, "AlphaBeta", {
				...this.fontStyle,
				fontWeight: 'bold' // Add fontWeight to the font style
			})
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
			.on("pointerover", () => {
				this.tweens.add({
					targets: alphaBetaGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2'
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: alphaBetaGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2'
				});
			})
			.setVisible(false);

		const easyGraphics = this.add.graphics();
		easyGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		easyGraphics.fillStyle(0x3DD1E7, 1); // Set background color to red
		easyGraphics.strokeRoundedRect(350, 185, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		easyGraphics.fillRoundedRect(350, 185, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		easyGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const easy = this.add
			.text(450, 208, "Easy", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 1, Bot: this.Bot });
			})
			.on("pointerover", () => {
				this.tweens.add({
					targets: easyGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2'
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: easyGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2'
				});
			})
			.setVisible(false);

		const mediumGraphics = this.add.graphics();
		mediumGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		mediumGraphics.fillStyle(0x3DD1E7, 1); // Set background color to red
		mediumGraphics.strokeRoundedRect(350, 285, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		mediumGraphics.fillRoundedRect(350, 285, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		mediumGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const medium = this.add
			.text(450, 308, "Medium", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 2, Bot: this.Bot });
			})
			.on("pointerover", () => {
				this.tweens.add({
					targets: mediumGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2'
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: mediumGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2'
				});
			})
			.setVisible(false);

		const hardGraphics = this.add.graphics();
		hardGraphics.lineStyle(2, 0x000000, 1); // Set border color to black and thickness to 2px
		hardGraphics.fillStyle(0x3DD1E7, 1); // Set background color to red
		hardGraphics.strokeRoundedRect(350, 385, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		hardGraphics.fillRoundedRect(350, 385, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		hardGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const hard = this.add
			.text(450, 408, "Hard", this.fontStyle)
			.setOrigin(0.5, 0.5)
			.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => {
				this.scene.start("GameScene", { playMode: "single", difficulty: 3, Bot: this.Bot });
			})
			.on("pointerover", () => {
				this.tweens.add({
					targets: hardGraphics,
					alpha: 1,
					duration: 500, // Duration of the fade-in effect in milliseconds
					ease: 'Power2'
				});
			})
			.on("pointerout", () => {
				this.tweens.add({
					targets: hardGraphics,
					alpha: 0,
					duration: 500, // Duration of the fade-out effect in milliseconds
					ease: 'Power2'
				});
			})
			.setVisible(false);

		const backGraphics = this.add.graphics();
		backGraphics.lineStyle(2, 0xAE445A, 1); // Set border color to white and thickness to 2px
		backGraphics.fillStyle(0xAE445A, 1); // Set background color to red
		backGraphics.strokeRoundedRect(350, 485, 200, 50, 10); // Draw rounded rectangle border with border radius 10px
		backGraphics.fillRoundedRect(350, 485, 200, 50, 10); // Fill rounded rectangle with border radius 10px
		backGraphics.setAlpha(0); // Initially hide the border by setting alpha to 0

		const back = this.add
			.text(450, 507, "↩ Back", {
				...this.fontStyle,
				fill: "#FFFFFF" // Set text color to white
			})
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
				backGraphics.setAlpha(0); // Hide the back button background
				intro.setVisible(true);
				heart.setVisible(true);
				algorithm.setVisible(false); // Hide "Thuật toán"
				menu.setVisible(true); // Show "Menu"
				level.setVisible(false);
				
			})
			.setVisible(false); // Initially hide the text


	}

	/**
	 * Update the scene. This method is called every frame.
	 */
	update() { }
}
