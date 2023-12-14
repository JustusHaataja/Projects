/*
 * Course: COMP.CS.110 Programming 2: structures
 * Project 4: Yatzy
 * Name: Justus Haataja
 * Student ID: H291931
 * Username: xfjuha
 * E-mail: justus.haataja@tuni.fi
 *
 *
 * How this program works:
 *
 * In the Yatzy game, you have the option to add up to four players initially, each with a unique name.
 * It's not possible to add the same player more than once to ensure fairness.
 * The game requires a minimum of two players to proceed, and if you attempt to start with less than that,
 * the system will prompt you to add more players.
 *
 * Once the minimum number of players is met, the game initiates, and a dedicated game window opens.
 * This window displays information such as whose turn it currently is, the remaining number of rolls,
 * and a timer at the top. Additionally, the window exhibits the five dice along with corresponding locking buttons.
 * Other buttons, including "Roll," "Give Turn," "Reset," and "Quit," are also available.
 * A pause button freezes the timer and locks all buttons except "Restart" and "Quit," changing its color
 * to red to signify the pause status.
 *
 * Upon pressing the roll button, the game reveals the dice values and evaluates if any points are scored
 * based on the dice value hierarchy. After the initial roll, you can strategically lock specific dice—for example,
 * if your roll yields 1 1 3 4 5, you might lock 1 1 to aim for a three-of-a-kind or lock 1 3 4 5 for a straight.
 * The locked dice buttons turn red to indicate their status.
 *
 * You can continue rolling the dice until you run out of rolls or choose to give the turn to the next player.
 * However, once you pass the turn, you cannot lock the dice from your previous roll.
 * The game progresses in this manner until all players exhaust their rolls.
 *
 * Upon completing all rolls, the game announces the winner or if there's a tie, specifying the respective dice values.
 * The timer stops, and from here, you have the option to start a new game with the same set of players or
 * exit the game entirely by selecting "Quit."
 *
 */

#include "mainwindow.hh"
#include "gameengine.hh"

#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    w.show();
    return a.exec();
}
