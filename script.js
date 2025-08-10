const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isRequiredValid = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isFormValid = isRequiredValid;
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPasswordLength(password, 6, 25);
    const isMatching = checkPasswordsMatch(password, confirmPassword);
    isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid && isMatching;

    if (isFormValid) {
      alert("Registered Successfully!");
      form.reset();

      document.querySelectorAll(".form-group").forEach((el) => {
        el.className = "form-group";
      });
    }
  }
});

function checkLength(input, min, max) {
  const inputValue = input.value;
  if (inputValue.length < min) {
    showError(input, `${input.id} must have atleast ${min} chars`);
    return false;
  } else if (inputValue.length > max) {
    showError(input, `${input.id} must have atmost ${max} chars`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

function checkPasswordLength(input, min, max) {
  return checkLength(input, min, max);
}

function checkPasswordsMatch(pass, confirm) {
  if (pass.value.trim() !== confirm.value.trim()) {
    showError(confirm, "Passwords dont match");
    return false;
  } else {
    showSuccess(confirm);
    return true;
  }
}

function checkRequired(inputArray) {
  let isValid = true;
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(
        input,
        `${input.id[0].toUpperCase() + input.id.slice(1) + " "}is required`
      );
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}
