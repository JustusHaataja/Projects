#include "mainwindow.hh"
#include "ui_mainwindow.h"
#include "functions.hh"
#include "gameengine.hh"
#include "QDebug"
#include <QPixmap>

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)

    , diceOne(":/1.png")
    , diceTwo(":/2.png")
    , diceThree(":/3.png")
    , diceFour(":/4.png")
    , diceFive(":/5.png")
    , diceSix(":/6.png")
    , StartPic(":/background.jpg")
    , EndPic(":/endbg.jpg")

{
    ui->setupUi(this);

    // Set focus on Player 1's name input field
    ui->lineEditPlayer1->setFocus();

    // Set tab order for player name input fields
    setTabOrder(ui->lineEditPlayer1, ui->lineEditPlayer2);
    setTabOrder(ui->lineEditPlayer2, ui->lineEditPlayer3);
    setTabOrder(ui->lineEditPlayer3, ui->lineEditPlayer4);

    // Set the timer display to"00:00"
    ui->lcdNumberTimer->display("00:00");
}


MainWindow::~MainWindow()
{
    delete ui;
}


/*
 * This slot is activated when the editing of Player 1's name in the GUI is finished.
 * It retrieves the entered player name, checks for duplicates, and updates the game state
 * accordingly. If the player name is empty and there are existing players, it removes
 * Player 1 from the game. If there is space for more players, it adds Player 1 with the
 * entered name. This function is part of the GUI's response to user input for managing players.
 */
void MainWindow::on_lineEditPlayer1_editingFinished()
{
    // Retrieve the player name from the input field
    QString playerName = ui->lineEditPlayer1->text();

    // Flag to check if the player name is already in the game
    bool findName = false;

    // Iterate through existing players to check for duplicate names
    for  ( const auto& name : Qplayers_ ) {
        if ( playerName == name.second ) {
            findName = true;
        }
    }

    // If the player name is found, display a message
    if ( findName )
    {
        ui->labelPlayerFound->setText(playerName + " already in game...");
    }
    // If the player name is not found
    else {
        // If the player name is empty and there is at least one player, remove the player
        if ( playerName.isEmpty() )
        {
            if ( playersAmount_ > 0 ) {
                Qplayers_.erase(1);
                playersAmount_ = Qplayers_.size();
            }
            // Update the displayed number of players
            ui->lcdNumberPlayers->display(playersAmount_);
        }

        else if ( playersAmount_ < 4 )
        {
            // If the player name is not empty and there are less than four players, add a new player
            playersAmount_ ++;
            Qplayers_[1] = playerName;

            // Update the displayed number of players
            ui->lcdNumberPlayers->display(playersAmount_);
        }
    }
}

// Same for player 2
void MainWindow::on_lineEditPlayer2_editingFinished()
{
    QString playerName = ui->lineEditPlayer2->text();

    bool findName = false;

    for  ( const auto& name : Qplayers_ ) {
        if ( playerName == name.second ) {
            findName = true;
        }
    }

    if ( findName )
    {
        ui->labelPlayerFound->setText(playerName + " already in game...");
    }

    else {
        if ( playerName.isEmpty() )
        {
            if ( playersAmount_ > 0 ) {
                Qplayers_.erase(2);
                playersAmount_ = Qplayers_.size();
            }
            ui->lcdNumberPlayers->display(playersAmount_);
        }

        else if ( playersAmount_ < 4 )
        {
            playersAmount_ ++;
            Qplayers_[2] = playerName;
            ui->lcdNumberPlayers->display(playersAmount_);
        }
    }
}

// Same for player 3
void MainWindow::on_lineEditPlayer3_editingFinished()
{
    QString playerName = ui->lineEditPlayer3->text();

    bool findName = false;

    for  ( const auto& name : Qplayers_ ) {
        if ( playerName == name.second ) {
            findName = true;
        }
    }

    if ( findName )
    {
        ui->labelPlayerFound->setText(playerName + " already in game...");
    }

    else {
        if ( playerName.isEmpty() )
        {
            if ( playersAmount_ > 0 ) {
                Qplayers_.erase(3);
                playersAmount_ = Qplayers_.size();
            }
            ui->lcdNumberPlayers->display(playersAmount_);
        }

        else if ( playersAmount_ < 4 )
        {
            playersAmount_ ++;
            Qplayers_[3]= playerName;
            ui->lcdNumberPlayers->display(playersAmount_);
        }
    }
}

