var RunBlockRun = {};

RunBlockRun.Boot = function(game) 
{
};

RunBlockRun.Boot.prototype = 
{
    init: function() 
    {
        // Specify max number of pointers used in the game (more than one is useful for touch)
        this.input.maxPointers = 1;
        
        // Phaser will automatically pause if the browser tab the game is in loses focus. To disable, set to true
         this.stage.disableVisibilityChange = false;
    },
    
    preload: function() {
        // Load any needed preloader assets
        this.load.image('preloaderBackground', 'assets/img/loadingbg.png');
        this.load.image('preloaderBar', 'assets/img/loading.png');
    },
    
    create: function() {
        this.state.start('Preloader');
    }
};
