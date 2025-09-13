import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector(".popup__image");
    this._popupImgTitle = this._popupSelector.querySelector(".popup__image-title");
  }
  open({link, name}){
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImgTitle.textContent = name;
    super.open();

  }
}