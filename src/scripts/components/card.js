import { openModal } from './modal.js'
import { addLike, removeLike, deleteCardFromBase } from './api.js'

// Функция создания карточки
function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardElement.cardId = cardData._id;

  const imagePopup = document.querySelector('.popup_type_image');
  const imageImage = imagePopup.querySelector('.popup__image');
  const imageDescription = imagePopup.querySelector('.popup__caption');

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
    const cardId = cardItem.cardId;

    deleteCardFromBase(cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
      });
  }
}
// Измнение состояния кнопки лайка
function likeToggle(event) {
  if (event.target.classList.contains('card__like-button')) {
    const likeButton = event.target;
    const cardItem = likeButton.closest('.places__item.card');
    const cardId = cardItem.cardId;
    const counter = cardItem.querySelector('.card__like-counter');
    let currentLikes = parseInt(counter.textContent, 10) || 0;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    likeButton.classList.toggle('card__like-button_is-active');

    if (isLiked) {
      removeLike(cardId)
        .then(() => {
          currentLikes--;
          counter.textContent = currentLikes;
        })
        .catch(error => {
          console.error(error);
          likeButton.classList.toggle('card__like-button_is-active');
          currentLikes++;
          counter.textContent = currentLikes;
        });
    } else {
      addLike(cardId)
        .then(() => {
          currentLikes++;
          counter.textContent = currentLikes;
        })
        .catch(error => {
          console.error(error);
          likeButton.classList.toggle('card__like-button_is-active');
          currentLikes--;
          counter.textContent = currentLikes;
        });
    }
  }
}


export { createCard, deleteCard, likeToggle }