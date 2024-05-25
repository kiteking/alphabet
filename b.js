let currentColor = 'black';
let isDrawing = false;
let marks = 0;
let currentPage = 0;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function changeColor(color) {
  currentColor = color;
}

function startDrawing(e) {
  isDrawing = true;
  ctx.lineWidth = 30;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    ctx.closePath();
    checkCompletion();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nextPage() {
  if (currentPage < 25) {
    currentPage++;
    loadPage();
  } else {
    document.getElementById('app').style.display = 'none';
    document.getElementById('markPage').style.display = 'block';
  }
}

function loadPage() {
  const letter = alphabet[currentPage];
  document.getElementById('letter').innerText = letter;
  clearCanvas();
  document.getElementById('next').innerText =
    currentPage === 25 ? 'Marks' : 'Next';
  speakLetter();
}

function checkCompletion() {
  // Pseudo code to check if the user covered the letter
  // If yes:
  // marks++;
  // Show green tick
  // For demonstration, we'll assume user completes it correctly
  setTimeout(() => {
    marks++;
    const tick = document.createElement('div');
    tick.style.position = 'absolute';
    tick.style.top = '50%';
    tick.style.left = '50%';
    tick.style.transform = 'translate(-50%, -50%)';
    tick.style.fontSize = '10vh';
    tick.style.color = 'green';
    tick.innerText = '✔';
    document.getElementById('letter-container').appendChild(tick);
    setTimeout(() => tick.remove(), 1000);
  }, 1000);
}

function speakLetter() {
  const letter = alphabet[currentPage];
  const msg = new SpeechSynthesisUtterance(letter);
  window.speechSynthesis.speak(msg);
}

function showMarks() {
  const percentage = (marks / 26) * 100;
  document.getElementById(
    'marksDisplay'
  ).innerText = `Your score: ${percentage}%`;
}

// Load the first page
loadPage();
