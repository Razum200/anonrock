let oreParticles = [];
let pickaxeRotation;
let rotationSpeed = 0;
let miningProgress = false;
let backgroundImage, oreImage;
let anonOreCount = 0;
let orePerSecond = 0.00000001;
let isMining = false;
let pickaxeImage;
let canvas;

// Константы для настройки
const CANVAS_SIZE = 400;
const PICKAXE_SIZE = 150;
const PARTICLE_GENERATION_INTERVAL = 50;
const PARTICLE_FADE_SPEED = 5;
const PARTICLE_MOVEMENT_DURATION = 90;

function preload() {
  backgroundImage = loadImage('monstro_tr.png');
  oreImage = loadImage('8.png');
  pickaxeImage = loadImage('pixaxe.png');
}

function setup() {
  canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  pickaxeRotation = -PI / 5;
  
  createMiningButtons();
  
  // Центрирование канваса
  const canvasElement = canvas.elt;
  canvasElement.style.display = 'block';
  canvasElement.style.margin = 'auto';
}

function createMiningButtons() {
  const buyPickaxeButton = createButton('Купить кирку');
  styleFuturisticButton(buyPickaxeButton, 20, -40);
  buyPickaxeButton.mousePressed(activateMining);

  const buyRockButton = createButton('Купить скалу');
  styleFuturisticButton(buyRockButton, 250, -40);
  buyRockButton.mousePressed(() => alert('Скалы пока недоступны!'));
}

function activateMining() {
  if (!isMining) {
    isMining = true;
    miningProgress = true;
    console.log('Кирка куплена! Добыча активирована.');
  }
}

function draw() {
  background(backgroundImage);
  updateCounterPosition();
  
  if (isMining) {
    updateMining();
    animatePickaxe();
    handleParticleGeneration();
  }

  // Отображение частиц
  oreParticles = oreParticles.filter(ore => {
    ore.move();
    ore.display();
    return ore.alpha > 0;
  });
}

function updateCounterPosition() {
  const counterBox = document.querySelector('.counter-box');
  if (counterBox) {
    const canvasRect = canvas.elt.getBoundingClientRect();
    Object.assign(counterBox.style, {
      position: 'absolute',
      top: `${canvasRect.bottom - counterBox.offsetHeight}px`,
      left: `${canvasRect.left}px`,
      width: `${canvasRect.width}px`
    });
  }
}

function updateMining() {
  anonOreCount += orePerSecond / frameRate();
  const counter = document.querySelector('#counter');
  if (counter) {
    counter.innerText = anonOreCount.toFixed(8);
  }
}

function animatePickaxe() {
  push();
  translate(width / 2, height / 2);
  rotate(pickaxeRotation);
  imageMode(CENTER);
  image(pickaxeImage, 0, 0, PICKAXE_SIZE, PICKAXE_SIZE);
  pop();

  if (miningProgress) {
    pickaxeRotation += rotationSpeed;
    if (pickaxeRotation > 0) {
      rotationSpeed = -0.1;
    }
    if (pickaxeRotation <= -PI / 3) {
      resetPickaxeAnimation();
    }
  }
}

function resetPickaxeAnimation() {
  miningProgress = false;
  rotationSpeed = 0;
  pickaxeRotation = -PI / 5;
}

function handleParticleGeneration() {
  if (frameCount % PARTICLE_GENERATION_INTERVAL === 0) {
    generateOreParticles();
    miningProgress = true;
    rotationSpeed = 0.3;
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
    this.speedX = (targetX - x) / PARTICLE_MOVEMENT_DURATION;
    this.speedY = (targetY - y) / PARTICLE_MOVEMENT_DURATION;
    this.alpha = 255;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= PARTICLE_FADE_SPEED;
  }

  display() {
    tint(255, this.alpha);
    image(oreImage, this.x, this.y, this.size, this.size);
    noTint();
  }
}

function styleFuturisticButton(button, x, y) {
  const buttonStyles = {
    backgroundColor: 'rgba(50, 200, 255, 0.8)',
    border: '2px solid rgba(100, 255, 200, 0.8)',
    borderRadius: '10px',
    padding: '10px 20px',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    outline: 'none'
  };

  Object.assign(button.style, buttonStyles);
  button.position(canvas.position().x + x, canvas.position().y + height + y);

  button.mouseOver(() => {
    button.style('background-color', 'rgba(100, 255, 200, 0.8)');
    button.style('transform', 'scale(1.1)');
  });

  button.mouseOut(() => {
    button.style('background-color', 'rgba(50, 200, 255, 0.8)');
    button.style('transform', 'scale(1.0)');
  });
}
