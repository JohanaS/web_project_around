
export class Card {
  constructor(data, cardSelector, handleImageClick){
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._handleImageClick = handleImageClick;

  }
  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector(".cards__item")
    .cloneNode(true);
    return cardElement;
  }
  // _removeCard(){
  //   this._element.remove();
  // }
  _likeCard(){
    this._likeButton.classList.toggle("cards__item-like-selected")
  }

  _setEventListeners(){
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    // this._trashButton.addEventListener("click", () => {
    //   this._removeCard();
    // });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._title,
        link: this._image,
      });
    });
  }
  generateCard(){
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__item-img");
    this._trashButton = this._element.querySelector(".cards__item-delete");
    this._cardTitle = this._element.querySelector(".cards__item-text");
    this._likeButton = this._element.querySelector(".cards__item-like");

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    console.log(this._id);
    this._setEventListeners();
    return this._element;
  }
}

