/**
 * Crystal Gatherer Game Logic
 */

// Game Class
// --------------------------------------------------
class Game {
    // Constructor -->
    constructor() {
        this._targetScore = getRandomNum(120, 19);
        this._gemScores = [
            getRandomNum(12, 1),
            getRandomNum(12, 1),
            getRandomNum(12, 1),
            getRandomNum(12, 1)
        ];
        this._playerScore = 0;
        this._winTracker = 0;
        this._lossTracker = 0;
        this._roundOver = false;
        this._playerWin = false;
        this._status = "Playing...";
    }

    // Getters -->
    get targetScore() {
        return this._targetScore;
    }

    get gemScores() {
        return this._gemScores;
    }

    get playerScore() {
        return this._playerScore;
    }

    get winTracker() {
        return this._winTracker;
    }

    get lossTracker() {
        return this._lossTracker;
    }

    get roundOver() {
        return this._roundOver;
    }

    get playerWin() {
        return this._playerWin;
    }

    get status() {
        return this._status;
    }

    // Setters -->    
    set playerScore(score) {
        if (typeof score === "number") {
            this._playerScore = score;
        } else {
            console.error("Error: unable to update player score");
        }
    }

    set roundOver(done) {
        if (typeof done === "boolean") {
            this._roundOver = done;
        }
    }

    set winTracker(val) {
        if (typeof val === "number" && !isNaN(val)) this._winTracker = val;
    }

    set lossTracker(val) {
        if (typeof val === "number" && !isNaN(val)) this._lossTracker = val;
    }

    set playerWin(won) {
        if (typeof won === "boolean") {
            this._playerWin = won;
        }
    }

    set status(stat) {
        if (typeof stat === "string") this._status = stat;
    }

    // Update wins -->
    updateWins() {
        this._winTracker += 1;
    }

    // Update losses -->
    updateLosses() {
        this._lossTracker += 1;
    }

    // Add gem value -->
    addGemVal(gemVal) {
        this.playerScore += parseInt(gemVal, 10);
    }

    // Assign gem values -->
    assignGemVals(gems) {
        gems.each(function(i) {
            $(this).attr("value", game.gemScores[i]);
        });
    }

    // Check score -->
    checkScore() {
        if (this.playerScore <= this.targetScore) {
            if (this.playerScore === this.targetScore) {
                this.playerWin = true;
                this.roundOver = true;
            }
        } else {
            this.roundOver = true;
        }
    }

    // Evaluate round end -->
    evaluateRoundEnd() {
        if (this.roundOver) {
            if (this.playerWin) {
                this.updateWins();
                this.status = "You Win!";
            } else {
                this.updateLosses();
                this.status = "You Lose!";
            }
        }
    }

    // Round setup -->
    roundSetup() {
        this._targetScore = getRandomNum(120, 19);
        this._gemScores = [
            getRandomNum(12, 1),
            getRandomNum(12, 1),
            getRandomNum(12, 1),
            getRandomNum(12, 1)
        ];
        this.playerScore = 0;
        this.roundOver = false;
        this.playerWin = false;
    }

    // Reset win/loss trackers -->
    resetTrackers() {
        this.winTracker = 0;
        this.lossTracker = 0;
    }
}
 
// DOM selections
// --------------------------------------------------
const gems = $(".gem");

// Global variables
// --------------------------------------------------
const game = new Game();
let roundOver = false;

// Functions
// --------------------------------------------------
// Get random number -->
function getRandomNum(max, min) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// Populate status & player score -->
function updatePlayerScoreStatus() {
    $(".status-tracker").text(game.status);
    $(".player-score").text(game.playerScore);
}

// Populate target score & win/loss trackers -->
function updateTrackers() {
    $(".win-tracker").text(game.winTracker);
    $(".loss-tracker").text(game.lossTracker);
}

// Populate target score -->
function updateTarget() {
    $(".target-score").text(game.targetScore);
}

// Main processes
// --------------------------------------------------
// Assign gem values -->
game.assignGemVals(gems);

// Populate all HTML -->
updateTarget();
updateTrackers();
updatePlayerScoreStatus();

// When any gem is clicked -->
$(".gem").on("click", function() {
    const val = $(this).attr("value"),
    gemColor = $(this).attr("data-gem");

    game.status = `${gemColor} added`;
    game.addGemVal(val);
    game.checkScore();
    game.evaluateRoundEnd();

    if (game.roundOver) {
        game.roundSetup();
        game.assignGemVals(gems);
        updateTarget();
        updateTrackers();
    }

    updatePlayerScoreStatus();
});

// When reset button is clicked -->
$(".reset").on("click", function() {
    game.roundSetup();
    game.resetTrackers();
    game.assignGemVals(gems);
    updateTarget();
    updateTrackers();
    updatePlayerScoreStatus();
});
