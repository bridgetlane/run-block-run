RunBlockRun.Game = function(game) 
{
    // Automatic Phaser State properties
    this.game;                          // a reference to the currently running game (Phaser.Game)
    this.add;                           // used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;                        // a reference to the game camera (Phaser.Camera)
    this.cache;                         // the game cache (Phaser.Cache)
    this.input;                         // the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;                          // for preloading assets (Phaser.Loader)
    this.math;                          // lots of useful common math operations (Phaser.Math)
    this.sound;                         // the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;                         // the game stage (Phaser.Stage)
    this.time;                          // the clock (Phaser.Time)
    this.tweens;                        // the tween manager (Phaser.TweenManager)
    this.state;                         // the state manager (Phaser.StateManager)
    this.world;                         // the game world (Phaser.World)
    this.particles;                     // the particle manager (Phaser.Particles)
    this.physics;                       // the physics manager (Phaser.Physics)
    this.rnd;                           // the repeatable random number generator (Phaser.RandomDataGenerator)
    
    // Game State properties
    this.player;
    this.map;
    this.ground;
    this.jumpTimer = 0;
    this.jumpButton;
    this.speed = 200;
    this.jumpMusic;
    this.winMusic;
    this.loseMusic;
};

RunBlockRun.Game.prototype = 
{
    create: function() 
    {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 700;
        
        this.add.tileSprite(0, 0, 8000, 704, 'bg');
        this.map = this.add.tilemap('map_json');
        this.map.addTilesetImage('tiles_spritesheet', 'tiles_sheet');
        this.ground = this.map.createLayer("Tile Layer 1");
        this.ground.resizeWorld();
        this.map.setCollision(104);     // grass
        this.map.setCollision(4);       // stone blocks
        this.map.setCollision(33);      // ending signifier
        
        this.player = this.add.sprite(30, 500, 'player');
        this.player.anchor.set(0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;       
        this.camera.follow(this.player);
        
        this.player.body.velocity.x = this.speed;
        
        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpTimer = 0;
        
        this.jumpMusic = this.add.audio('jump_music');
        this.winMusic = this.add.audio('win_music');
        this.loseMusic = this.add.audio('lose_music');
    },
    
    handleCollision: function(player, tile)
    {
        if (tile.index === 4)           // hit the stone blocks: you lose
        {
            this.loseMusic.play();
            this.resetGame();
        }
        else if (tile.index === 33)     // reached the end: you win!
        {
            this.winMusic.play();
            var win = this.add.sprite(0, 0, 'win');
            win.fixedToCamera = true;
            this.player.kill();
        }
    },
    
    update: function() 
    {
        this.game.physics.arcade.overlap(this.player, this.ground, this.handleCollision, null, this);

        // jump controls
        if ((this.jumpButton.isDown && this.player.body.onFloor()) 
                || (this.jumpButton.isDown && (this.time.now > this.jumpTimer)))
        {
            this.jumpMusic.play();
            this.speed = this.speed + 5;
            this.player.body.velocity.x = this.speed;
            this.player.body.velocity.y = -800;
            this.jumpTimer = this.time.now + 2500;
        }
    },
    
    resetGame: function() 
    {
        this.player.body.x = 30;        // position reset
        this.player.body.y = 500;
        
        this.speed = 200;               // acceleration reset
        this.player.body.velocity.x = this.speed;
        
        this.jumpTimer = 0;             // jumpTimer reset
    }
};
