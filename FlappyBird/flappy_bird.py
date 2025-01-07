"""
The main class for the Flappy Bird game.
"""
import sys
import pygame

from settings import Settings
from bird import Bird
from ground import Ground
from pipes import Pipe

class FlappyBird:
    def __init__(self):
        pygame.init()
        self.settings = Settings()

        # Set up the screen
        self.screen = pygame.display.set_mode((
            self.settings.screen_width,
            self.settings.screen_height
        ))
        pygame.display.set_caption('Flappy Bird')

        self.clock = pygame.time.Clock()
        self.ground = Ground(self)
        self.bird = Bird(self)

        self.pipe_list = []
        self.pipe_counter = 126

        self.start = False
        self.game_over = False
        self.start_score = False
        self.score = 0
        self.score_saved = False

        # Font for score
        self.font = pygame.font.Font(self.settings.font, 25)
        self.score_text = self.font.render(f"Score: {self.score}",
                                           True, (255, 255, 255))
        
        # Sound for score
        # Check the path to the score.wav file
        self.score_sound = pygame.mixer.Sound(
            'FlappyBird/assets/score.wav')
                
 
    def run_game(self):
        """
        Runs the game by starting the game loop and checking for events.
        Updates the screen and checks for collisions.
        """

        # Start the game loop and start the timer
        last_time = pygame.time.get_ticks() / 1000
        running = True

        while running:
            # calculate delta time
            new_time = pygame.time.get_ticks() / 1000
            self.dt = new_time - last_time
            last_time = new_time

            # Update the screen according to the events
            self._check_events()
            self._update_screen()
            self.check_collisions()
            pygame.display.flip()

            # Run the game at the FPS rate
            self.clock.tick(self.settings.fps)
    

    def _check_events(self):
        """
        Checks for events such as quitting the game, starting the game,
        flapping the bird, and restarting the game.
        """

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    self.start = True
                    self.bird.update_on = True
                
                if event.key == pygame.K_SPACE and self.start:
                    self.bird.flap(self.dt)
                
                if event.key == pygame.K_RETURN and self.game_over:
                    self.__init__()
                    self.run_game()
                    
                elif event.key == pygame.K_q:
                    pygame.quit()
                    sys.exit()
                    
 
    def _update_screen(self):
        """
        Updates the screen by updating the ground, bird, and pipes.
        Checks the score and collision.
        """

        if self.game_over == False:
            self.ground.update(self.dt)
            self.bird.update(self.dt)
            self.bird.playAnimation()
            self.check_score()

            
            # Start the pipes after the bird starts moving
            if self.start:
                if self.pipe_counter > 125 :
                    self.pipe_list.append(Pipe(self))
                    self.pipe_counter = 0
                
                self.pipe_counter += 1

                for pipe in self.pipe_list:
                    pipe.update(self.dt)

                # Remove the pipes that are out of the screen
                if len(self.pipe_list) != 0:
                    if self.pipe_list[0].rect_up.right < 0:
                        self.pipe_list.pop(0)
            
            # Blit the ground
            self.ground.blitground()
            
            # Blit the score
            self.screen.blit(self.score_text, (10, 10))
        
        else:
            self.game_over_screen()


    
    def check_score(self):
        """
        Updates the player's score when the bird successfully passes a pipe.
        Plays a score sound and refreshes the score display.
        """

        if len(self.pipe_list) > 0:
            if (self.bird.rect.left > self.pipe_list[0].rect_down.left and
                self.bird.rect.left < self.pipe_list[0].rect_down.right and not
                self.start_score):
                self.start_score = True
            
            if (self.bird.rect.left > self.pipe_list[0].rect_down.right and
                self.start_score):
                self.start_score = False
                self.score += 1
                self.score_text = self.font.render(f"Score: {self.score}", True, (255, 255, 255))
                self.score_sound.play()
                

    def check_collisions(self):
        """
        Checks if the bird has collided with the ground or the pipes.
        Sets the game over flag to True if a collision is detected.
        """

        # If the bird hits the ground or the pipes
        if len(self.pipe_list):
            if self.bird.rect.bottom > 590:
                self.game_over = True
                self.bird.setSounds(False)

            if (self.bird.rect.colliderect(self.pipe_list[0].rect_down) or
                self.bird.rect.colliderect(self.pipe_list[0].rect_up)):
                self.game_over = True
                self.bird.setSounds(False)


    def game_over_screen(self):
        """
        Displays the game over screen with the player's score, high score,
        and a prompt to restart the game. High score is saved to a file.
        """

        # Save the score
        if not self.score_saved:
            self.keep_score()
            self.score_saved = True

        # Font for game over screen
        self.game_over_font = pygame.font.Font(
            self.settings.font, self.settings.font_size)
        
        # Font for restart
        self.restart_font = pygame.font.Font(
            self.settings.font, 20)
        
        # Game over text
        game_over_text = self.game_over_font.render(
            'Game Over', True, (255, 255, 255))
        
        score_text = self.game_over_font.render(
            f'Score: {self.score}', True, (255, 255, 255))
        
        high_score_text = self.restart_font.render(
            f'High Score: {self.high_score}', True, (255, 255, 255))
        
        # Restart text
        restart_text = self.restart_font.render(
            'Press Enter to restart', True, (255, 255, 255))
        
        # Center the texts
        game_over_rect = game_over_text.get_rect(
            center=(self.settings.screen_width // 2, 150))
        
        score_text_rect = score_text.get_rect(
            center=(self.settings.screen_width // 2, 200))
        
        high_score_text_rect = high_score_text.get_rect(
            center=(self.settings.screen_width // 2, 450))
        
        restart_text_rect = restart_text.get_rect(
            center=(self.settings.screen_width // 2, 500))
        
        # Blit the texts
        self.screen.blit(game_over_text, game_over_rect)
        self.screen.blit(score_text, score_text_rect)
        self.screen.blit(high_score_text, high_score_text_rect)
        self.screen.blit(restart_text, restart_text_rect)
        pygame.display.flip()



    def keep_score(self):
        """
        Saves the player's score to a file and retrieves the high score.
        """

        # Save the score
        # Check the path to the scores.txt file
        with open('FlappyBird/scores.txt', 'a') as file:
            file.write(f"{str(self.score)}\n")
            file.close()

        # Get the high score
        # Check the path to the scores.txt file
        with open('FlappyBird/scores.txt', 'r') as score_file:
            self.score_data = score_file.read()
            score_file.close()

        score_list = [int(score) for score in self.score_data.split()]
            
        self.high_score = max(score_list)

        
        

# Create game and run it
fb = FlappyBird()
fb.run_game()