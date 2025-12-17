const choosePassword = document.querySelector('.codepassword');
const codeSection = document.querySelector('.codesignin');
const passswordSection = document.querySelector('.choosepassword');
const usernameSection =  document.querySelector('.chooseusername');
const passwordBtn =  document.querySelector('.passwordstep');
const usernameBtn =  document.querySelector('.usernamestep');
const images = document.querySelector('.image-previews');
const chooseGender = document.querySelector('.choosegender');
const submitBtn = document.querySelector('.submit');

choosePassword.addEventListener('click', codeBtnHandler);

function codeBtnHandler () {
  codeSection.classList.add("hide")
  images.classList.add("hide");
  passswordSection.classList.remove("hide");
  
}

passwordBtn.addEventListener('click', passwordChosen);

function passwordChosen () {
  passswordSection.classList.add("hide");
  images.classList.add("hide");
  usernameSection.classList.remove("hide");
}

usernameBtn.addEventListener('click', usernameChosen);

function usernameChosen () {
  usernameSection.classList.add("hide");
  chooseGender.classList.remove("hide"); 
}

