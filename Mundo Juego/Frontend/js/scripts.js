// Validar formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form");

  if(contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("input[type=text]").value.trim();
      const email = contactForm.querySelector("input[type=email]").value.trim();
      const message = contactForm.querySelector("textarea").value.trim();

      if(name === "" || email === "" || message === "") {
        alert("Por favor completa todos los campos.");
      } else {
        alert("Mensaje enviado correctamente.");
        contactForm.reset();
      }
    });
  }

  // Toggle entre login y registro
  const loginSection = document.querySelector(".auth section:nth-child(1)");
  const registerSection = document.querySelector(".auth section:nth-child(2)");

  if(loginSection && registerSection) {
    const toggleBtns = document.createElement("div");
    toggleBtns.innerHTML = `
      <button id="showLogin">Login</button>
      <button id="showRegister">Registro</button>
    `;
    document.querySelector(".auth").prepend(toggleBtns);

    document.getElementById("showLogin").addEventListener("click", () => {
      loginSection.style.display = "block";
      registerSection.style.display = "none";
    });

    document.getElementById("showRegister").addEventListener("click", () => {
      loginSection.style.display = "none";
      registerSection.style.display = "block";
    });

    // Inicial
    loginSection.style.display = "block";
    registerSection.style.display = "none";
  }

  // Botones dinámicos en admin
  const adminButtons = document.querySelectorAll("button");
  adminButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert(`Has presionado el botón: ${btn.textContent}`);
    });
  });
});

//COLGUE CARRUCEL//
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Funcionalidad 1: Simular carga de posts (Futura integración con Backend)
    // ----------------------------------------------------
    
    // NOTA: Esta es una simulación. En el proyecto real, usarías
    // la función 'fetch()' para obtener datos del servidor (Node.js/Express).

    const postsData = [
        // Los dos primeros posts ya están en el HTML, agregamos uno más para mostrar la lógica JS
        { id: 3, title: "Introducción a Node.js", date: "25 de Octubre, 2025", summary: "Aprende los fundamentos de Node.js, Express y cómo crear un servidor backend.", image: "" },
        { id: 4, title: "Bases de Datos con MySQL", date: "20 de Octubre, 2025", summary: "Configuración, consultas básicas y conexión de MySQL con tu aplicación web.", image: "" }
    ];

    const postsContainer = document.getElementById('posts-container');

    postsData.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-info">
                <h3>${post.title}</h3>
                <p class="post-date">Publicado el ${post.date}</p>
                <p class="post-summary">${post.summary}</p>
                <a href="post-detail.html?id=${post.id}" class="read-more">Leer más &raquo;</a>
            </div>
        `;
        postsContainer.appendChild(article);
    });

    // ----------------------------------------------------
    // Funcionalidad 2: Interacción Simple (Ejemplo)
    // ----------------------------------------------------
    
    // Pequeño ejemplo de interactividad: Resaltar la sección de publicaciones al cargar
    const blogSection = document.getElementById('blog');
    blogSection.style.opacity = 0;
    setTimeout(() => {
        blogSection.style.transition = 'opacity 1s ease-in-out';
        blogSection.style.opacity = 1;
    }, 500);

    console.log("Blog Master - Frontend inicializado.");
});

// --- Lógica del Carrusel ---
const slider = document.getElementById('carouselSlider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.getElementById('carouselDots');
const items = Array.from(slider.children);
const totalItems = items.length;
let currentIndex = 0;
let itemsPerView = 1; // Se ajustará en el resize

// Función para obtener el número de items visibles
function getItemsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

// Inicializa los puntos de navegación (dots)
function createDots() {
    dotsContainer.innerHTML = ''; // Limpiar dots
    const numDots = Math.ceil(totalItems / itemsPerView);
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = i * itemsPerView; // Guardamos el índice del primer item
        dot.addEventListener('click', () => {
            currentIndex = i * itemsPerView;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

// Actualiza la posición del carrusel y el estado de los dots
function updateCarousel() {
    const maxIndex = totalItems - itemsPerView;
    
    // Asegurarse de que el índice no exceda el límite
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }

    const offset = (-currentIndex / itemsPerView) * 100;
    slider.style.transform = `translateX(${offset}%)`;

    // Actualizar el estado de los dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    
    // El punto activo es el que contiene el currentIndex
    const activeDotIndex = Math.floor(currentIndex / itemsPerView);
    if (dots[activeDotIndex]) {
        dots[activeDotIndex].classList.add('active');
    }
}

// Lógica de navegación con botones
prevBtn.addEventListener('click', () => {
    currentIndex -= itemsPerView;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex += itemsPerView;
    updateCarousel();
});

// Manejar el redimensionamiento de la ventana para adaptar el carrusel
window.addEventListener('resize', () => {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        createDots(); // Recalcular dots
        updateCarousel();
    }
});

// Inicialización
itemsPerView = getItemsPerView();
createDots();
updateCarousel();