// Same for player 4
void MainWindow::on_lineEditPlayer4_editingFinished()
{
    QString playerName = ui->lineEditPlayer4->text();

    bool findName = false;

    for  ( const auto& name : Qplayers_ ) {
        if ( playerName == name.second ) {
            findName = true;
        }
    }

    if ( findName )
    {
        ui->labelPlayerFound->setText(playerName + " already in game...");
    }

    else {
        if ( playerName.isEmpty() )
        {
            if ( playersAmount_ > 0 ) {
                Qplayers_.erase(4);
                playersAmount_ = Qplayers_.size();
            }
            ui->lcdNumberPlayers->display(playersAmount_);
        }

        else if ( playersAmount_ < 4 )
        {
            playersAmount_ ++;
            Qplayers_[4] = playerName;
            ui->lcdNumberPlayers->display(playersAmount_);
        }
    }
}


/*
* This function is triggered when the user clicks the "Let's play" button. It checks if
* there are at least two players to start the game. If so, it sets up the players,
* starts the game, disables dice locking buttons, starts the game timer, and switches
* to the game screen. If there are fewer than two players, it updates the button
* text to prompt the user to add players.
*/
void MainWindow::on_pushButtonPlay_clicked()
{
    // Check if there are at least two players to start the game
    if ( Qplayers_.size() >= 2)
    {
        // Set up players using the engine
        set_players(engine);

        // Start the game using the engine
        play_game(engine);

        // Enable the dice locking buttons and disable the roll button
        slotButtonsLocked(true, false);

        // Start the game timer
        timer_starts();

        // Switch to the game screen in the stacked widget
        ui->stackedWidget->setCurrentIndex(1);
    }
    else {
        // If there are fewer than two players, prompt the user to add players
        ui->pushButtonPlay->setText("Add players");
    }
}


/**
 * This function initializes player information and adds them to the game engine.
 * Each player is assigned an ID, an initial number of rolls, and empty lists for
 * categories, dice values, and scores.
 *
 * @param engine: A pointer to the game engine.
 */
void MainWindow::set_players(GameEngine *engine)
{
    // Iterate through the specified number of players
    for( int i = 0; i < playersAmount_; ++i)
    {
        // Create a player with a unique ID, initial rolls, and empty lists
        Player player = { i+1, INITIAL_NUMBER_OF_ROLLS, {}, {}, {} };

        // Add the player to the game engine
        engine->add_player(player);
    }
}


/**
 * This function coordinates the different aspects of the game, including
 * determining whose turn it is and updating the number of rolls left.
 *
 * @param engine: A pointer to the game engine.
 */
void MainWindow::play_game(GameEngine *engine)
{
    // Determine and display whose turn it is
    whose_turn(engine);

    // Update and display the remaining number of rolls
    rolls_left(engine);
}


/**
 * This function retrieves the current player's turn from the game engine
 * and updates the UI label accordingly.
 *
 * @param engine: A pointer to the game engine.
 */
void MainWindow::whose_turn(GameEngine *engine)
{
    // Get the player whose turn it is and update the UI label
    QString turn = Qplayers_[engine->getTurn()+1];
    ui->PlayerInTurnLabel->setText(turn);
}

/**
 * This function retrieves the current number of rolls from the game engine
 * and updates the UI label accordingly.
 *
 * @param engine: A pointer to the game engine.
 */
void MainWindow::rolls_left(GameEngine *engine)
{
    // Get the remaining number of rolls and update the UI label
    QString rolls = QString::number(engine->getRolls());
    ui->RollsLeftLabel->setText(rolls);
}


/*
 * This function checks if the timer is already active. If so, it does nothing.
 * If the timer is not active, it initializes a new QTimer, connects its timeout
 * signal to the update_time slot, and starts the timer with a 1-second interval.
 */
