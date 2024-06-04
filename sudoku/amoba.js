document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.tic-tac-toe-cell');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let gameActive = true;

    startGame();

    restartButton.addEventListener('click', startGame);

    function startGame() {
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.addEventListener('click', handleCellClick, { once: true });
        });
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (gameActive && !cell.innerHTML) {
            cell.innerHTML = currentPlayer;
            if (checkWin(currentPlayer)) {
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function endGame(draw) {
        if (draw) {
            alert('Draw!');
        } else {
            alert(`${currentPlayer === 'X' ? "X's" : "O's"} Wins!`);
        }
        gameActive = false;
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.innerHTML !== '';
        });
    }

    function checkWin(player) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cells[index].innerHTML === player;
            });
        });
    }
});