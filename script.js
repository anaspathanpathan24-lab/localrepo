const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const remember = document.querySelector("#remember");
const togglePassword = document.querySelector("#togglePassword");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const statusMessage = document.querySelector("#statusMessage");

const savedEmail = localStorage.getItem("loginEmail");

if (savedEmail) {
  email.value = savedEmail;
  remember.checked = true;
}

function showError(input, errorElement, message) {
  input.classList.add("input-error");
  errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove("input-error");
  errorElement.textContent = "";
}

function validateEmail() {
  const value = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    showError(email, emailError, "Email address is required.");
    return false;
  }

  if (!emailPattern.test(value)) {
    showError(email, emailError, "Enter a valid email address.");
    return false;
  }

  clearError(email, emailError);
  return true;
}

function validatePassword() {
  if (!password.value) {
    showError(password, passwordError, "Password is required.");
    return false;
  }

  if (password.value.length < 6) {
    showError(password, passwordError, "Password must be at least 6 characters.");
    return false;
  }

  clearError(password, passwordError);
  return true;
}

togglePassword.addEventListener("click", () => {
  const isHidden = password.type === "password";

  password.type = isHidden ? "text" : "password";
  togglePassword.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  togglePassword.title = isHidden ? "Hide password" : "Show password";
  togglePassword.querySelector("span").textContent = isHidden ? "●" : "○";
});

email.addEventListener("input", () => {
  if (email.classList.contains("input-error")) {
    validateEmail();
  }
});

password.addEventListener("input", () => {
  if (password.classList.contains("input-error")) {
    validatePassword();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "";

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  const shouldRemember = remember.checked;

  if (shouldRemember) {
    localStorage.setItem("loginEmail", email.value.trim());
  } else {
    localStorage.removeItem("loginEmail");
  }

  statusMessage.textContent = "Login details look good.";
  form.reset();

  if (shouldRemember) {
    email.value = localStorage.getItem("loginEmail") || "";
    remember.checked = true;
  }
});
