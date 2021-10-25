
// Start global variables
const startGame = () => {

    player1Name = document.getElementById('p1-name').value;
    player2Name = document.getElementById('p2-name').value;
    plays = 0;

    // Check if the 2 players names are filled and then, hide/show html containers
    if (player1Name && player2Name) {
        document.getElementById('pre-game').style.display = 'none';
        document.getElementById('in-game-holder').style.display = 'flex';
        softReset();
        var playTime = (playTime == player2 || playTime == undefined) ? player1 : player2;
    } else {
        alert("Can't use empty names!");
    }
}

var player1Name = "";
var player2Name = "";

const player1 = "x";
const player2 = "o";
var playTime = undefined;
var gameOver = false;
var moves = [];


// Reset game continue playing the same players
const softReset = () => {
    plays = 0;
    gameOver = false;
    moves = [];
    updateHeader();
    initializePosition();
}

// Reset the game asking for 2 players names
const hardReset = () => {
    plays = 0;
    document.getElementById('pre-game').style.display = 'flex';
    document.getElementById('in-game-holder').style.display = 'none';
    softReset();
}


// =============================================================================


// Set header information with player's name who will play
function updateHeader() {

    if (gameOver) { return; }

    if (playTime == player1) {
        document.getElementById("current-player").innerHTML = player1Name;
        var player = document.getElementById("imgplayer");
        player.setAttribute("src", "images/x.png");

    } else {
        document.getElementById("current-player").innerHTML = player2Name;
        var player = document.getElementById("imgplayer");
        player.setAttribute("src", "images/o.png");
    }

}

// Control players moves filling the position attribute on position click and insert the player's image
function initializePosition() {
    document.getElementById('in-game-holder').classList.remove("gameover");
    document.getElementById('in-game-holder').classList.remove("tie");
    var positions = document.getElementsByClassName("position");

    for (var i = 0; i < positions.length; i++) {
        const position = positions[i];
        positions[i].setAttribute('movement', '');
        positions[i].innerHTML = '';
        positions[i].addEventListener("click", function () {
            if (gameOver) { return; }

            moves.push({
                location: position.id,
                player: playTime
            })

            if (this.getElementsByTagName("img").length == 0) {
                if (playTime == player1) {
                    this.innerHTML = "<img src='images/x.png'>";
                    this.setAttribute("movement", player1Name);
                    playTime = player2;
                } else {
                    this.innerHTML = "<img src='images/o.png'>";
                    this.setAttribute("movement", player2Name);
                    playTime = player1;
                }
                if (!hasWinner()) {
                    updateHeader();
                }
            }

        }

        );
    }
}

//Check if has winner in all moves
function hasWinner() {

    // Store all positions atributes
    var a1 = document.getElementById("a1").getAttribute("movement");
    var a2 = document.getElementById("a2").getAttribute("movement");
    var a3 = document.getElementById("a3").getAttribute("movement");

    var b1 = document.getElementById("b1").getAttribute("movement");
    var b2 = document.getElementById("b2").getAttribute("movement");
    var b3 = document.getElementById("b3").getAttribute("movement");

    var c1 = document.getElementById("c1").getAttribute("movement");
    var c2 = document.getElementById("c2").getAttribute("movement");
    var c3 = document.getElementById("c3").getAttribute("movement");

    //Create a matrix with all positions attributes
    var board = [
        [a1, a2, a3],
        [b1, b2, b3],
        [c1, c2, c3],
    ]

    //Replaces player names in matrix positions with numbers
    var boardMatrix = board.map(column => {
        return column.map(space => {
            if (space === player1Name)
                return -1
            else if (space === player2Name)
                return 1
            else
                return 0
        })
    });

    var winner = checkWinnerMatrix(boardMatrix);
    
    if (winner != "") {
        //Hightlight the board and print winner's name
        const winnerName = winner < 0 ? player1Name : player2Name
        gameOver = true;
        document.getElementById('in-game-holder').classList.add("gameover");
        document.getElementById('winner-name').innerHTML = winnerName;

        //Save result in database and update the last 5 results grid
        storeResultInDataBase({
            winner_name: winnerName
        });

        return true
    } else if (plays == 9) {
        // Highlight the board and print Tie Message
        gameOver = true;
        document.getElementById('in-game-holder').classList.add("tie");


        //Save result in database and update the last 5 results grid
        storeResultInDataBase({
            winner_name: "Tie"
        });
    }

    return false
}

function checkWinnerMatrix(matrix) {

    const arr = matrix;

    plays += 1;

    //Sum all positions attribute line by line to check if has winner
    for (var i = 0; i < 3; i++) {
        var rowSum = 0;
        for (var j = 0; j < 3; j++) {
            rowSum += arr[i][j];
        }
        if (rowSum === 3) {
            return 1
        }
        else if (rowSum === -3) {
            return -1
        }
    }

    //Sum all positions attribute column by column to check if has winner
    for (var i = 0; i < 3; i++) {
        var colSum = 0;
        for (var j = 0; j < 3; j++) {
            colSum += arr[j][i];
        }
        if (colSum === 3) {
            return 1
        }
        else if (colSum === -3) {
            return -1
        }
    }

    //Sum all diagonal positions attribute to check if has winner
    if (arr[0][0] + arr[1][1] + arr[2][2] === 3)
        return 1
    else if (arr[0][0] + arr[1][1] + arr[2][2] === -3)
        return -1

    if (arr[2][0] + arr[1][1] + arr[0][2] === 3)
        return 1
    else if (arr[2][0] + arr[1][1] + arr[0][2] === -3)
        return -1


    return "";
}
