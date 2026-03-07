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
function Register(event) {
  event.preventDefault();

  var username = usernameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();
  var confirmpassword = confirmpasswordInput.value.trim();

  // if(email=="" || password=="" || confirmpassword==""){
  //     alert("Please fill all the fields");
  //     return;
  // }
  let success = true;
  clearErrors();
  if (username == "") {
    success = false;
    // alert("Usernmae is required")
    setError(usernameInput, "Username is required");
  } else {
    setSuccess(usernameInput);
  }
  //email check
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  if (email === "") {
    success = false;
    setError(emailInput, "Email is required");
  }
  //crtha illana error katu
  else if (!validateEmail(email)) {
    success = false;
    setError(emailInput, "Please enter valid email");
  } else {
    setSuccess(emailInput);
  }
  //password check
  if (password === "") {
    success = false;
    setError(passwordInput, "Please enter a password");
  } else if (password.length < 8) {
    success = false;
    setError(passwordInput, "password must be atleast 8 charaters");
  } else if (!/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(password)) {
    success = false;
    setError(
      passwordInput,
      "Password must contain 1 uppercase letter and 1 number",
    );
  } else {
    setSuccess(passwordInput);
  }
  // cpaassword check
  if (confirmpassword === "") {
    success = false;
    setError(confirmpasswordInput, "confirm password is required");
  } else if (confirmpassword !== password) {
    success = false;
    setError(confirmpasswordInput, "password does not match");
  } else {
    setSuccess(confirmpasswordInput);
  }
  //If email NOT already stored in emailArray,
  //  then store the email and password in their respective arrays
  if (success) {
    if (emailArray.indexOf(email) == -1) {
      emailArray.push(email);
      passwordArray.push(password);

      alert(email + " Thanks for Registration. Now try to login");
      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      confirmpasswordInput.value = "";
    } else {
      setError(emailInput, "Email already registered");
    }
  }
  return success;
}

//validate inputs while user is typing
[usernameInput, emailInput, passwordInput, confirmpasswordInput].forEach(
  (input) => {
    input.addEventListener("input", Register);
  },
);
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

var usernameInput1 = document.getElementById("lu");
var emailInput1 = document.getElementById("le");
var passwordInput1 = document.getElementById("lp");

function Login(event) {
  event.preventDefault();
  clearErrors();
  var username = usernameInput1.value.trim();
  var email = emailInput1.value.trim();
  var password = passwordInput1.value.trim();

  var i = emailArray.indexOf(email);

  //username check
  if (username == "") {
    setError(usernameInput1, "Username is required");
    return;
  } else {
    setSuccess(usernameInput1);
  }
  //email check
  if (email === "") {
    setError(emailInput1, "Email is required");
    return;
  } else {
    setSuccess(emailInput1);
  }
  //password check
  if (password === "") {
    setError(passwordInput1, "Please enter a password");
    return;
  } else {
    setSuccess(passwordInput1);
  }
  //email check
  ////Finds email index.If not found → returns -1.
  if (i == -1) {
    // alert("email not found, please register first");
    setError(emailInput1, "email not found, please register first");
    return;
  }
  // Checks password at same index.If match → login success
  // //.passwordArray[i] means: Get password stored at same index as email

  if (passwordArray[i] != password) {
    //alert("password does not match");
    setError(passwordInput1, "password does not match");
    return;
  }
  //else {
  // alert(email + "Login successful");
  window.location.href = "musixmatch/index.html";
  //}
  usernameInput1.value = "";
  emailInput1.value = "";
  passwordInput1.value = "";
}
[usernameInput1, emailInput1, passwordInput1].forEach((input) => {
  input.addEventListener("input", Login);
});
//toggle forget password
const forgetLink = document.querySelector(".fp");
const backLogin = document.querySelector(".login-btn2");

forgetLink.addEventListener("click", () => {
  container.classList.add("forget");
});

backLogin.addEventListener("click", () => {
  container.classList.remove("forget");
});
//main function to handle the forget password process
function Forget(event) {
  event.preventDefault();
  var email = document.getElementById("fe").value;
  var i = emailArray.indexOf(email);
  if (i == -1) {
    if (email == "") {
      alert("email  is required");
      return;
    }
    alert("email not found ");
    return;
  }
  alert("Password reset link has been sent to your email");
  //clear the input field after successful submission
  document.getElementById("fe").value = "";
}
