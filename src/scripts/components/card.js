// Функция создания карточки
function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  cardImage.addEventListener('click', function () {
    imageImage.src = cardData.link;
    imageImage.alt = cardData.name;
    imageDescription.textContent = cardData.name;
    openModal(imagePopup);
  })
  
  
  return cardElement;
}
  
// Функция удаления карточки
function deleteCard(event) {
  if (event.target.classList.contains('card__delete-button')) {
    const cardItem = event.target.closest('.places__item.card');
    cardItem.remove();
  }
}

// Измнение состояния кнопки лайка
function likeToggle(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active')
  }
  }

export { createCard, deleteCard, likeToggle }