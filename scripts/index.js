// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const imageImage = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__caption');

const profileEditOpenButton = content.querySelector('.profile__edit-button');
const profileEditCloseButton = profilePopup.querySelector('.popup__close');

const cardCreateOpenButton = content.querySelector('.profile__add-button');
const cardCreateCloseButton = cardPopup.querySelector('.popup__close');

const imageCloseButton = imagePopup.querySelector('.popup__close');

const profileName = content.querySelector('.profile__title');
const profileStatus = content.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('.popup__form'); 
const cardFormElement = cardPopup.querySelector('.popup__form');

const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const descriptionInput = cardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = cardFormElement.querySelector('.popup__input_type_url');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');



// Измнение состояния кнопки лайка
function likeToggle(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active')
  }
}

placesList.addEventListener('click', likeToggle);

// Изменение поведения кнопки отправить в форме профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Изменение поведения кнопки отправить в форме карточки места
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardImage = linkInput.value;
  const cardDescription = descriptionInput.value;

  cardData = 
  { "name": cardDescription,
    "link": cardImage}

  placesList.prepend(createCard(cardData));

  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
    openModal(profilePopup);
}

function clearCardCreateForm() {
  descriptionInput.value = '';
  linkInput.value = '';

  openModal(cardPopup);
}

profileEditOpenButton.addEventListener('click', fillProfileForm);

profileEditCloseButton.addEventListener('click', function () {
  closeModal(profilePopup);
});

cardCreateOpenButton.addEventListener('click', clearCardCreateForm);

cardCreateCloseButton.addEventListener('click', function () {
  closeModal(cardPopup);
});

imageCloseButton.addEventListener('click', function () {
  closeModal(imagePopup);
});


// @todo: Функция создания карточки

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

placesList.addEventListener('click', deleteCard);

// Вывести карточки на страницу

initialCards.forEach(function (item) {
  placesList.append(createCard(item));
});
