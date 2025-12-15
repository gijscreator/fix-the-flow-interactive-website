const passwordBtn = document.querySelector('.codepassword');
const codeSection = document.querySelector('.welcome');

passwordBtn.addEventListener('click', codeHandler);

function codeHandler () {
  codeSection.classList.toggle("hide");
}