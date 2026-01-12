"""
The bird class for the Flappy Bird game.
"""
import pygame


class Bird():
    def __init__(self, fb_game):
    
        # Settings 
        self.settings = fb_game.settings
        self.scale_factor = self.settings.bird_scale_factor

        # Sounds
        self.sounds = True
        # Check the path to the flap.wav file
        self.flap_sound = pygame.mixer.Sound('FlappyBird/assets/flap.wav')

        # Ground
        self.ground = fb_game.ground
        self.ground_level = self.ground.ground1_rect.top

        # Bird images
        # Check the path to the birddown.png and birdup.png files
        self.image_list = [
            pygame.image.load('FlappyBird/assets/birddown.png'),
            pygame.image.load('FlappyBird/assets/birdup.png')
        ]

        # Scale the bird images
        self.image_list = [
            pygame.transform.scale(
                image,
                (int(image.get_width() * self.scale_factor), 
                 int(image.get_height() * self.scale_factor))
            ) for image in self.image_list
        ]
        
        # Set the initial image and get rect for it
        self.image_index = 0
        self.image = self.image_list[self.image_index]
        self.rect = self.image.get_rect(center = (150, 350))

        # Screen so we can blit the bird
        self.screen = fb_game.screen

        # Bird physics
        self.y_velocity = 0
        self.gravity = 12
        self.flap_speed = 325
        self.animation_counter = 0
        self.update_on = False


    def update(self, dt):
        """
        Updates the bird's position based on the delta time.
        """

        # Play the animation
        if self.update_on:
            self.applyGravity(dt)

            if self.rect.y <= 0 and self.flap_speed == 250:
                self.rect.y = 0
                self.flap_speed = 0
                self.y_velocity = 0
            elif self.rect.y > 0 and self.flap_speed == 0:
                self.flap_speed = 250
        
        # Blit the bird
        self.blitBird()


    def applyGravity(self, dt):
        """
        Applies gravity to the bird's y_velocity and updates the bird's position.
        """

        # Apply gravity to the bird's y_velocity
        self.y_velocity += self.gravity * dt
        self.rect.y += self.y_velocity

        # Check if the bird has hit the ground
        if self.rect.bottom >= self.ground_level:
            self.rect.bottom = self.ground.ground1_rect.top
            self.y_velocity = 0


    def flap(self, dt):
        """
        Flaps the bird by setting the y_velocity to the flap_speed.
        """

        self.y_velocity =- self.flap_speed * dt
        
        if self.sounds == True:
            self.flap_sound.play()

    
    def setSounds(self, value):
        """
        Sets the sounds attribute to the given value.
        """

        self.sounds = value


    def playAnimation(self):
        """
        Plays the bird's animation.
        """

        # Play the animation every 5 frames
        if self.animation_counter == 5:
            self.image = self.image_list[self.image_index]
            if self.image_index == 0:
                self.image_index = 1
            else:
                self.image_index = 0

            self.animation_counter = 0
        
        self.animation_counter += 1


    def blitBird(self):
        """
        Blits the bird to the screen.
        """

        # Determine the rotation angle based on y_velocity
        angle = 20 if self.y_velocity < 0 else 0

        if self.y_velocity > 5:
            angle -= self.y_velocity * 5

        # Rotate the current image
        rotated_image = pygame.transform.rotate(self.image, angle)

        # Create a new rect for the rotated image and center it
        rotated_rect = rotated_image.get_rect(center=self.rect.center)

        # Blit the rotated image to the screen
        self.screen.blit(rotated_image, rotated_rect)
    

    