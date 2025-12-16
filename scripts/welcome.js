const choosePassword = document.querySelector('.codepassword');
const codeSection = document.querySelector('.codesignin');
const passswordSection = document.querySelector('.choosepassword');
const usernameSection =  document.querySelector('.chooseusername');

choosePassword.addEventListener('click', passwordBtnHandler);

function passwordBtnHandler () {
  codeSection.classList.add("hide")
  passswordSection.classList.remove("hide");
}

choosePassword.addEventListener('click', passwordBtnHandler);

function usernameBtnHandler () {
  passswordSection.classList.add("hide")
  usernameSection.classList.remove("hide");
}