void MainWindow::timer_starts()
{
    // Check if the timer is active
    if ( timer && timer->isActive() ) {
        // If the timer is already active, do nothing
    }
    else
    {
        // If the timer is not active or doesn't exist, create a new QTimer
        if ( !timer )
        {
            timer = new QTimer(this);

            // Connect the timeout signal of the timer to the update_time slot
            connect(timer, SIGNAL(timeout()), this, SLOT(update_time()));
        }
        // Stop and restart the timer with a 1-second interval
        timer->stop();
        timer->start(1000);
    }
}


/*
 * This function is connected to the timeout signal of the game timer. It increments
 * the elapsed time in seconds, calculates the corresponding minutes and seconds,
 * and updates the UI label displaying the timer.
 */
void MainWindow::update_time()
{
    // Increment the elapsed time in seconds
    elapsedSeconds_ ++;

    // Calculate minutes and seconds from the elapsed time
    int minutes = elapsedSeconds_ / 60;
    int seconds = elapsedSeconds_ % 60;

    // Update the UI label displaying the timer in the format MM:SS
    ui->lcdNumberTimer->display(QString("%1:%2").
                                arg(minutes, 2, 10, QChar('0')).
                                arg(seconds, 2, 10, QChar('0')));

}


/**
 * This function takes a dice value as input and returns the corresponding QPixmap
 * associated with that value. It uses a switch statement to select the appropriate
 * QPixmap based on the dice value.
 *
 * @param diceValue: The value of the dice (1-6).
 * @return The QPixmap: corresponding to the given dice value.
 */
QPixmap MainWindow::changeDices(int diceValue)
{
    switch (diceValue)
    {
        case 1:
            return diceOne;
        case 2:
            return diceTwo;
        case 3:
            return diceThree;
        case 4:
            return diceFour;
        case 5:
            return diceFive;
        case 6:
            return diceSix;
        default:
            // Handle invalid dice values or provide a default QPixmap
            return QPixmap();
    }
}


/**
 * This function takes the number of remaining rolls as input and returns an
 * integer representing a different aspect of the game. It is designed to provide
 * an alternative representation for the remaining rolls, useful for user interface
 * updates or game logic.
 *
 * @param rolls: The number of remaining rolls.
 * @return An integer representing the modified representation of remaining rolls.
 */
int MainWindow::change_rolls(int rolls)
{
    if ( rolls == 2 ) {
        return 1;
    }
    else if ( rolls == 1 ) {
        return 2;
    }
    else {
        return 3;
    }
}


/**
 * This function retrieves information about the current game play from the
 * game engine, including the private score text and the number of remaining
 * rolls. It then formats and appends this information to the GamePlayTextBrowser
 * in the UI.
 *
 * @param engine: A pointer to the game engine.
 */
void MainWindow::updateGamePlay(GameEngine *engine)
{
    // Retrieve the private score text from the game engine
    QString gamePlayText = engine->getPrivateScoreText();

    // Modify the representation of the remaining rolls for display
    int rolls = change_rolls(engine->getRolls());

    // Modify the representation of the remaining rolls for display
    QString turn = QString::number(rolls);

    // Append the formatted game play information to the GamePlayTextBrowser
    ui->GamePlayTextBrowser->append("Roll " + turn + ": " + gamePlayText);
}


/*
 * This function retrieves the current dice values from the game engine,
 * then updates the corresponding QLabel widgets in the UI with QPixmap
 * representations based on these dice values.
 */
void MainWindow::updateDiceLabels()
{
    // Create a vector of pointers to QLabel widgets representing the dice
    std::vector<QLabel*> diceLabels =
    { ui->dice1Label, ui->dice2Label,
     ui->dice3Label, ui->dice4Label, ui->dice5Label };

    // Retrieve the current dice values from the game engine
    vector<int> dices = engine->getDiceValues();

    // Calculate the number of dice sets
    int size = dices.size() / 5;

    // Calculate the start and end indices for updating QLabel widgets
    int startValue = (size * 5) - 5;
    int endValue = 5 * size;

    int i = 0;

    // Update each QLabel with the corresponding QPixmap based on dice values
    for (; startValue < endValue; ++startValue)
    {
        int diceValue = dices[startValue];

        // Retrieve the QPixmap corresponding to the current dice value
        QPixmap dicePixmap = changeDices(diceValue);

        // Set the QPixmap for the current QLabel
        diceLabels[i]->setPixmap(dicePixmap);

        // Ensure that QLabel has no system background for better display
        diceLabels[i]->setAttribute(Qt::WA_NoSystemBackground);

        ++i;
    }
}


