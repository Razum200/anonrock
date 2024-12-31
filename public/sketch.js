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
  backgroundImage = loadImage('monstro_tr.png'); // Фон
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
      miningProgress = true; // Запускаем анимацию кирки
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
  background(backgroundImage); // Отображение фона

  // Привязываем счётчик к нижней части холста
  const counterBox = document.querySelector('.counter-box');
  if (counterBox) {
    const canvasRect = canvas.elt.getBoundingClientRect(); // Получаем размеры холста
    counterBox.style.position = 'absolute';
    counterBox.style.top = `${canvasRect.bottom - counterBox.offsetHeight}px`; // Привязываем к нижней границе холста
    counterBox.style.left = `${canvasRect.left}px`; // Центрируем горизонтально
    counterBox.style.width = `${canvasRect.width}px`; // Растягиваем счётчик по ширине холста
  }

  // Обновляем значение счётчика
  if (isMining) {
    anonOreCount += orePerSecond / frameRate(); // Увеличиваем значение руды
    document.querySelector('#counter').innerText = anonOreCount.toFixed(8); // Обновляем DOM
  }

  // Анимация кирки
  if (isMining) {
    push();
    translate(width / 2, height / 2);
    rotate(pickaxeRotation);
    imageMode(CENTER);
    image(pickaxeImage, 0, 0, 150, 150);
    pop();

    if (miningProgress) {
      pickaxeRotation += rotationSpeed;
      if (pickaxeRotation > 0) {
        rotationSpeed = -0.1;
      }
      if (pickaxeRotation <= -PI / 3) {
        miningProgress = false;
        rotationSpeed = 0;
        pickaxeRotation = -PI / 5;
      }
    }

    // Генерация частиц
    if (frameCount % 50 === 0) {
      generateOreParticles();
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

function generateOreParticles() {
  const counterBox = document.querySelector('.counter-box');
  if (!counterBox) return;

  const rect = counterBox.getBoundingClientRect();
  const targetX = random(rect.left, rect.right);
  const targetY = random(rect.top, rect.bottom);

  oreParticles.push(new Ore(width / 2, height / 2, targetX, targetY));
}

class Ore {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = random(1, 48);
    this.speedX = (targetX - x) / 90;
    this.speedY = (targetY - y) / 90;
    this.alpha = 255;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 5;
    if (this.alpha <= 0) {
      const index = oreParticles.indexOf(this);
      if (index > -1) oreParticles.splice(index, 1);
    }
  }

  display() {
    tint(255, this.alpha);
    image(oreImage, this.x, this.y, this.size, this.size);
  }
}

function styleFuturisticButton(button, x, y) {
  button.style('background-color', 'rgba(50, 200, 255, 0.8)');
  button.style('border', '2px solid rgba(100, 255, 200, 0.8)');
  button.style('border-radius', '10px');
  button.style('padding', '10px 20px');
  button.style('color', 'white');
  button.style('font-size', '14px');
  button.style('font-family', 'Arial, sans-serif');
  button.style('transition', '0.3s ease-in-out');
  button.position(canvas.position().x + x, canvas.position().y + height + y);
  button.mouseOver(() => {
    button.style('background-color', 'rgba(100, 255, 200, 0.8)');
    button.style('transform', 'scale(1.1)';
  });
  button.mouseOut(() => {
    button.style('background-color', 'rgba(50, 200, 255, 0.8)');
    button.style('transform', 'scale(1.0)';
  });
}
