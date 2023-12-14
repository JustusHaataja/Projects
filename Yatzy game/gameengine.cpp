/*
 * Course: COMP.CS.110 Programming 2: structures
 * Project 4: Yatzy
 * Name: Justus Haataja
 * Student ID: H291931
 * Username: xfjuha
 * E-mail: justus.haataja@tuni.fi
 *
 */

#include "gameengine.hh"
#include "functions.hh"
#include "mainwindow.hh"
#include "ui_mainwindow.h"
#include "QDebug"


#include <iostream>
#include <sstream>
#include <QDebug>

using namespace std;

GameEngine::GameEngine():
    game_turn_(0), game_over_(false)
{
}

GameEngine::~GameEngine()
{
}


void GameEngine::add_player(const Player player)
{
    players_.push_back(player);
}


/**
 * @return The current turn number.
 */
int GameEngine::getTurn() const
{
    return game_turn_;
}


/**
 * @return The number of rolls left for the current player.
 */
int GameEngine::getRolls() const
{
    return players_.at(game_turn_).rolls_left_;
}


/*
 * @return A vector containing the values of the dice for the current player.
 */
vector<int> GameEngine::getDiceValues()
{
    return players_.at(game_turn_).diceValues_;
}



/*
 * This function resets various attributes for each player in the game, including
 * the number of rolls left, the latest and best point values, and the current dice values.
 * It prepares the game state for a new round.
 */
void GameEngine::reset_Game()
{
    int numberOfPlayers = players_.size();

    // Reset rolls left, latest and best point values,
    // and current dice values for each player.
    for ( int i = 0; i < numberOfPlayers; ++i)
    {
        players_.at(i).rolls_left_ = 3;
        players_.at(i).latest_point_values_ = {};
        players_.at(i).best_point_values_ = {};
        players_.at(i).diceValues_ = {};
    }
}


/**
 * This function updates the state of slots in the game engine based on the provided
 * vector of boolean values. Each boolean corresponds to the open (true) or closed (false)
 * state of a slot. It is used to control which slots are available for scoring.
 *
 * @param open_slots A vector indicating the open (true) or closed (false) state of slots.
 */
void GameEngine::setslots_(vector<bool> open_slots)
{
    slots_ = open_slots;
}


/*
 * This function simulates a dice roll for the current player, updating the
 * player's dice values and calculating new points based on the slot availability.
 * It also handles decreasing the rolls left for the player and checks for the
 * end of the turn or game.
 */
void GameEngine::roll()
{
    vector<int> new_points; // Container for storing new point values.

    for ( size_t i = 0; i < slots_.size() ; ++i)
    {
        if ( slots_.at(i) )
        {
            int point_value = roll_dice();  // Simulate rolling a single die.

            // Update the player's dice values and record the new point value.
            players_.at( game_turn_ ).diceValues_.push_back( point_value );
            new_points.push_back( point_value );
        }

        else    // Handle locked slots by copying the existing dice values.
        {
            // After first roll / rolls left 2
            if ( players_.at( game_turn_ ).rolls_left_ == 2 )
            {
                // If slot is locked, update new dice value as corresponding die
                // on the previous roll
                // .at(i) ---> first roll dices = dices 1,2,3,4,5
                players_.at( game_turn_ ).diceValues_
                        .push_back(players_.at( game_turn_ ).diceValues_.at(i));

                // Record the new point value
                new_points.push_back(players_.at( game_turn_) .diceValues_.at(i));
            }

            // After second roll / rolls left 1
            if (players_.at( game_turn_ ).rolls_left_ == 1 )
            {
                // If slot is locked, update new dice value as corresponding die
                // on the previous roll
                // .at(i+5) ---> second roll dices = dices 6,7,8,9,10
                players_.at( game_turn_ ).diceValues_
                        .push_back(players_.at( game_turn_ ).diceValues_.at(i+5));

                // Record the new point value
                new_points.push_back(players_.at( game_turn_ ).diceValues_.at(i+5));
            }
        }
    }

    // Update points based on the new point values
    update_points(new_points);

    // Report the current player's status
    report_player_status();


    // Decreasing rolls left
    --players_.at(game_turn_).rolls_left_;

    // Checking if the player in turn has rolls left
    if ( players_.at(game_turn_).rolls_left_ == 0 )
    {
        int turn_is_over = players_.at(game_turn_).id_;
        turn_over_for_ = turn_is_over;
    }

    // Checking if any player has turns left
    if ( all_turns_used() )
    {
        report_winner();
    }
}


/**
 * This function takes a vector of integers as input and returns a new vector containing
 * the last five elements of the input vector. If the input vector has fewer than five elements,
 * an empty vector is returned. It ensures that the returned vector only contains the last
 * five values, handling cases where the input vector might not have enough elements.
 *
 * @param numbers The input vector of integers.
 * @return A vector containing the last five values from the input vector.
 */
std::vector<int> GameEngine::getLastFiveValues(std::vector<int> numbers)
{
    // Check if the vector has at least 5 elements
    if (numbers.size() >= 5) {
        // Get an iterator pointing to the element 5 positions from the end
        auto lastFiveBegin = numbers.end() - 5;

        // Create a new vector with the last 5 elements
        return std::vector<int>(lastFiveBegin, numbers.end());
    } else {
        // If the vector does not have enough elements, return an empty vector
        return {};
    }
}


