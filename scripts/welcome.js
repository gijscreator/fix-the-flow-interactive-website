const choosePassword = document.querySelector('.codepassword');
const codeSection = document.querySelector('.codesignin');
const passswordSection = document.querySelector('.choosepassword');
const usernameSection =  document.querySelector('.chooseusername');
const passwordBtn =  document.querySelector('.passwordstep');
const usernameBtn =  document.querySelector('.usernamestep');

choosePassword.addEventListener('click', codeBtnHandler);

function codeBtnHandler () {
  codeSection.classList.add("hide")
  passswordSection.classList.remove("hide");
}

passwordBtn.addEventListener('click', passwordChosen);

function passwordChosen () {
  passswordSection.classList.add("hide");
  usernameSection.classList.remove("hide");
}