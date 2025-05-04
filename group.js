// Quan l'usuari faci clic per generar un codi de grup
document.getElementById("generateGroupCodeBtn").addEventListener("click", async function () {
    const userId = localStorage.getItem("user_id");  // Suponem que l'ID de l'usuari està guardat al localStorage
  
    const response = await fetch("/api/generate_group_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: userId })
    });
  
    const data = await response.json();
    if (response.ok) {
      document.getElementById("generatedGroupCode").textContent = `El teu codi de grup és: ${data.group_code}`;
    } else {
      alert("Error al generar el codi de grup");
    }
  });
  
  // Quan l'usuari faci clic per unir-se a un grup
  document.getElementById("joinGroupBtn").addEventListener("click", async function () {
    const userId = localStorage.getItem("user_id");  // Suponem que l'ID de l'usuari està guardat al localStorage
    const groupCode = document.getElementById("joinGroupCode").value;
  
    const response = await fetch("/api/join_group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        group_code: groupCode
      })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert("Has entrat al grup correctament!");
    } else {
      document.getElementById("joinErrorMessage").textContent = data.error || "Error desconegut";
    }
  });
  