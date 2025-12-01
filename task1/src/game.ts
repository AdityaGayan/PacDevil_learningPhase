import Phaser from "phaser";
import gameScene from "./scenes/gameScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    backgroundColor: "#050505ff",

    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },

    scene: [gameScene]
};

const game = new Phaser.Game(config);
(window as any).game = game; // ← ADD THIS

