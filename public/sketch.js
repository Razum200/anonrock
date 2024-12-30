let oreParticles = []; // Массив для частиц руды
let pickaxeRotation; // Начальный угол вращения кирки
let rotationSpeed = 0; // Скорость вращения кирки
let miningProgress = false; // Флаг для движения кирки
let backgroundImage, oreImage; // Изображения фона и частиц

let anonOreCount = 0; // Количество АНОНимной руды
let orePerSecond = 0.00000001; // Скорость добычи руды
let isMining = false; // Флаг включения добычи

let pickaxeImage; // Переменная для изображения кирки
let canvas; // Для привязки кнопок к холсту

function preload() {
  backgroundImage = loadImage('monstro.png'); // Фон
  oreImage = loadImage('8.png'); // Частицы
  pickaxeImage = loadImage('pixaxe.png'); // Кирка
}

function setup() {
  canvas = createCanvas(400, 400); // Создаём холст
  pickaxeRotation = -PI / 5; // Устанавливаем начальный угол вращения кирки

  // Кнопка "Купить кирку"
  const buyPickaxeButton = createButton('Купить кирку');
  styleFuturisticButton(buyPickaxeButton, 20, -40); // Позиция кнопки
  buyPickaxeButton.mousePressed(() => {
    if (!isMining) {
      isMining = true; // Запускаем добычу
      console.log('Кирка куплена! Добыча активирована.');
    }
  });

  // Кнопка "Купить скалу"
  const buyRockButton = createButton('Купить скалу');
  styleFuturisticButton(buyRockButton, 250, -40); // Позиция кнопки
  buyRockButton.mousePressed(() => {
    alert('Скалы пока недоступны!');
  });
}

function draw() {
  background(backgroundImage); // Рисуем фон

  // Обновляем счётчик руды
  if (isMining) {
    anonOreCount += orePerSecond / frameRate();
  }

  // Рисуем счётчик руды
  drawFuturisticCounter();

  // Кирка работает, если добыча активна
  if (isMining) {
    push();
    translate(width / 2, height / 2); // Перемещаем систему координат
    rotate(pickaxeRotation); // Вращаем кирку
    imageMode(CENTER); // Устанавливаем центр изображения
    image(pickaxeImage, 0, 0, 150, 150); // Рисуем кирку
    pop();

    // Анимация движения кирки
    if (miningProgress) {
      pickaxeRotation += rotationSpeed;
      if (pickaxeRotation > 0) {
        rotationSpeed = -0.1;
      }
      if (pickaxeRotation <= -PI / 4) {
        miningProgress = false;
        rotationSpeed = 0;
        pickaxeRotation = -PI / 3;
      }
    }

    // Добавление частиц
    if (frameCount % 60 === 0) {
      oreParticles.push(new Ore(width / 2, height / 2));
      miningProgress = true;
      rotationSpeed = 0.3;
    }
  }

  // Отображение частиц
  for (let ore of oreParticles) {
    ore.move();
    ore.display();
  }
}

function drawFuturisticCounter() {
  const x = width / 1.5; // Центр по горизонтали
  const y = 28; // Расстояние от верхнего края

  // Анимация рамки
  strokeWeight(3);
  stroke(50, 200, 255, sin(frameCount * 0.1) * 128 + 128); // Пульсирующий цвет
  noFill();
  rectMode(CENTER);
  rect(x, y, 250, 60, 15); // Рамка с закруглёнными углами

  // Текст "АНОНимная руда"
  noStroke();
  fill(255, 255, 0); // Желтый цвет
  textSize(20); // Увеличенный размер текста
  textAlign(CENTER, CENTER);
  text('АНОНимная руда', x, y - 10);

  // Отображение количества руды
  fill(50, 255, 150); // Зелёный текст
  textSize(24); // Крупнее для выделения
  text(`${anonOreCount.toFixed(8)}`, x, y + 20);
}

function styleFuturisticButton(button, x, y) {
  button.style('background-color', 'rgba(50, 200, 255, 0.8)');
  button.style('border', '2px solid rgba(100, 255, 200, 0.8)');
  button.style('border-radius', '10px');
  button.style('padding', '10px 20px');
  button.style('color', 'white');
  button.style('font-size', '14px');
  button.style('font-family', 'Arial, sans-serif');
  button.style('transition', '0.3s ease-in-out'); // Анимация при наведении
  button.position(canvas.position().x + x, canvas.position().y + height + y); // Привязка к холсту

  // Добавляем hover-эффект
  button.mouseOver(() => {
    button.style('background-color', 'rgba(100, 255, 200, 0.8)');
    button.style('transform', 'scale(1.1)'); // Увеличиваем кнопку
  });
  button.mouseOut(() => {
    button.style('background-color', 'rgba(50, 200, 255, 0.8)');
    button.style('transform', 'scale(1.0)'); // Возвращаем размер
  });
}

class Ore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(12, 18);
    this.speedX = random(1, 2);
    this.speedY = random(-2, -1);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width || this.y < 0) {
      const index = oreParticles.indexOf(this);
      if (index > -1) {
        oreParticles.splice(index, 1);
      }
    }
  }

  display() {
    image(oreImage, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}
