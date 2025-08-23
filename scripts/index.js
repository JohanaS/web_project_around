import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { openPopup, openPopupImage, closePopup } from "./utils.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

const formConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__save-button-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-active",
};

const profileName = document.querySelector(".profile__name");
const profilePosition = document.querySelector(".profile__position");
const profileEditButton = document.querySelector(".profile__edit-button");
const addImageButton = document.querySelector(".profile__add-button");

const popupEdit = document.getElementById("popup-edit");
const closeEditButton = popupEdit.querySelector(".popup__close-button");
const formEdit = popupEdit.querySelector(".popup__container");
const nameInput = popupEdit.querySelector("#name-input");
const aboutInput = popupEdit.querySelector("#about-input");

const popupAdd = document.getElementById("popup-add");
const closeAddButton = popupAdd.querySelector(".popup__close-button");
const formAdd = popupAdd.querySelector(".popup__container");
const titleInput = popupAdd.querySelector("#title-input");
const urlInput = popupAdd.querySelector("#url-input");

const popupImage = document.getElementById("popup-image");
const closeImageButton = popupImage.querySelector(".popup__close-button");

const cardsContainer = document.querySelector(".cards-container");

const editFormValidator = new FormValidator(formConfig, formEdit);
const addFormValidator = new FormValidator(formConfig, formAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function createCard(data){
  const card = new Card(data, "#template", openPopupImage);
  return card.generateCard();
}

function renderCard(data){
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}
initialCards.forEach(renderCard);

function openProfilePopup(){
  nameInput.value = profileName.textContent;
  aboutInput.value = profilePosition.textContent;
  editFormValidator.resetValidation();
  openPopup(popupEdit);
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilePosition.textContent = aboutInput.value;
  closePopup(popupEdit);
}

function handleAddCardFormSubmit(evt){
  evt.preventDefault();
    const newCardData = {
      name: titleInput.value,
      link: urlInput.value,
    };
    renderCard(newCardData);
    formAdd.reset();
    addFormValidator.resetValidation();
    closePopup(popupAdd);
}

profileEditButton.addEventListener("click", openProfilePopup);
closeEditButton.addEventListener("click", () => closePopup(popupEdit));

addImageButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openPopup(popupAdd);
});

closeAddButton.addEventListener("click", () => closePopup(popupAdd));
closeImageButton.addEventListener("click", () => closePopup(popupImage));

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddCardFormSubmit);

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closePopup(activePopup);
    }
  }
});



