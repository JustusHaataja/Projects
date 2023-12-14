#ifndef GAMEENGINE_HH
#define GAMEENGINE_HH
#include "ui_mainwindow.h"


#include <iostream>
#include <string>
#include <vector>

// Obvious constants
const int INITIAL_NUMBER_OF_ROLLS = 3;
const int NUMBER_OF_DICES = 5;

// Data of each player
struct Player
{
    int id_;
    unsigned int rolls_left_;
    std::vector<int> latest_point_values_;
    std::vector<int> best_point_values_;
    std::vector<int> diceValues_;
};

class GameEngine
{
public:
    // Constructor
    GameEngine();

    // Destructor
    ~GameEngine();

    // Adds a new player
    void add_player(const Player player);

    // Prints guide text, telling which player is in turn and how many trials
    // they have left.
    void update_guide() const;

    // Rolls all dices, i.e. draws a new series of face numbers for the player
    // currently in turn. Moreover, reports the winner, if after the draw, all
    // players have used all their turns.
    void roll();

    // Gives turn for the next player having turns left, i.e. for the next
    // element in the players_ vector. After the last one, turn is given for
    // the second one (since the first one is NOBODY).
    void give_turn();

    // Reports a winner based on the current situation and sets the game_over_
    // attribute as true.
    void report_winner();

    // Tells if the game is over, i.e. if all players have used all their
    // turns.
    bool is_game_over() const;

    /**
     * @brief Changes the game over state.
     *
     * This function modifies the game over state to control the game flow.
     */
    void change_game_over();

    /**
     * @brief Gets the current turn number.
     *
     * @return The turn number.
     */
    int getTurn() const;

    /**
     * @brief Gets the number of rolls remaining for the current player.
     *
     * @return The number of rolls.
     */
    int getRolls() const;

    /**
     * @brief Gets the last five values from the provided vector.
     *
     * @param numbers: The vector of numbers to retrieve the last five values from.
     * @return A vector containing the last five values.
     */
    std::vector<int> getLastFiveValues(std::vector<int> numbers);

    /**
     * @brief Gets the current values of the dice.
     *
     * @return A vector containing the values of the dice.
     */
    std::vector<int> getDiceValues();

    /**
     * @brief Resets the game state.
     *
     * This function resets the game state, preparing for a new game round.
     */
    void reset_Game();

    /**
     * @brief Gets the private score text.
     *
     * @return The private score text as a QString.
     */
    QString getPrivateScoreText() const;

    /**
     * @brief Sets the private score text.
     *
     * @param score: The score text to set.
     */
    void setPrivateScoreText(const QString& score) const;

    /**
     * @brief Gets the information about the winner or tied players.
     *
     * @return A vector containing the winner or tied player information.
     */
    std::vector<std::string> getWinner() const;

    /**
     * @brief Ends the turn for the current player and returns the player index.
     *
     * @return The index of the player whose turn has ended.
     */
    int turn_over();

    /**
     * @brief Sets the open slots based on the provided vector.
     *
     * This function updates the open slots based on the provided vector.
     *
     * @param open_slots: A vector indicating the open or closed state of slots.
     */
    void setslots_(std::vector<bool> open_slots);

private:

    // Updates best and latest points of the player in turn:
    // latest_point_values_ will always be new_points,
    // best_point_values_ will be new_points, if the last_mentioned is better.
    void update_points(const std::vector<int>& new_points);

    // Reports the status of the player currently in turn
    void report_player_status() const;

    // Returns true if all turns of all players have been used,
    // otherwise returns false.
    bool all_turns_used() const;

    // Vector of all players
    std::vector<Player> players_;

    // Tells the player currently in turn (index of players_ vector)
    unsigned int game_turn_;

    // Tells if the game is over
    bool game_over_ = false;

    mutable QString score_text_;

    // Winner and winning hand in vector
    std::vector<std::string> game_winner_;

    // Shows whose turn ended
    int turn_over_for_;

    // Vector showing which slots are locked
    std::vector<bool> slots_;

};

#endif // GAMEENGINE_HH
