
const popupImage = document.getElementById("popup-image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopupImage(data) {
  openPopup(popupImage);
  popupImageElement.src = data.link;
  popupImageElement.alt = data.name;
  popupImageTitle.textContent = data.name;
}