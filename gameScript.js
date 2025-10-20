document.addEventListener('DOMContentLoaded', () => {
    // Set player names on page load
    document.getElementById("name1").innerText = sessionStorage.getItem("p1Name") || "Player 1 (✕)";
    document.getElementById("name2").innerText = sessionStorage.getItem("p2Name") || "Player 2 (◯)";

    // Update the player names used in the game logic variables 
    // after the DOM is loaded to ensure sessionStorage values are available.
    name1 = document.getElementById("name1").innerText;
    name2 = document.getElementById("name2").innerText;
    
    // Initialize the board for the first time on page load
    resetBoard();
});

// Use global variables for player names
let name1 = sessionStorage.getItem("p1Name") || "Player 1 (✕)";
let name2 = sessionStorage.getItem("p2Name") || "Player 2 (◯)";

// Game state variables
let turn = 0; // 0 for Player 1 (✕), 1 for Player 2 (◯)
let points1 = 0;
let points2 = 0;
let isGameOver = false; // Flag to stop clicks after a win/draw

const playerCell = document.getElementById("span4"); // Element to show whose turn it is
const win1 = "✕✕✕";
const win2 = "◯◯◯";

// Helper function to get the current symbol
const getCurrentSymbol = (t) => t % 2 === 0 ? "✕" : "◯";

/**
 * Checks all rows, columns, and diagonals for a winner.
 * @returns {number} 1 for Player 1 win, 2 for Player 2 win, -1 otherwise.
 */
checkIfWon = () => {
    // A more efficient way to get all cell contents for checking
    const cells = [];
    for (let r = 0; r < 3; r++) {
        cells[r] = [];
        for (let c = 0; c < 3; c++) {
            cells[r][c] = document.getElementById(`cell${r}${c}`).innerText;
        }
    }

    // --- Check Rows and Columns ---
    for (let i = 0; i < 3; i++) {
        // Check Row i
        const rowString = cells[i].join('');
        if (rowString === win1) return 1;
        if (rowString === win2) return 2;

        // Check Column i
        const colString = cells[0][i] + cells[1][i] + cells[2][i];
        if (colString === win1) return 1;
        if (colString === win2) return 2;
    }

    // --- Check Diagonals ---

    // Primary Diagonal (00, 11, 22)
    const diag1 = cells[0][0] + cells[1][1] + cells[2][2];
    if (diag1 === win1) return 1;
    if (diag1 === win2) return 2;

    // Secondary Diagonal (02, 11, 20)
    const diag2 = cells[0][2] + cells[1][1] + cells[2][0];
    if (diag2 === win1) return 1;
    if (diag2 === win2) return 2;

    return -1; // No winner yet
}

/**
 * Resets the board and game state for a new round.
 */
resetBoard = () => {
    // Clear all cell contents
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.getElementById(`cell${row}${col}`).innerText = "";
        }
    }

    // Reset game state
    turn = 0;
    isGameOver = false;
    
    // Update the turn indicator
    playerCell.innerText = `${name1}'s turn ${getCurrentSymbol(turn)}`;
}

// --- Attach click handlers and game loop ---

for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {

        let cell = document.getElementById(`cell${row}${col}`);
            
        cell.addEventListener("click", () => {
            // Stop if the game is over or the cell is already taken
            if (isGameOver || cell.innerText !== "") {
                return;
            }
            
            // 1. Place the symbol
            const currentSymbol = getCurrentSymbol(turn);
            cell.innerText = currentSymbol;
            
            // 2. Check for winner
            let winner = checkIfWon();

            if (winner !== -1) {
                // Game is won
                isGameOver = true;
                const winnerName = winner === 1 ? name1 : name2;
                alert(`${winnerName} won! 🎉`);

                if (winner === 1) {
                    points1++;
                    document.getElementById("score1").innerText = points1;
                } else { // winner === 2
                    points2++;
                    document.getElementById("score2").innerText = points2;
                }
                
                // Reset the board for the next round after a brief moment
                setTimeout(resetBoard, 500); // 1.5 seconds delay

            } else if (turn === 8) { 
                // 3. Check for a draw (only possible on the 9th move, turn index 8)
                isGameOver = true;
                alert("It's a draw! No one won! 🤝");

                // Reset the board for the next round after a brief moment
                setTimeout(resetBoard, 500); // 1.5 seconds delay

            } else {
                // 4. Continue the game
                turn++;
                // Update the turn indicator
                const nextPlayerName = turn % 2 === 0 ? name1 : name2;
                const nextSymbol = getCurrentSymbol(turn);
                playerCell.innerText = `${nextPlayerName}'s turn ${nextSymbol}`;
            }
        });
    }
}