/**
 * This function returns the player index indicating for whom the turn has ended.
 * It is set during the rolling process when a player has no rolls left. If no turn has
 * ended, the returned value is not meaningful and should be interpreted accordingly.
 *
 * @return The player index for whom the turn has ended.
 */
int GameEngine::turn_over()
{
    return turn_over_for_;
}


/*
 * This function searches for the next player among those whose ID is greater than
 * that of the current player and still have rolls left. If a suitable player is found,
 * the game turn is updated, and the function returns. If not, it searches among players
 * whose ID is less than or equal to that of the current player. If no player is found
 * with rolls left, it reports the winner as no player has turns left.
 */
void GameEngine::give_turn()
{
    // Searching for the next player among those, whose id_ is greater than
    // that of the current player
    for ( unsigned int i = game_turn_ + 1; i < players_.size(); ++i )
    {
        if ( players_.at(i).rolls_left_ > 0 )
        {
            game_turn_ = i;
            return;
        }
    }

    // A suitable next player couldn't be found in the previous search, so
    // searching for the next player among those, whose id_ is less than
    // or equal to that of the current player
    // (perhaps the current player is the only one having turns left)
    for(unsigned int i = 0; i <= game_turn_; ++i)
    {
        if(players_.at(i).rolls_left_ > 0)
        {
            game_turn_ = i;
            return;
        }
    }

    // No player has turns left
    report_winner();
}


/*
 * This function gathers all players' best point values, then uses the 'decide_winner'
 * function to determine the winner or potential ties. The result is stored in 'game_winner_'
 * vector, and the 'game_over_' flag is set to true, indicating the end of the game.
 */
void GameEngine::report_winner()
{
    // Collect all players' best point values
    vector<vector<int>> all_point_values;
    for ( const auto& player : players_ )
    {
        all_point_values.push_back(player.best_point_values_);
    }

    // Determine the winner or potential ties
    vector<string> winner_info = decide_winner(all_point_values);


    // Update the game state with the winner information
    game_winner_ = winner_info;

    // Set the game_over_ flag to true, indicating the end of the game
    game_over_ = true;
}


/**
 * This function returns a boolean value indicating whether the game has ended.
 * The result is based on the 'game_over_' flag, which is set to true when the game
 * is declared over, either due to a winner being determined or other game-ending conditions.
 *
 * @return True if the game has ended, false otherwise.
 */
bool GameEngine::is_game_over() const
{
    return game_over_;
}


/*
 * This function sets the 'game_over_' flag to false, effectively resetting the
 * game over state. It allows the game to continue or start a new round after
 * a previous game has concluded.
 */
void GameEngine::change_game_over()
{
    game_over_ = false;
}


/*
 * This function checks for internal errors and constructs a textual description
 * of the current player's latest point values. It uses the 'construe_result' function
 * to interpret the point values and sets the private score text for display.
 * If an internal error occurs, a debug message is emitted.
 */
void GameEngine::report_player_status() const
{
    // Check for potential internal errors
    if ( players_.size() <= game_turn_ )
    {
        qDebug() << "Internal error: report_player_status" ;
        return;
    }

    // Construct a textual description of the current player's latest point values
    string textual_description = "";
    construe_result(players_.at(game_turn_).latest_point_values_,
                    textual_description);

    // Convert the textual description to a QString for display
    QString score_text = QString::fromStdString(textual_description);

    // Set the private score text for display
    setPrivateScoreText(score_text);
}


/**
 * This function returns the private score text, which represents the textual
 * description of the current player's latest point values for display purposes.
 *
 * @return The private score text as a QString.
 */
QString GameEngine::getPrivateScoreText() const
{
    return score_text_;
}


/**
 * This function sets the private score text based on the provided QString.
 * It is typically used to update the display with the textual description of
 * the current player's latest point values.
 *
 * @param score The QString representing the new score text.
 */
void GameEngine::setPrivateScoreText(const QString& score) const
{
    score_text_ = score;
}


/**
 * This function returns a vector of strings containing information about the winner
 * or potential ties in the game. The information is typically used for reporting the
 * results of the game.
 *
 * @return A vector of strings with winner information.
 */
vector<string> GameEngine::getWinner() const
{
    return game_winner_;
}


/**
 * This function checks for internal errors, interprets the new point values using
 * the 'construe_result' function, and updates the player's best and latest point values.
 * If the new result is better than the best result so far, the best point values are updated.
 *
 * @param new_points A vector containing the new point values obtained in the current roll.
 */
void GameEngine::update_points(const vector<int>& new_points)
{
    // Check for potential internal errors
    if ( players_.size() <= game_turn_ )
    {
        qDebug() << "Internal error: update_points" ;
        return;
    }

    // Dummy string for result interpretation
    string dummy = "";

    // Interpret the new point values using the 'construe_result' function
    int new_result = construe_result(new_points, dummy);

    // Get the best result obtained so far
    int best_result_so_far
            = construe_result(players_.at(game_turn_).best_point_values_,
                              dummy);

    // Update the player's best point values if the new result is better
    if ( new_result > best_result_so_far )
    {
        players_.at(game_turn_).best_point_values_ = new_points;
    }

    // Update the player's latest point values
    players_.at(game_turn_).latest_point_values_ = new_points;
}


bool GameEngine::all_turns_used() const
{
    for ( const auto& player : players_ )
    {
        if ( player.rolls_left_ > 0 )
        {
            return false;
        }
    }
    return true;
}
