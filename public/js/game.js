
// Constantes para el tamaño de las celdas y el tamaño del juego
const CELL_SIZE = 20;
const NUM_COLS = 15;
const NUM_ROWS = 10;
let puntaje = -1;
// Creamos el array de celdas para el juego y la serpiente
let cells = new Array(NUM_COLS);
let snake = [];
for (let i = 0; i < NUM_COLS; i++) {
  cells[i] = new Array(NUM_ROWS);
}
// Coloca una manzana en una posición aleatoria
function placeApple() {
    let col = Math.floor(Math.random() * NUM_COLS);
    let
    row = Math.floor(Math.random() * NUM_ROWS);
    while (cells[col][row] != 0) {
    col = Math.floor(Math.random() * NUM_COLS);
    row = Math.floor(Math.random() * NUM_ROWS);
    }
    cells[col][row] = 2;
    }

// Inicializamos el array de celdas y la serpiente
for (let col = 0; col < NUM_COLS; col++) {
  for (let row = 0; row < NUM_ROWS; row++) {
    cells[col][row] = 0;
  }
}
snake.push({col: 7, row: 5});
cells[7][5] = 1;

// Dirección inicial de la serpiente
let direction = 'right';

// Obtenemos una referencia al canvas y su contexto de dibujo
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Dibujamos el juego en el canvas
function drawGame() {
  // Borramos el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Recorremos el array de celdas y dibujamos cada una
  for (let col = 0; col < NUM_COLS; col++) {
    for (let row = 0; row < NUM_ROWS; row++) {
      // Si la celda está ocupada por la serpiente, dibujamos un cuadrado rojo
      if (cells[col][row] == 1)
{
    if (cells[col][row] == 1) {
        if (col == snake[0].col && row == snake[0].row) {
          ctx.fillStyle = 'green';
        } else {
          ctx.fillStyle = 'red';
        }
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
} else if (cells[col][row] == 2) {
ctx.fillStyle = 'green';
ctx.beginPath();
ctx.arc(col * CELL_SIZE + CELL_SIZE / 2, row * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2, 0, 2 * Math.PI);
ctx.fill();
}
}
}
}
// Función para reiniciar el juego
function resetGame() {
    // Inicializamos el array de celdas y la serpiente
    for (let col = 0; col < NUM_COLS; col++) {
      for (let row = 0; row < NUM_ROWS; row++) {
        cells[col][row] = 0;
      }
    }
    snake = [{col: 7, row: 5}];
    cells[7][5] = 1;
  
    // Dirección inicial de la serpiente
    direction = null;
  
    // Colocamos la primera manzana
    placeApple();
  }
  
// Mueve la serpiente en la dirección actual
function moveSnake() {
// Calculamos la nueva posición de la cabeza de la serpiente
let newHead;
switch (direction) {
case 'up':
newHead = {col: snake[0].col, row: snake[0].row - 1};
break;
case 'down':
newHead = {col: snake[0].col, row: snake[0].row + 1};
break;
case 'left':
newHead = {col: snake[0].col - 1, row: snake[0].row};
break;
case 'right':
newHead = {col: snake[0].col + 1, row: snake[0].row};
break;
}

async function update(puntaje) {
  const id = btnid.dataset.id;
  try {
    const data = await fetch(`/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({puntaje:puntaje})
    })
    const res = await data.json();
    console.log(res);
    alert(res.mensaje);
  } catch (error) {
    console.log(error);
    alert(res.mensaje);
  }
}

// Si la nueva cabeza de la serpiente choca con una pared o con su propio cuerpo, finalizamos el juego
if (newHead.col < 0 || newHead.col >= NUM_COLS || newHead.row < 0 || newHead.row >= NUM_ROWS || cells[newHead.col][newHead.row] == 1) {
alert("Game Over")
update(puntaje);
puntaje = 0;
resetGame();
return;
}

// Si la nueva cabeza de la serpiente coincide con la posición de una manzana, aumentamos la longitud de la serpiente
// y colocamos una nueva manzana en una posición aleatoria
if (cells[newHead.col][newHead.row] == 2) {
snake.unshift(newHead);
cells[newHead.col][newHead.row] = 1;
placeApple();
}
// Si no, simplemente movemos la serpiente eliminando su cola y agregando una nueva cabeza
else {
snake.unshift(newHead);
cells[newHead.col][newHead.row] = 1;
let tail = snake.pop();
cells[tail.col][tail.row] = 0;
}
}



// Cambia la dirección de la serpiente según la tecla presionada
document.addEventListener('keydown', event => {
switch (event.key) {
case 'ArrowUp':
if (direction != 'down') {
direction = 'up';
}
break;
case 'ArrowDown':
if (direction != 'up') {
direction = 'down';
}
break;
case 'ArrowLeft':
if (direction != 'right') {
direction = 'left';
}
break;
case 'ArrowRight':
if (direction != 'left') {
direction = 'right';
}
break;
}
});

  // Función para actualizar la puntuación
  function updatePuntaje() {
    puntaje++;
    document.getElementById('puntaje').innerHTML = puntaje;
  }
function placeApple() {
    let col = Math.floor(Math.random() * NUM_COLS);
    let row = Math.floor(Math.random() * NUM_ROWS);
    while (cells[col][row] != 0) {
      col = Math.floor(Math.random() * NUM_COLS);
      row = Math.floor(Math.random() * NUM_ROWS);
    }
    cells[col][row] = 2;
    updatePuntaje();
  }
  

// Llamamos a la función de movimiento inicialmente y luego cada 100 milisegundos
moveSnake();
setInterval(moveSnake, 100);

// Llamamos a la función de dibujo cada vez que se mueve la serpiente
setInterval(drawGame, 100);

// Colocamos la prim
placeApple(); 