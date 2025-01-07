"""
The pipes class for the Flappy Bird game.
"""
import pygame
from random import randint


class Pipe:
    def __init__(self, fb_game):

        self.settings = fb_game.settings
        self.screen = fb_game.screen

        # Load the pipe images
        # Check the path to the pipeup.png and pipedown.png files
        self.pipe_up = pygame.image.load(
            'FlappyBird/assets/pipeup.png').convert_alpha()
        
        self.pipe_down = pygame.image.load(  
            'FlappyBird/assets/pipedown.png').convert_alpha()
        
        # Scale the pipe images
        self.pipe_up = pygame.transform.scale_by(
            self.pipe_up, self.settings.pipe_scale_factor)
        
        self.pipe_down = pygame.transform.scale_by(
            self.pipe_down, self.settings.pipe_scale_factor)

        # Get the rect for pipe images
        self.rect_up = self.pipe_up.get_rect()
        self.rect_down = self.pipe_down.get_rect()

        # Position the pipe facing up
        self.rect_up.y = randint(225, 550)
        self.rect_up.x = self.settings.screen_width

        # Set the position of the pipe facing down
        self.rect_down.y = (
            self.rect_up.y - self.settings.pipe_gap - self.rect_up.height
        )
        self.rect_down.x = self.settings.screen_width

        # Set the speed of the pipes
        self.pipe_moving_speed = self.settings.pipe_speed

    
    def update(self, dt):
        """
        Updates the pipe's position based on the delta time.
        """

        # Move the pipes as animated
        self.rect_up.x -= self.pipe_moving_speed * dt
        self.rect_down.x -= self.pipe_moving_speed * dt 

        self.blitPipes()


    def blitPipes(self):
        """
        Blit the pipes to the screen.
        """

        self.screen.blit(self.pipe_up, self.rect_up)
        self.screen.blit(self.pipe_down, self.rect_down)