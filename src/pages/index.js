import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithConfirm } from "../components/popupWithConfirm.js";
import { Section } from "../components/section.js";
import { UserInfo } from "../components/userInfo.js";
import { api } from "../components/api.js";


// const initialCards = [
//   {
//     name: "Valle de Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
//   },
//   {
//     name: "Lago Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
//   },
//   {
//     name: "Montañas Calvas",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
//   },
//   {
//     name: "Parque Nacional de la Vanoise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
//   }
// ];

api.getInitialCards().then(function(initialCards) {
  const formConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__save-button-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error-active",
  };

  const userInfo = new UserInfo({
      userName: ".profile__name",
      userJob: ".profile__position",
      avatarSelector: ".profile__avatar",
  });

  api.getUserInfo()
  .then(function(initialInfo){
    userInfo.setUserInfo({
      name: initialInfo.name,
      about: initialInfo.about,
      avatar: initialInfo.avatar
    });
  })
  .catch(err => {
    console.error("Error al obtener info de usuario:", err);
  });

  const profileEditButton = document.querySelector(".profile__edit-button");
  const addImageButton = document.querySelector(".profile__add-button");
  const profileAvatarButton = document.querySelector(".profile__edit-icon");

  const popupProfileForm = new PopupWithForm("#popup-edit", handleProfileFormSubmit);
  popupProfileForm.setEventListeners();
  const formEdit = document.querySelector("#container-edit");
  const nameInput = document.querySelector("#name-input");
  const aboutInput = document.querySelector("#about-input");

  const popupAddCardForm = new PopupWithForm("#popup-add", handleAddCardFormSubmit);
  popupAddCardForm.setEventListeners();
  const formAdd = document.querySelector("#container-add");

  const avatarForm = document.querySelector("#container-avatar");
  const popupAvatarForm = new PopupWithForm("#popup-avatar", handleAvatarFormSubmit);
  popupAvatarForm.setEventListeners();

  const popupConfirmDelete = new PopupWithConfirm("#popup-delete");
  popupConfirmDelete.setEventListeners();

  const popupWithImage = new PopupWithImage("#popup-image");
  popupWithImage.setEventListeners();

  const editFormValidator = new FormValidator(formConfig, formEdit);
  const addFormValidator = new FormValidator(formConfig, formAdd);
  const avatarFormValidator = new FormValidator(formConfig, avatarForm);
  editFormValidator.enableValidation();
  addFormValidator.enableValidation();
  avatarFormValidator.enableValidation();

  const sectionRenderer = new Section(
    {
      items: initialCards,
      renderer: (data) => {
        const cardElement = createCard(data);
        sectionRenderer.addItem(cardElement);

        const likeButton = cardElement.querySelector(".cards__item-like")
        let isLiked = data.isLiked || false;
        if(isLiked){
          likeButton.classList.add("cards__item-like-selected");
        }
        likeButton.addEventListener("click", function(){
          likeButton.disabled = true;
          if(!isLiked){
            api.addLike(data._id)
            .then(function(){
              isLiked = true;
              likeButton.classList.add("cards__item-like-selected");
            })
            .catch((err)=> console.error("Error al quitar like:", err))
            .finally(()=> likeButton.disabled = false);
          } else {
          api.deleteLike(data._id)
            .then(function () {
              isLiked = false;
              likeButton.classList.remove("cards__item-like-selected");
            })
            .catch((err) => console.error("Error al quitar like:", err))
            .finally(() => likeButton.disabled = false);
          }
        });
      }
    },
    ".cards-container"
  );
  sectionRenderer.renderItems();

  function createCard(data){
    const card = new Card(data, "#template", (cardData) => {
      popupWithImage.open(cardData);
    });
    const cardElement = card.generateCard();
    const cardId = data._id || data.id;
    const deleteBtn = cardElement.querySelector(".cards__item-delete");

    deleteBtn.addEventListener("click", () => {
      popupConfirmDelete.open();
      popupConfirmDelete.setConfirmAction(() => {
        const confirmBtn = document.querySelector("#popup-delete .popup__submit");
        const originalText = confirmBtn ? confirmBtn.textContent : null;
        if (confirmBtn) {
          confirmBtn.textContent = "Eliminando...";
          confirmBtn.disabled = true;
        }

        api.deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            popupConfirmDelete.close();
          })
          .catch((err) => {
            console.error("Error al eliminar tarjeta:", err);
            alert("No se pudo eliminar la tarjeta");
          })
          .finally(() => {
            if (confirmBtn) {
              confirmBtn.textContent = originalText;
              confirmBtn.disabled = false;
            }
          });
      });
    });

    return cardElement;
  }

  function openProfilePopup(){
    const currentUser = userInfo.getUserInfo();
    nameInput.value = currentUser.name;
    aboutInput.value = currentUser.about;
    editFormValidator.resetValidation();
    popupProfileForm.open();
  }

  function handleProfileFormSubmit(formValues){
    const submitButton = document.querySelector("#popup-edit .popup__submit");
    const originalText = submitButton ? submitButton.textContent : null;
    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }

    api.editUserInfo(formValues.name, formValues.about)
    .then(function(updatedUser){
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
        avatar: updatedUser.avatar
      });
      popupProfileForm.close();
    })
    .catch(function(err) {
      console.error("Error al actualizar usuario:", err);
      alert("No se pudo actualizar el perfil. Revisa la consola o intenta más tarde.");
    })
    .finally(function() {
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  function handleAddCardFormSubmit(formValues){
    const submitButton = document.querySelector("#popup-add .popup__submit");
    const originalText = submitButton ? submitButton.textContent : null;
    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }

    api.createCard(formValues.title, formValues.link).then(function(createdCard){
      const cardElement = createCard(createdCard);
      sectionRenderer.addItem(cardElement);
      formAdd.reset();
      addFormValidator.resetValidation();
      popupAddCardForm.close();
    })
    .catch((err) => {
      console.error("Error al crear tarjeta:", err);
      alert("No se pudo crear la tarjeta. Revisa la consola.");
    })
    .finally(() => {
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  function handleAvatarFormSubmit(formValues) {
    const avatarUrl = formValues.avatar;

    const submitButton = document.querySelector("#popup-avatar .popup__submit");
    const originalText = submitButton ? submitButton.textContent : null;
    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }

    api.editAvatar(avatarUrl)
      .then(function(updatedUser) {
        userInfo.setUserInfo({
          name: updatedUser.name,
          about: updatedUser.about,
          avatar: updatedUser.avatar
        });

        const avatarImg = document.querySelector(".profile__avatar");
        if (avatarImg) avatarImg.src = updatedUser.avatar;

        popupAvatarForm.close();
      })
      .catch(function(err) {
        console.error("Error al actualizar avatar:", err);
        alert("No se pudo actualizar la imagen de perfil. Revisa la consola.");
      })
      .finally(function() {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
  }

  profileEditButton.addEventListener("click", openProfilePopup);

  addImageButton.addEventListener("click", () => {
    addFormValidator.resetValidation();
    popupAddCardForm.open();
  });

  profileAvatarButton.addEventListener("click", () => {
    const avatarInput = document.querySelector("#avatar-input");
    if (avatarInput) avatarInput.value = "";
    avatarFormValidator.resetValidation();
    popupAvatarForm.open();
  });

});