/**
 * This function takes two boolean parameters, 'locked' and 'reset', to control
 * the state of slot buttons in the UI. It disables/enables the slot buttons based
 * on the 'locked' parameter. Additionally, if the 'reset' parameter is true, it
 * resets the style and locks state of the buttons.
 *
 * @param locked A: boolean indicating whether to lock or unlock the slot buttons.
 * @param reset A: boolean indicating whether to reset the style and lock state of the buttons.
 */
void MainWindow::slotButtonsLocked(bool locked, bool reset)
{
    // Create a vector of pointers to QPushButton widgets representing slot buttons
    std::vector<QPushButton*> buttons = { ui->pushButtonSlot1, ui->pushButtonSlot2, ui->pushButtonSlot3,
                ui->pushButtonSlot4, ui->pushButtonSlot5 };

    // Iterate through each slot button
    for ( auto button : buttons )
    {
        // Set the disabled state of the button based on the 'locked' parameter
        button->setDisabled(locked);

        // If 'reset' is true, reset the style of the button
        if ( reset )
        {
            button->setStyleSheet("color: rgb(255, 255, 255);");
        }
    }

    // If 'reset' is true, reset the locked state of each slot
    if ( reset )
    {
        slotOneLocked_ = false;
        slotTwoLocked_ = false;
        slotThreeLocked_ = false;
        slotFourLocked_ = false;
        slotFiveLocked_ = false;
    }
}


/*
 * This function determines the locked state of each slot based on the
 * individual slot lock flags (e.g., slotOneLocked_, slotTwoLocked_).
 * It then updates the game engine with the resulting locked state for each slot.
 */
void MainWindow::locked_slots()
{
    // Create a vector to store the locked state of each slot
    vector<bool> open_slots;

    // Create a vector representing the locked state of all slots
    vector<bool> all_slots = { slotOneLocked_, slotTwoLocked_,
                             slotThreeLocked_, slotFourLocked_,
                             slotFiveLocked_ };

    // Iterate through each slot and determine its locked state
    for ( auto slot_state : all_slots )
    {
        // If the slot is locked, add 'false' to open_slots; otherwise, add 'true'
        open_slots.push_back(!slot_state);
    }

    // Update the game engine with the locked state of each slot
    engine->setslots_(open_slots);
}


/*
 * This function is triggered when the user clicks the "Roll" button. It performs
 * several actions, including updating the locked slots, rolling the dice in the
 * game engine, updating the UI with the new dice values and game play information,
 * and managing the UI state based on the game progress.
 */
void MainWindow::on_rollButton_clicked()
{
    // Update the locked state of slots in the game engine
    locked_slots();

    // Roll the dice in the game engine
    engine->roll();

    // Perform actions related to the ongoing game
    play_game(engine);

    // Update the UI with the new dice values
    updateDiceLabels();

    // Update the UI with the current game play information
    updateGamePlay(engine);

    // Enable the slot buttons for the user to interact
    slotButtonsLocked(false, false);

    // Check if the player's turn is over
    if ( engine->getRolls() == 0 )
    {
        // Disable the roll button and notify the player that their turn is over
        ui->rollButton->setDisabled(true);

        // Retrieve the player whose turn is over and display a message
        QString player = Qplayers_.at(engine->turn_over());
        ui->GamePlayTextBrowser->append(player + " your turn is over.");
    }

    // Check if the game is over
    if ( engine->is_game_over() )
    {
        // Disable relevant buttons, lock slots, report the winner, and stop the timer
        ui->rollButton->setDisabled(true);
        ui->giveTurnButton->setDisabled(true);
        slotButtonsLocked(true, true);
        report_winner();
        timer->stop();
    }
}


/*
 * This function is responsible for displaying the winner or tied players
 * along with their winning hands in the UI. It updates the GamePlayTextBrowser
 * with the relevant information and sets the background image for the second page.
 */
