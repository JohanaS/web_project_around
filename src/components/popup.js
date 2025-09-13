
export class Popup {
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }
  open(){
    this._popupSelector.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close(){
    this._popupSelector.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape"){
      this.close();
    }
  }
  setEventListeners(){
    const closeButton = this._popupSelector.querySelector(".popup__close-button");
    closeButton?.addEventListener("click", () => this.close());

    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupSelector) {
        this.close();
      }
    });
  }
}