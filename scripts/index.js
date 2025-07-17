
const page = document.querySelector(".page");
const content = page.querySelector(".content");
const profile = content.querySelector(".profile");

let popupEdit = document.getElementById("popup-edit");
let popupAdd = document.getElementById("popup-add");
let popupImage = document.getElementById("popup-image");

let profileEditButton = profile.querySelector(".profile__edit-button");
let closeEditButton = document.getElementById("profile-close-button");

let addImageButton = profile.querySelector(".profile__add-button");
let closeAddButton = document.getElementById("add-close-button");
let closeImageButton = document.getElementById("image-close-button");

function openPopup(popupElement){
  page.style.opacity = "0.3";
  popupElement.style.display = "grid";
}
function openPopupImage(popupElement){
  page.style.opacity = "0.1";
  popupElement.style.display = "grid";
}
function closePopup(popupElement){
    page.style.opacity = "1";
    popupElement.style.display ="none";
}

profileEditButton.addEventListener("click", () => openPopup(popupEdit));
closeEditButton.addEventListener("click", () => closePopup(popupEdit));

addImageButton.addEventListener("click", () => openPopup(popupAdd));
closeAddButton.addEventListener("click", () => closePopup(popupAdd));
closeImageButton.addEventListener("click", () => closePopup(popupImage));

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  let nameInput = popupEdit.querySelector(".popup__input-name");
  let jobInput = popupEdit.querySelector(".popup__input-about");

  let name = profile.querySelector(".profile__name");
  let job = profile.querySelector(".profile__position");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  nameInput.value = "";
  jobInput.value = "";
}

let editForm = document.getElementById("container-edit");
editForm.addEventListener("submit", handleProfileFormSubmit);
editForm.addEventListener("submit", () => closePopup(popupEdit));

function addImage(nameValue, linkValue){
  const imagesContainer = content.querySelector(".cards-container");

  const imageItem = document.createElement("div");
    imageItem.classList.add("cards__item");
  const imageElement = document.createElement("img");
    imageElement.classList.add("cards__item-img");
    imageElement.src = linkValue;
    imageElement.alt = nameValue;
  const deleteButtonElement = document.createElement("button");
    deleteButtonElement.classList.add("cards__item-delete");
  const nameContainer =document.createElement("div");
    nameContainer.classList.add("cards__item-info");
  const nameElement = document.createElement("p");
    nameElement.classList.add("cards__item-text");
    nameElement.textContent = nameValue;
  const likeButtonElement = document.createElement("button");
    likeButtonElement.classList.add("cards__item-like");

  nameContainer.append(nameElement,likeButtonElement);
  imageItem.append(deleteButtonElement,imageElement,nameContainer);
  imagesContainer.prepend(imageItem);

  likeButtonElement.addEventListener("click", () => {
    likeButtonElement.classList.toggle("cards__item-like-selected");
  });
  deleteButtonElement.addEventListener("click", () => {
    imageItem.remove();
  });

  imageElement.addEventListener("click", () => {
    const image = document.querySelector(".popup__image-item");
    const nameImage = document.querySelector(".popup__image-title");
    image.src = linkValue;
    nameImage.textContent = nameValue;
    openPopupImage(popupImage);
  });

}
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
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach(card => {
    addImage(card.name, card.link);
  });
});

let addForm = document.getElementById("container-add");
addForm.addEventListener("submit", function (evt){
  evt.preventDefault();
  const title= popupAdd.querySelector(".popup__input-name");
  const link = popupAdd.querySelector(".popup__input-about");

  addImage(title.value, link.value);
    title.value = "";
    link.value = "";
   closePopup(popupAdd);
});

