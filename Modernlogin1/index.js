const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

let emailArray = [];
let passwordArray = [];
var usernameInput = document.getElementById("ru");
var emailInput = document.getElementById("re");
var passwordInput = document.getElementById("rp");
var confirmpasswordInput = document.getElementById("rrp");
// password toggle icon logic
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bx-show");
    icon.classList.add("bx-hide");
  } else {
    input.type = "password";
    icon.classList.remove("bx-hide");
    icon.classList.add("bx-show");
  }
}
function validateRegister() {
  clearErrors();

  var username = usernameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();
  var confirmpassword = confirmpasswordInput.value.trim();

  let success = true;

  if (username == "") {
    setError(usernameInput, "Username is required");
    success = false;
  } else {
    setSuccess(usernameInput);
  }

  if (email == "") {
    setError(emailInput, "Email is required");
    success = false;
  } else {
    setSuccess(emailInput);
  }

  if (password == "") {
    setError(passwordInput, "Password is required");
    success = false;
  } else {
    setSuccess(passwordInput);
  }

  if (confirmpassword == "") {
    setError(confirmpasswordInput, "Confirm password is required");
    success = false;
  } else if (confirmpassword !== password) {
    setError(confirmpasswordInput, "Password does not match");
    success = false;
  } else {
    setSuccess(confirmpasswordInput);
  }

  return success;
}

//validate inputs while user is typing
[usernameInput, emailInput, passwordInput, confirmpasswordInput].forEach(
  (input) => {
    input.addEventListener("input", validateRegister);
  },
);
function Register(event) {
  event.preventDefault();

  if (!validateRegister()) return;

  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (emailArray.indexOf(email) == -1) {
    emailArray.push(email);
    passwordArray.push(password);

    alert(email + " Thanks for Registration. Now try to login");

    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmpasswordInput.value = "";

    clearErrors();
  } else {
    setError(emailInput, "Email already registered");
  }
}
// to display error
//element - password, msg- pwd is required
function setError(element, message) {
  const inputgroup = element.parentElement;
  //const inputgroup = element.closest(".input-box");
  const errorElement = inputgroup.querySelector(".error");

  errorElement.innerText = message;
  inputgroup.classList.add("error");
  inputgroup.classList.remove("success");
}
// suceess
function setSuccess(element) {
  const inputgroup = element.parentElement;
  //Finds the nearest parent that has class .input-group.closest() → moves upward in DOM
  //const inputgroup = element.closest(".input-box");
  const errorElement = inputgroup.querySelector(".error");

  errorElement.innerText = "";
  inputgroup.classList.add("success");
  inputgroup.classList.remove("error");
}

function clearErrors() {
  const inputGroups = document.querySelectorAll(".input-box");

  inputGroups.forEach((group) => {
    group.classList.remove("error");
    group.classList.remove("success");

    const error = group.querySelector(".error");
    if (error) {
      error.innerText = "";
    }
  });
}

//login process
var usernameInput1 = document.getElementById("lu");
var emailInput1 = document.getElementById("le");
var passwordInput1 = document.getElementById("lp");

function validateLogin() {
  clearErrors();
  var username = usernameInput1.value.trim();
  var email = emailInput1.value.trim();
  var password = passwordInput1.value.trim();
  //username check
  if (username == "") {
    setError(usernameInput1, "Username is required");
    return false;
  } else {
    setSuccess(usernameInput1);
  }
  //email check
  if (email === "") {
    setError(emailInput1, "Email is required");
    return false;
  } else {
    setSuccess(emailInput1);
  }
  //password check
  if (password === "") {
    setError(passwordInput1, "Please enter a password");
    return false;
  } else {
    setSuccess(passwordInput1);
  }
  return true;
}
[usernameInput1, emailInput1, passwordInput1].forEach((input) => {
  input.addEventListener("input", validateLogin);
});
//email check
////Finds email index.If not found → returns -1.
function Login(event) {
  clearErrors();
  event.preventDefault();
  if (!validateLogin()) return;
  var email = emailInput1.value.trim();
  var password = passwordInput1.value.trim();
  var i = emailArray.indexOf(email);
 if (i == -1){ 
    setError(emailInput1, "Email not found, please register first");
    return;
  }
  if (passwordArray[i] != password) {
    setError(passwordInput1, "Password does not match");
    return;
  }

  alert("Login successful!");

  window.location.href = "../index.html";

  usernameInput1.value = "";
  emailInput1.value = "";
  passwordInput1.value = "";
 
}
//toggle forget password
const forgetLink = document.querySelector(".fp");
const backLogin = document.querySelector(".login-btn2");

forgetLink.addEventListener("click", () => {
  container.classList.add("forget");
  //clear login fields
  usernameInput1.value = "";
  emailInput1.value = "";
  passwordInput1.value = "";

  clearErrors();
});

backLogin.addEventListener("click", () => {
  container.classList.remove("forget");
  //clear login fields
  usernameInput1.value = "";
  emailInput1.value = "";
  passwordInput1.value = "";

  clearErrors();
});
//main function to handle the forget password process
function Forget(event) {
  event.preventDefault();

  var email = document.getElementById("fe").value.trim();

  if (email == "") {
    alert("Email is required");
    return;
  }

  if (!emailArray.includes(email)) {
    alert("Email not found");
    return;
  }

  alert("Password reset link has been sent to your email");

  document.getElementById("fe").value = "";
  
}