const getUsers = async function () {
  const response = await fetch("./data/users.json");
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return false;
};

document.querySelector(".button").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  getUsers().then((users) => {
    if (users) {
      const foundUser = users.find(
        (u) => u.email === email.trim() && u.password === password.trim()
      );
      if (foundUser) {
        localStorage.setItem("user_id", foundUser.id);
        localStorage.setItem("email", foundUser.email);
        localStorage.setItem("role", foundUser.role);
        window.location.href = "index.html";
      } else {
        alert("Utilisateur ou mot de passe incorrect.");
      }
    } else {
      alert("Erreur lors de la récupération des utilisateurs.");
    }
  });
});