void MainWindow::report_winner()
{
    // Get the number of elements in the winner information vector
    int size = engine->getWinner().size();

    // Set the background image for the second page
    ui->Page2->setStyleSheet("background-image: url(:/endbg.jpg);");

    // Check if there is a single winner
    if ( size == 2 )
    {
        // Retrieve the winner's player number and name
        int winnerNumber = std::stoi(engine->getWinner().at(0));
        QString winnerName = Qplayers_.at(winnerNumber);

        // Retrieve the winning hand description
        QString winningHand = QString::fromStdString(engine->getWinner().at(1));

        // Display the winner's information in the GamePlayTextBrowser
        QString winnerText = winnerName + " has won with " + winningHand ;
        ui->GamePlayTextBrowser->append(winnerText);
    }

    // Check if there are tied players
    if ( size > 2 )
    {
        QString tiedText;

        // Iterate through tied players and append their names to the tiedText
        for (int i = 0; i < size - 2; ++i)
        {
            int tiedPlayerIndex = std::stoi(engine->getWinner().at(i));

            QString tiedPlayerName = Qplayers_.at(tiedPlayerIndex);

            // Append tied player names with commas between them
            tiedText += tiedPlayerName + ((i < size - 3) ? ", " : " ");
        }

        // Retrieve the name of the last tied player
        int lastTiedPlayerIndex = std::stoi(engine->getWinner().at(size - 2));
        QString lastTiedPlayerName = Qplayers_.at(lastTiedPlayerIndex);

        // Retrieve the winning hand description
        QString winningHand = QString::fromStdString(engine->getWinner().at(size - 1));

        // Construct the final tiedText with the last tied player and winning hand
        tiedText += "and " + lastTiedPlayerName + " has tied with " + winningHand;

        // Display the tied players' information in the GamePlayTextBrowser
        ui->GamePlayTextBrowser->append(tiedText);
    }
}


/*
 * This function is triggered when the user clicks the "Give Turn" button. It performs
 * several actions, including giving the turn to the next player in the game engine,
 * updating the UI to reflect the new game state, locking slot buttons, and enabling
 * the "Roll" button for the next player's turn.
 */
void MainWindow::on_giveTurnButton_clicked()
{
    // Give the turn to the next player in the game engine
    engine->give_turn();

    // Perform actions related to the ongoing game
    play_game(engine);

    // Lock slot buttons and reset their style
    slotButtonsLocked(true, true);

    // Enable the "Roll" button for the next player's turn
    ui->rollButton->setEnabled(true);
}


/*
 * This function is triggered when the user clicks the "Quit" button. It performs
 * several actions, including checking if the game is over, deleting the game engine
 * and timer objects, and setting their pointers to null.
 */
void MainWindow::on_quitButton_clicked()
{
    // Check if the game is over (result not used in the original code)
    engine->is_game_over();

    // Delete the game engine object
    delete engine;

    // Set the game engine pointer to null
    engine = nullptr;

    // Delete the timer object
    delete timer;

    // Set the timer pointer to null
    timer = nullptr;
}


/*
 * This function is triggered when the user clicks the "Reset" button. It performs
 * several actions, including resetting the game state, updating the UI to reflect
 * the reset, and enabling the necessary buttons for the next game.
 */
void MainWindow::on_resetButton_clicked()
{
    // Reset the game state in the game engine
    engine->reset_Game();
    engine->change_game_over();

    // Update the UI with the current player's turn and remaining rolls
    whose_turn(engine);
    rolls_left(engine);

    // Reset the elapsed time and start the timer
    elapsedSeconds_ = 0;
    ui->lcdNumberTimer->display("00:00");
    timer->start();

    // Set the game pause state to false
    gamePaused_ = false;

    // Lock slot buttons and reset their style
    slotButtonsLocked(true, true);

    // Enable the "Roll" and "Give Turn" buttons for the next game
    ui->rollButton->setEnabled(true);
    ui->giveTurnButton->setEnabled(true);

    // Set the background image for the second page
    ui->Page2->setStyleSheet("background-image: url(:/background.jpg);");

    // Clear the GamePlayTextBrowser
    ui->GamePlayTextBrowser->setText("");
}


/*
 * This function is triggered when the user clicks the "Pause" button. It toggles
 * the pause state of the game, updating the UI accordingly, pausing or resuming
 * the game timer, and adjusting button states.
 */
