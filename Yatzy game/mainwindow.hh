/*
 * Course: COMP.CS.110 Programming 2: structures
 * Project 4: Yatzy
 * Name: Justus Haataja
 * Student ID: H291931
 * Username: xfjuha
 * E-mail: justus.haataja@tuni.fi
 *
 */

#ifndef MAINWINDOW_HH
#define MAINWINDOW_HH

#include "gameengine.hh"
#include <QTimer>
#include <QMainWindow>
#include <string>
#include <vector>
#include <QPixmap>


QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    /**
     * @brief Game engine instance associated with the MainWindow.
     *
     * An instance of the GameEngine class used to manage the game logic.
     * It is created during the MainWindow object's construction.
     */
    GameEngine *engine = new GameEngine;

    /**
     * @brief Timer used for game-related timekeeping.
     *
     * A QTimer object used for managing time-related aspects of the game,
     * such as elapsed time. It is initially set to nullptr and is created
     * later during the program's execution.
     */
    QTimer *timer = nullptr;


private slots:

    /**
     * @brief Handles the editing finished event for Player 1's name input.
     */
    void on_lineEditPlayer1_editingFinished();
    /**
     * @brief Handles the editing finished event for Player 2's name input.
     */
    void on_lineEditPlayer2_editingFinished();
    /**
     * @brief Handles the editing finished event for Player 3's name input.
     */
    void on_lineEditPlayer3_editingFinished();
    /**
     * @brief Handles the editing finished event for Player 4's name input.
     */
    void on_lineEditPlayer4_editingFinished();

    /**
     * @brief Sets the players in the game engine.
     *
     * This function takes a GameEngine pointer as a parameter and sets the players
     * in the game engine based on the current number of players.
     *
     * @param engine A pointer to the GameEngine instance.
     */
    void set_players(GameEngine *engine);

    /**
     * @brief Initiates and controls the gameplay.
     *
     * This function takes a GameEngine pointer as a parameter and orchestrates the
     * gameplay, including determining the current player's turn and managing rolls.
     *
     * @param engine: A pointer to the GameEngine instance.
     */
    void play_game(GameEngine *engine);

    /**
     * @brief Handles the click event of the "Play" button.
     *
     * This function is triggered when the user clicks the "Play" button. It initiates
     * the game engine, sets up the initial game state, and starts the game.
     */
    void on_pushButtonPlay_clicked();

    /**
     * @brief Handles the click event of the "Roll" button.
     *
     * This function is triggered when the user clicks the "Roll" button. It performs
     * actions related to dice rolling, updating the UI and managing the game state.
     */
    void on_rollButton_clicked();

    /**
     * @brief Handles the click event of the "Give Turn" button.
     *
     * This function is triggered when the user clicks the "Give Turn" button. It passes
     * the turn to the next player, updates the UI, and manages button states.
     */
    void on_giveTurnButton_clicked();

    /**
     * @brief Handles the click event of the "Quit" button.
     *
     * This function is triggered when the user clicks the "Quit" button. It checks the
     * game status, deletes game-related objects, and frees associated resources.
     */
    void on_quitButton_clicked();

    /**
     * @brief Handles the click event of the "Reset" button.
     *
     * This function is triggered when the user clicks the "Reset" button. It resets the
     * game state, updates the UI, and prepares for a new game round.
     */
    void on_resetButton_clicked();

    /**
     * @brief Handles the click event of the "Pause" button.
     *
     * This function is triggered when the user clicks the "Pause" button. It toggles the
     * pause state of the game, updating the UI and managing button states accordingly.
     */
    void on_pauseButton_clicked();

    /**
     * @brief Updates the game play information in the UI.
     *
     * This function takes a GameEngine pointer as a parameter and updates the UI
     * with the current game play information, including the player's turn and rolls.
     *
     * @param engine: A pointer to the GameEngine instance.
     */
    void updateGamePlay(GameEngine *engine);

    /**
     * @brief Updates the dice labels in the UI based on current dice values.
     *
     * This function retrieves the current dice values from the game engine and updates
     * the corresponding QLabel elements in the UI with the appropriate QPixmap.
     */
    void updateDiceLabels();

    /**
     * @brief Returns the QPixmap corresponding to a given dice value.
     *
     * This function takes a dice value as a parameter and returns the QPixmap associated
     * with that value. It is used to display the correct dice image in the UI.
     *
     * @param diceValue: The value of the dice (1 to 6).
     * @return The QPixmap: corresponding to the provided dice value.
     */
    QPixmap changeDices(int diceValue);

    /**
     * @brief Updates the UI to display the current player's turn.
     *
     * This function takes a GameEngine pointer as a parameter and updates the UI
     * to indicate which player's turn it currently is.
     *
     * @param engine: A pointer to the GameEngine instance.
     */
    void whose_turn(GameEngine *engine);

    /**
     * @brief Updates the UI to display the remaining rolls.
     *
     * This function takes a GameEngine pointer as a parameter and updates the UI
     * to show the number of rolls remaining for the current player.
     *
     * @param engine: A pointer to the GameEngine instance.
     */
    void rolls_left(GameEngine *engine);

    /**
     * @brief Converts the number of rolls to the corresponding display value.
     *
     * This function takes the number of rolls as a parameter and returns the
     * corresponding value used for display purposes in the UI.
     *
     * @param rolls: The number of rolls remaining for the current player.
     * @return The display value for the number of rolls.
     */
    int change_rolls(int rolls);

    /**
     * @brief Locks or unlocks slot buttons in the UI.
     *
     * This function takes two boolean parameters to control the locked state and
     * style reset of slot buttons in the UI. It is used to manage the interaction
     * with buttons that correspond to dice slots.
     *
     * @param locked: Indicates whether the slot buttons should be locked or unlocked.
     * @param reset: Indicates whether the style of the buttons should be reset.
     */
    void slotButtonsLocked(bool locked, bool reset);

    /**
     * @brief Reports the winner or tied players and their hands.
     *
     * This function is responsible for displaying the winner or tied players
     * along with their winning hands in the UI. It updates the GamePlayTextBrowser
     * with the relevant information and sets the background image for the second page.
     */
    void report_winner();

    /**
     * @brief Initiates or restarts the game timer.
     *
     * This function is responsible for starting or restarting the game timer. It
     * creates the timer object if it doesn't exist, connects it to the update_time
     * slot, and starts the timer with a one-second interval.
     */
    void timer_starts();

    /**
     * @brief Updates the elapsed time displayed in the UI.
     *
     * This function is connected to the game timer and updates the elapsed time
     * displayed in the UI every second.
     */
    void update_time();

    /**
     * @brief Sets the locked slots in the game engine based on UI interaction.
     *
     * This function determines the locked slots based on the UI interaction and
     * updates the corresponding state in the game engine.
     */
    void locked_slots();

    /**
     * @brief Handles the click event of the Slot 1 button.
     *
     * This function is triggered when the user clicks the Slot 1 button. It toggles
     * the locked state of Slot 1 and updates the button style accordingly.
     */
    void on_pushButtonSlot1_clicked();

    /**
     * @brief Handles the click event of the Slot 2 button.
     *
     * This function is triggered when the user clicks the Slot 2 button. It toggles
     * the locked state of Slot 2 and updates the button style accordingly.
     */
    void on_pushButtonSlot2_clicked();

    /**
     * @brief Handles the click event of the Slot 3 button.
     *
     * This function is triggered when the user clicks the Slot 3 button. It toggles
     * the locked state of Slot 3 and updates the button style accordingly.
     */
    void on_pushButtonSlot3_clicked();

    /**
     * @brief Handles the click event of the Slot 4 button.
     *
     * This function is triggered when the user clicks the Slot 4 button. It toggles
     * the locked state of Slot 4 and updates the button style accordingly.
     */
    void on_pushButtonSlot4_clicked();

    /**
     * @brief Handles the click event of the Slot 5 button.
     *
     * This function is triggered when the user clicks the Slot 5 button. It toggles
     * the locked state of Slot 5 and updates the button style accordingly.
     */
    void on_pushButtonSlot5_clicked();

private:

    Ui::MainWindow *ui;

    std::map<int,QString> Qplayers_;

    int playersAmount_ = 0;

    int elapsedSeconds_ = 0;

    bool gamePaused_ = false;

    bool slotOneLocked_ = false;
    bool slotTwoLocked_ = false;
    bool slotThreeLocked_ = false;
    bool slotFourLocked_ = false;
    bool slotFiveLocked_ = false;

    const QPixmap diceOne;
    const QPixmap diceTwo;
    const QPixmap diceThree;
    const QPixmap diceFour;
    const QPixmap diceFive;
    const QPixmap diceSix;
    const QPixmap StartPic;
    const QPixmap EndPic;

};
#endif // MAINWINDOW_HH
