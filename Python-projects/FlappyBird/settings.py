"""
Setting class for the Flappy Bird game.
"""

class Settings:
    def __init__(self):
        # Screen settings
        self.screen_width = 480
        self.screen_height = 750

        # Game settings
        self.fps = 60

        # Ground settings
        self.scale_factor = 1.25
        self.move_speed = 175
        
        # Bird settings
        self.bird_scale_factor = 1.5

        # Pipe settings
        self.pipe_scale_factor = 2
        
        self.pipe_gap = 140
        self.pipe_distance = 100
        self.pipe_speed = self.move_speed

        # Font settings
        self.font ='FlappyBird/assets/font.ttf'
        self.font_size = 40

        """
        The screen is 480 x 750 pixels.
        The ground is 480 x 150 pixels.
    
        screen y: top = 0, ground = 600, bottom = 750
        screen x: left = 0, bird = 350, right = 480    
        """

