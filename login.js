// Canviar entre formularis
document.getElementById("switchToRegister").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("loginFormContainer").style.display = "none";//amaga formulari inici sessio
  document.getElementById("registerFormContainer").style.display = "block"; //mostra formulari de registre
});

document.getElementById("switchToLogin").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("registerFormContainer").style.display = "none"; //amaga formulari de registre
  document.getElementById("loginFormContainer").style.display = "block";//mostra formulari inici sessio
});

// Registre d'usuari
document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let locality = document.getElementById("locality").value;
  let email = document.getElementById("emailRegister").value;
  let password = document.getElementById("passwordRegister").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  if (password !== confirmPassword) {
    document.getElementById("registerErrorMessage").textContent = "Les contrasenyes no coincideixen!";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        locality,
        email,
        password,
        phoneNumber,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuari creat amb èxit!");
      window.location.href = "/login.html";  // Redirigir a la pàgina d'inici de sessió
    } else {
      document.getElementById("registerErrorMessage").textContent = data.msg || "Error desconegut";
    }
  } catch (error) {
    console.error("Error en la petició:", error);
    document.getElementById("registerErrorMessage").textContent = "Hi ha hagut un problema amb el servidor.";
  }
});

// Quan el login sigui correcte, mostra la pàgina de grups
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Guarda l'ID de l'usuari al localStorage per després usar-lo en la creació de grups
      localStorage.setItem("user_id", data.user_id);
  
      // Amaga la secció d'inici de sessió i mostra la secció de grups
      document.getElementById("loginFormContainer").style.display = "none";
      document.getElementById("registerFormContainer").style.display = "none";
      document.getElementById("groupContainer").style.display = "block";
    } else {
      document.getElementById("error-message").textContent = "Credencials incorrectes";
    }
  });
  
