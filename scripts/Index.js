let page = document.querySelector(".page");
let popup = document.querySelector(".popup");
let content = page.querySelector(".content");
let profile = content.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit-button");
let closePopupButton = popup.querySelector(".popup__close-button");
let formElement = popup.querySelector(".popup__container");

function openPopup(){
  page.style.opacity = "0.5";
  popup.style.display = "grid";
}

function closePopup(){
    page.style.opacity = "1";
    popup.style.display ="none";
}

profileEditButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  let nameInput = popup.querySelector(".popup__input-name");
  let jobInput = popup.querySelector(".popup__input-about");

  let name = profile.querySelector(".profile__name");
  let job = profile.querySelector(".profile__position");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

}

let form = popup.querySelector("form");
form.addEventListener("submit", handleProfileFormSubmit);