// ====== CAMBIO ENTRE LOGIN Y REGISTRO ======
const container = document.getElementById('container');
const btnRegistro = document.getElementById('registrarse');
const btnLogin = document.getElementById('iniciar');
const toggleTheme = document.getElementById('toggle-theme');

btnRegistro.addEventListener('click', () => {
  container.classList.add('registro-active');
});

btnLogin.addEventListener('click', () => {
  container.classList.remove('registro-active');
});

// ====== EFECTO DE PARTÍCULAS ======
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.02;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    const speedX = (Math.random() - 0.5) * 1;
    const speedY = (Math.random() - 0.5) * 1;
    const color = `hsl(${hue}, 100%, 50%)`;
    particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    const p = particlesArray[i];
    p.update();
    p.draw();
    if (p.size <= 0.2) {
      particlesArray.splice(i, 1);
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      const speedX = (Math.random() - 0.5) * 1;
      const speedY = (Math.random() - 0.5) * 1;
      const color = `hsl(${hue}, 100%, 50%)`;
      particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 0.5;
  requestAnimationFrame(animate);
}

init();
animate();

// ====== MODO OSCURO / CLARO ======
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleTheme.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});


