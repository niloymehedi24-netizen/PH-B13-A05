const login = () => {

    const nameInput = document.getElementById("user-name");
    const userName = nameInput.value;
    console.log(userName);
  
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;
    console.log(password);

  if (userName === "admin" && password === "admin123") {

    localStorage.setItem("login", "true")
    window.location.href = "./index.html"

  } else {

    alert("Incorrect username or password")
  }
}