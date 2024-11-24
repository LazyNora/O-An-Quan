import EndScene from "./renders/EndScene";
import GameScene from "./renders/GameScene";
import StartScene from "./renders/StartScene";
import "./style.css";
import Phaser from "phaser";

const sizes = {
	width: 900,
	height: 650,
};

const config = {
	type: Phaser.CANVAS,
	width: sizes.width,
	height: sizes.height,
	canvas: gameCanvas,
	scene: [StartScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
