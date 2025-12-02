import Phaser from "phaser";

export default class gameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private coins!: Phaser.Physics.Arcade.Group;
    private score = 0;
    private highScore = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private highScoreText!: Phaser.GameObjects.Text;

    constructor() {
        super("gameScene");
    }

    preload() {
        this.load.image("tiles", "/tileset.png");
        this.load.tilemapTiledJSON("map", "/map.json");
        this.load.spritesheet("player", "/player.png", {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("coin", "coin.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", "tiles")!;
        const ground = map.createLayer("ground", tileset, 0, 0);
        const walls = map.createLayer("walls", tileset, 0, 0)!;
        walls.setCollisionByExclusion([-1]); 
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player = this.physics.add.sprite(64, 600, "player"); 
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, walls);
        this.cursors = this.input.keyboard!.createCursorKeys();

        this.anims.create({
            key: "walk-down",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "walk-left",
            frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "walk-right",
            frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "walk-up",
            frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.coins = this.physics.add.group();
        const coinPositions = [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
            { x: 400, y: 500 },
            { x: 1100, y: 700 },
            { x: 1200, y: 120 },
        ];
        coinPositions.forEach(pos => {
            const coin = this.coins.create(pos.x, pos.y, "coin");
            coin.play("spin");
        });

        this.physics.add.overlap(this.player, this.coins, this.collectCoin, undefined, this);
        this.highScore = Number(localStorage.getItem("highScore")) || 0;
        this.scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "20px", color: "#fff" }).setScrollFactor(0);
        this.highScoreText = this.add.text(10, 35, `High Score: ${this.highScore}`, { fontSize: "20px", color: "#fff" }).setScrollFactor(0);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    collectCoin = (player: any, coin: any) => {
        coin.destroy();
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", String(this.highScore));
            this.highScoreText.setText(`High Score: ${this.highScore}`);
        }
    };

    update() {
        const speed = 150;
        const cursors = this.cursors;
        const player = this.player;

        player.setVelocity(0);
        if (cursors.left.isDown) {
            player.setVelocityX(-speed);
            player.play("left", true);
            return;
        }
        if (cursors.right.isDown) {
            player.setVelocityX(speed);
            player.play("right", true);
            return;
        }
        if (cursors.up.isDown) {
            player.setVelocityY(-speed);
            player.play("up", true);
            return;
        }
        if (cursors.down.isDown) {
            player.setVelocityY(speed);
            player.play("down", true);
            return;
        }
        player.anims.stop();
    }
}
