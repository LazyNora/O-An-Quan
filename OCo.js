import Phaser from "phaser";

const boundX = [
	25, 50, 35, 35, 60, 30, 60, 50, 75, 25, 60, 30, 55, 65, 27, 37, 52, 33, 73, 51, 43, 68, 44, 24,
	67, 25, 70, 64, 29, 46, 35, 25, 64, 53, 71, 47, 26, 68, 35, 57, 23, 45, 67, 31, 56, 68, 71, 23,
	46, 33, 56, 78, 34, 48, 67, 52, 29, 45, 69, 51, 48, 33, 74, 39, 26, 57, 48, 58, 72, 64, 45, 56,
];

const boundY = [
	65, 35, 45, 60, 50, 29, 47, 76, 46, 56, 34, 40, 35, 33, 45, 76, 25, 34, 59, 47, 38, 68, 52, 67,
	43, 28, 36, 57, 73, 56, 39, 47, 61, 26, 47, 57, 53, 74, 29, 55, 24, 30, 60, 50, 75, 25, 60, 30,
	55, 65, 27, 37, 52, 33, 73, 51, 43, 68, 44, 24, 67, 25, 70, 64, 29, 46, 35, 25, 64, 46, 33, 56,
	78, 34, 48, 67, 52, 29,
];

export default class OCo extends Phaser.GameObjects.Container {
	constructor(scene, x, y, value, pos, isQuan, callbackLeft = null, callbackRight = null) {
		super(scene, x, y);

		this.pos = pos;
		this.isQuan = isQuan;
		this.value = value;

		if (isQuan) {
			this.square = scene.add.image(0, 0, "quanTrai").setOrigin(0, 0);
			this.valueText = scene.add
				.text(50, 100, value, {
					fontSize: "40px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);

			if (pos == 6) {
				this.square.setFlipX(true);
			}

			this.add(this.square);
			this.add(this.valueText);

			this.setSize(this.square.width, this.square.height);
		} else if (pos == 12 || pos == 13) {
			this.square = scene.add.image(0, 0, "score").setOrigin(0, 0);
			this.valueText = scene.add
				.text(50, 50, value, {
					fontSize: "40px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);

			this.add(this.square);
			this.add(this.valueText);
		} else {
			this.arrowRight = scene.add.image(45, 65, "arrowRight").setOrigin(0, 0).setVisible(false);
			this.arrowLeft = scene.add
				.image(5, 65, "arrowRight")
				.setOrigin(0, 0)
				.setFlipX(true)
				.setVisible(false);
			this.square = scene.add.image(0, 0, "default").setOrigin(0, 0);
			this.valueText = scene.add
				.text(50, 50, value, {
					fontSize: "40px",
					fill: "#000",
					fontFamily: "Nunito",
				})
				.setOrigin(0.5, 0.5);

			this.add(this.arrowRight);
			this.add(this.arrowLeft);
			this.add(this.square);
			this.add(this.valueText);

			this.setSize(this.square.width, this.square.height);

			this.setInteractive(
				new Phaser.Geom.Rectangle(50, 50, this.width, this.height),
				Phaser.Geom.Rectangle.Contains
			);
			this.on("pointerover", () => {
				if (this.value == 0) return;
				this.arrowRight.setVisible(true);
				this.arrowLeft.setVisible(true);
			});
			this.on("pointerout", () => {
				this.arrowRight.setVisible(false);
				this.arrowLeft.setVisible(false);
			});

			this.callbackLeft = callbackLeft;
			this.callbackRight = callbackRight;

			this.arrowLeft.setInteractive({ useHandCursor: true });
			this.arrowRight.setInteractive({ useHandCursor: true });

			this.arrowLeft.on("pointerover", () => {
				if (this.value == 0) return;
				this.arrowLeft.setVisible(true);
			});

			this.arrowLeft.on("pointerout", () => {
				this.arrowLeft.setVisible(false);
			});

			this.arrowRight.on("pointerover", () => {
				if (this.value == 0) return;
				this.arrowRight.setVisible(true);
			});

			this.arrowRight.on("pointerout", () => {
				this.arrowRight.setVisible(false);
			});

			this.arrowLeft.on("pointerdown", () => {
				if (this.value == 0) return;
				this.disableInteractive();
				this.arrowLeft.setVisible(false);
				this.delegateCallback("left");
			});

			this.arrowRight.on("pointerdown", () => {
				if (this.value == 0) return;
				this.disableInteractive();
				this.arrowRight.setVisible(false);
				this.delegateCallback("right");
			});
		}
	}

	setValue(value) {
		this.value = value;
		this.valueText.setText(value);
	}

	delegateCallback(dir) {
		if (dir == "left") {
			this.callbackLeft();
		} else {
			this.callbackRight();
		}
	}
}
