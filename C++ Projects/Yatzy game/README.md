Yatzy rules:

The player can lock the dice they want, and only the unlocked dice will be rolled again in the next rolling turn.

When all players have taken their turns or when the game is decided to be terminated (prematurely),
the program indicates who won or if there was a tie among the players.

The sets of five dice have the following hierarchy (from best to worst):

- Yatzy, i.e., all five dice show the same number.
- Four of a kind, i.e., exactly four dice show the same number.
- Full house, i.e., exactly three dice show the same number, and the other two dice also show the same number.
- Straight, i.e., the numbers 1, 2, 3, 4, and 5 or the numbers 2, 3, 4, 5, and 6.
- Three of a kind, i.e., exactly three dice show the same number.
- Two pairs, i.e., exactly two dice show the same number, and another two dice also show the same number.
- One pair, i.e., exactly two dice show the same number.
- None of the above.

Within the listed categories, there is no hierarchy; for example, a pair of ones is as good as a pair of sixes.


How this program works:

In the Yatzy game, you have the option to add up to four players initially, each with a unique name.
It's not possible to add the same player more than once to ensure fairness.
The game requires a minimum of two players to proceed, and if you attempt to start with less than that,
the system will prompt you to add more players.

Once the minimum number of players is met, the game initiates, and a dedicated game window opens.
This window displays information such as whose turn it currently is, the remaining number of rolls,
and a timer at the top. Additionally, the window exhibits the five dice along with corresponding locking buttons.
Other buttons, including "Roll," "Give Turn," "Reset," and "Quit," are also available.
A pause button freezes the timer and locks all buttons except "Restart" and "Quit," changing its color
to red to signify the pause status.

Upon pressing the roll button, the game reveals the dice values and evaluates if any points are scored
based on the dice value hierarchy. After the initial roll, you can strategically lock specific dice—for example,
if your roll yields 1 1 3 4 5, you might lock 1 1 to aim for a three-of-a-kind or lock 1 3 4 5 for a straight.
The locked dice buttons turn red to indicate their status.

You can continue rolling the dice until you run out of rolls or choose to give the turn to the next player.
However, once you pass the turn, you cannot lock the dice from your previous roll.
The game progresses in this manner until all players exhaust their rolls.

Upon completing all rolls, the game announces the winner or if there's a tie, specifying the respective dice values.
The timer stops, and from here, you have the option to start a new game with the same set of players or
exit the game entirely by selecting "Quit."
