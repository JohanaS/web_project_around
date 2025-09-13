import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { Section } from "../components/section.js";
import { UserInfo } from "../components/userInfo.js";

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

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__position"
});

const profileEditButton = document.querySelector(".profile__edit-button");
const addImageButton = document.querySelector(".profile__add-button");


const popupProfileForm = new PopupWithForm("#popup-edit", handleProfileFormSubmit);
popupProfileForm.setEventListeners();
const formEdit = document.querySelector("#container-edit");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

const popupAddCardForm = new PopupWithForm("#popup-add", handleAddCardFormSubmit);
popupAddCardForm.setEventListeners();
const formAdd = document.querySelector("#container-add");
const titleInput = document.querySelector("#title-input");
const urlInput = document.querySelector("#url-input");

const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const editFormValidator = new FormValidator(formConfig, formEdit);
const addFormValidator = new FormValidator(formConfig, formAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const sectionRenderer = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      sectionRenderer.addItem(cardElement);
    }
  },
  ".cards-container"
);

function createCard(data){
  const card = new Card(data, "#template", (cardData) => {
    popupWithImage.open(cardData);
  });
  return card.generateCard();
}
sectionRenderer.renderItems();

function openProfilePopup(){
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.userName;
  aboutInput.value = currentUser.userJob;
  editFormValidator.resetValidation();
  popupProfileForm.open();
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  userInfo.setUserInfo({
    userName: nameInput.value,
    userJob: aboutInput.value
  });
  popupProfileForm.close();
}

function handleAddCardFormSubmit(evt){
  evt.preventDefault();
    const newCardData = {
      name: titleInput.value,
      link: urlInput.value,
    };
    const cardElement = createCard(newCardData);
    sectionRenderer.addItem(cardElement);
    formAdd.reset();
    addFormValidator.resetValidation();
    popupAddCardForm.close();
}

profileEditButton.addEventListener("click", openProfilePopup);

addImageButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  popupAddCardForm.open();
});

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddCardFormSubmit);




