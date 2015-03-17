RunBlockRun.MainMenu = function(game) 
{
    this.music = null;
    this.menuBackground = null;
    this.playButton = null;
};

RunBlockRun.MainMenu.prototype = 
{
    create: function() 
    {
        this.music = this.add.audio('bg_music', 1, true);
        this.music.play('', 0, 1, true);
        
        this.menuBackground = this.add.sprite(0, 0, 'menu_bg');
        this.playButton = this.add.button(250, 150, 'play', this.startGame, this);
    },
    
    update: function() 
    {
        // Can be used for any main menu effects
    },
    
    startGame: function(pointer) 
    {      
        this.menuBackground.destroy();
        this.playButton.destroy();
        
        this.state.start('Game');
    }
};
