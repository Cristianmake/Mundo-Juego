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
