import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // callback del formulario
    this._form = this._popupSelector.querySelector(".popup__container");
    this._inputList = this._form.querySelector(".popup__input");
  }
  _getInputValues(){
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners(); // sigue cerrando con el botón y el overlay

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // ejecuta el callback con los datos
    });
  }

  close() {
    super.close();
    this._form.reset(); // limpia el formulario al cerrar
  }
}