void MainWindow::on_pauseButton_clicked()
{
    // Check if the game is not paused
    if ( !gamePaused_ )
    {
        // Set the style of the pause button to indicate it's in a paused state
        ui->pauseButton->setStyleSheet("color: rgb(255, 0 ,0);");

        // Disable the "Roll" and "Give Turn" buttons, lock slot buttons, and stop the timer
        ui->rollButton->setDisabled(true);
        ui->giveTurnButton->setDisabled(true);
        slotButtonsLocked(true, false);
        timer->stop();
    }
    else    // Game is currently paused
    {
        // Set the style of the pause button to indicate it's in a resumed state
        ui->pauseButton->setStyleSheet("color: rgb(255, 255, 255);");

        // Enable the "Roll" and "Give Turn" buttons
        ui->rollButton->setEnabled(true);
        ui->giveTurnButton->setEnabled(true);

        // If the player has remaining rolls, unlock slot buttons
        if ( engine->getRolls() != 3 )
        {
            slotButtonsLocked(false, false);
        }

        // If the game is not over, resume the timer
        if ( !engine->is_game_over() )
        {
            timer->start();
        }
    }

    // Toggle the gamePaused_ state
    gamePaused_ = !gamePaused_;
}


/*
 * This function is triggered when the user clicks the Slot 1 button. It toggles
 * the locked state of Slot 1 and updates the button style accordingly.
 */
void MainWindow::on_pushButtonSlot1_clicked()
{
    // Check if Slot 1 is currently locked
    if ( slotOneLocked_ )
    {
        // If locked, set the button style to indicate unlocking (white color)
        ui->pushButtonSlot1->setStyleSheet("color: rgb(255, 255, 255);");
    }
    else    // Slot 1 is currently unlocked
    {
        // If unlocked, set the button style to indicate locking (red color)
        ui->pushButtonSlot1->setStyleSheet("color: rgb(255, 0 ,0);");
    }

    // Toggle the locked state of Slot 1
    slotOneLocked_ = !slotOneLocked_;
}


/*
 * This function is triggered when the user clicks the Slot 2 button. It toggles
 * the locked state of Slot 2 and updates the button style accordingly.
 */
void MainWindow::on_pushButtonSlot2_clicked()
{
    if ( slotTwoLocked_ )
    {
        ui->pushButtonSlot2->setStyleSheet("color: rgb(255, 255, 255);");
    }
    else
    {
        ui->pushButtonSlot2->setStyleSheet("color: rgb(255, 0, 0);");
    }

    slotTwoLocked_ = !slotTwoLocked_;
}


/*
 * This function is triggered when the user clicks the Slot 3 button. It toggles
 * the locked state of Slot 3 and updates the button style accordingly.
 */
void MainWindow::on_pushButtonSlot3_clicked()
{
    if ( slotThreeLocked_ ) {
        ui->pushButtonSlot3->setStyleSheet("color: rgb(255, 255, 255);");
    }
    else {
        ui->pushButtonSlot3->setStyleSheet("color: rgb(255, 0, 0);");
    }

    slotThreeLocked_ = !slotThreeLocked_;
}


/*
 * This function is triggered when the user clicks the Slot 4 button. It toggles
 * the locked state of Slot 4 and updates the button style accordingly.
 */
void MainWindow::on_pushButtonSlot4_clicked()
{
    if ( slotFourLocked_ )
    {
        ui->pushButtonSlot4->setStyleSheet("color: rgb(255, 255, 255);");
    }
    else
    {
        ui->pushButtonSlot4->setStyleSheet("color: rgb(255, 0, 0);");

    }

    slotFourLocked_ = !slotFourLocked_;
}


/*
 * This function is triggered when the user clicks the Slot 5 button. It toggles
 * the locked state of Slot 5 and updates the button style accordingly.
 */
void MainWindow::on_pushButtonSlot5_clicked()
{
    if ( slotFiveLocked_ )
    {
        ui->pushButtonSlot5->setStyleSheet("color: rgb(255, 255, 255);");
    }
    else
    {
        ui->pushButtonSlot5->setStyleSheet("color: rgb(255, 0, 0);");
    }

    slotFiveLocked_ = !slotFiveLocked_;
}
