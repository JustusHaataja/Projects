"""
Ground class for Flappy Bird game
"""
import pygame

class Ground:
    def __init__(self, fb_game):

        self.fb_game = fb_game
        self.settings = fb_game.settings
        self.screen = fb_game.screen

        # Load the background and ground images
        # Check the path to the bg.png and ground.png files
        self.background_img = pygame.transform.scale_by(
            pygame.image.load('FlappyBird/assets/bg.png').convert(),
            self.settings.scale_factor
            )
        
        self.ground1_img = pygame.transform.scale_by(
            pygame.image.load('FlappyBird/assets/ground.png').convert(),
            self.settings.scale_factor
            )
        self.ground2_img = pygame.transform.scale_by(
            pygame.image.load('FlappyBird/assets/ground.png').convert(),
            self.settings.scale_factor
            )
        
        self.ground1_rect = self.ground1_img.get_rect()
        self.ground2_rect = self.ground2_img.get_rect()

        # Set the initial position of the ground
        self.ground1_rect.x = 0
        self.ground2_rect.x = self.ground1_rect.right
        self.ground1_rect.y = 600
        self.ground2_rect.y = 600

        self.screen.blit(self.background_img, (0, -240))
        
        
    def update(self, dt):
        """
        Updates the ground's position based on the delta time.
        """

        # Move the ground as animated
        self.ground1_rect.x -= self.settings.move_speed * dt
        self.ground2_rect.x -= self.settings.move_speed * dt

        if self.ground1_rect.right < 0:
            self.ground1_rect.x = self.ground2_rect.right

        if self.ground2_rect.right < 0:
            self.ground2_rect.x = self.ground1_rect.right

        if not self.fb_game.game_over:
            self.blitme()
    

    def blitme(self):
        """
        Blit the background to the screen.
        """

        self.screen.blit(self.background_img, (0, -240))
    
    
    def blitground(self):
        """
        Blit the ground to the screen.
        """

        self.screen.blit(self.ground1_img, self.ground1_rect)
        self.screen.blit(self.ground2_img, self.ground2_rect)