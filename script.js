const buttons = document.querySelectorAll("button:not(#reset)");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const historyLog = document.getElementById("history-log");
const resetBtn = document.getElementById("reset");

let playerScore = 0;
let computerScore = 0;
let round = 1;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const player = button.id;
    const computer = getComputerChoice();
    const outcome = getResult(player, computer);

    updateScores(outcome);
    updateResultText(outcome, player, computer);
    updateHistory(round++, player, computer, outcome);
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  resultEl.textContent = "Make your move!";
  historyLog.innerHTML = "";
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function updateScores(result) {
  if (result === "win") playerScore++;
  if (result === "lose") computerScore++;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function updateResultText(result, player, computer) {
  const emojis = {
    rock: "✊",
    paper: "🖐️",
    scissors: "✌️"
  };
  let message = "";

  switch (result) {
    case "win":
      message = `You win! ${emojis[player]} beats ${emojis[computer]}`;
      break;
    case "lose":
      message = `You lose! ${emojis[computer]} beats ${emojis[player]}`;
      break;
    default:
      message = `It's a tie! You both chose ${emojis[player]}`;
  }

  resultEl.textContent = message;
}

function updateHistory(round, player, computer, outcome) {
  const li = document.createElement("li");
  li.textContent = `Round ${round}: You chose ${player}, Computer chose ${computer} → ${outcome.toUpperCase()}`;
  historyLog.prepend(li);
}
