RunBlockRun.Preloader = function(game) 
{
    this.background = null;
    this.preloadBar = null;
};

RunBlockRun.Preloader.prototype = 
{
    preload: function() 
    {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(330, 230, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.image('menu_bg', 'assets/img/menu.png');
        this.load.image('play', 'assets/img/play.png');
        this.load.audio('bg_music', ['assets/audio/bg.mp3', 'assets/audio/bg.ogg']);
        
        this.load.image('player', 'assets/img/blockerMad.png');
        this.load.image('bg', 'assets/img/bg.png');
        this.load.image('win', 'assets/img/win.png');
        this.load.image('tiles_sheet', 'assets/img/tiles_spritesheet.png');
        this.load.tilemap('map_json', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.audio('jump_music', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);
        this.load.audio('win_music', ['assets/audio/win.mp3', 'assets/audio/win.ogg']);
        this.load.audio('lose_music', ['assets/audio/lose.mp3', 'assets/audio/lose.ogg']);
    },
    
    create: function() 
    {
        // Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() 
    {
        // Wait for the background music to finish decoding before displaying the menu
        if (this.cache.isSoundDecoded('bg_music')) 
        {
            this.state.start('MainMenu');
        }
    }
};
