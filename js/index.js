function getUsers() {
  let saved = localStorage.getItem("users");

  if (saved === null) {
    return [
      { name: "Admin", studentId: "", email: "admin@test.com", password: "admin", role: "admin" }
    ];
  }

  return JSON.parse(saved);
}

function clearForm() {
  let form = document.querySelector("form");

  if (form !== null) {
    form.reset();
  }
}

function register() {
  let name = document.getElementById("Inputname").value.trim(),
      studentId = document.getElementById("Inputid").value.trim(),
      email = document.getElementById("InputEmail").value.trim(),
      password = document.getElementById("InputPassword").value,
      confirmPassword = document.getElementById("Inputconfirm").value,
      role = document.getElementById("regRole").value,
      msg = document.getElementById("registerMsg"),
      users = getUsers();

  if (name === "" || email === "" || password === "") {
    msg.textContent = "Please fill all required fields";
    return;
  }

  if (role === "student" && studentId === "") {
    msg.textContent = "Please enter your student ID";
    return;
  }

  if (password !== confirmPassword) {
    msg.textContent = "Passwords do not match";
    return;
  }

  let emailExists = users.find(function (u) {
    return u.email === email;
  });

  if (emailExists !== undefined) {
    msg.textContent = "This email is already registered";
    return;
  }

  users.push({
    name: name,
    studentId: studentId,
    email: email,
    password: password,
    role: role
  });

  clearForm();

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "Login.html";
}

function login() {
  let email = document.getElementById("InputEmail").value.trim();
  let password = document.getElementById("InputPassword").value;
  let msg = document.getElementById("loginMsg");
  let users = getUsers();

  let user = users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (user === undefined) {
    msg.textContent = "Wrong email or password";
    return;
  }

  clearForm();

  if (user.role === "admin") {
    window.location.href = "admin_dashboard.html";
  } else {
    window.location.href = "student_dashboard.html";
  }
}

let registerBtn = document.querySelector("#register .btn");
if (registerBtn !== null) {
  registerBtn.addEventListener("click", register);
}

let loginBtn = document.getElementById("loginBtn");
if (loginBtn !== null) {
  loginBtn.addEventListener("click", login);
}