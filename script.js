let canvas = document.getElementById("snake"); //importando canvas
let context = canvas.getContext("2d"); //renderiza o desenho que vai acontecer no canvas, nesse caso em 2D
let box = 32; //quatos pixels cada "quadradinho" do jogo terá

let snake = []; //array que dará forma a cobrinha
snake[0] = { //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
    x: 8 * box,
    y: 8 * box
};

let direction = "right"; //variável com a direção que ela irá

let food = { //array para fazer com que a comidinha apareça em locais diferentes
    //Math.floor => tira o ponto flutuante do Math.random
    //Math.random => gera um número
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

let count = 0;
let image = new Image(box, box);

function drawImageActualSize() {
    context.drawImage(this, food.x, food.y, this.width, this.height);
};

function criarBG() { //onde irá acontecer com o jogo
    context.fillStyle = "lightgreen"; //trabalha com o estilo do context
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo onde acontecerá o jogo (utiliza-se 4 parâmetros - posição de x, posição de y, altura e largura)
};

function criarCobrinha() { //cria a cobriha 
    for (let i = 0; i < snake.length; i++) {//percorre todo o corpo do array 
        context.fillStyle = "green"; //pintar a cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); //setar o tamanho da cobrinha
    };
};

function drawFood() { //desenha a comidinha da cobrinha
    image.src = './maca.png';
    image.onload = drawImageActualSize;
    //context.fillStyle = "red"; //cor da comidinha
    //context.fillRect(food.x, food.y, box, box); //define as coordenadas que aparecerá a comidinha
};

document.addEventListener('keydown', update); //evento de escuta para leitura do teclado

function update(event) { //número do código (da tecla) setado na variável correspondente
    //direção não pode ser oposta da direção da cobrinha para ela não se "comer" então criou-se uma condição
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
};

function iniciarJogo() { //atualiza o jogo de tempos em tempos

    //lógica com um plano cartesiano que quando a cobrinha chegar na borda, aparece na outra borda ao invés de sumir
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert(`Game over!! 😭\n\nVocê comeu ${count} 🍎`);
        };
    };

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; //array posição 0 de x
    let snakeY = snake[0].y; //array posição 0 de y

    //coordenadas da cobrinha (pelo plano cartesiano)
    if (direction == "right") snakeX += box; //acrescenta um quadradinho de corpinho da cobrinha 
    if (direction == "left") snakeX -= box; //decrementa um quadradinho de corpinho da cobrinha
    if (direction == "up") snakeY -= box; //decrementa um quadradinho de corpinho da cobrinha
    if (direction == "down") snakeY += box; //acrescenta um quadradinho de corpinho da cobrinha


    if (snakeX != food.x || snakeY != food.y) {
        //remove o último elemento
        snake.pop();
    } else {
        count++;
        //gera uma nova comida em novo local
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    };

    //cria uma nova cabeça para a cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //acrescenta na frente, no primeiro elemento a nova cabeça da cobrinha
    snake.unshift(newHead);
};

let jogo = setInterval(iniciarJogo, 100); //função de tempo - intervalo para o jogo ser renovado sem travar

