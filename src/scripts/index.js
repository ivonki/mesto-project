import { initialCards } from './cards.js';

import addIcon from '../images/add-icon.svg';
import avatar from '../images/avatar.jpg';
import cardOne from '../images/card_1.jpg';
import cardTwo from '../images/card_2.jpg';
import cardThree from '../images/card_3.jpg';
import close from '../images/close.svg';
import deleteIcon from '../images/delete-icon.svg';
import editIcon from '../images/edit-icon.svg';
import likeActive from '../images/like-active.svg';
import likeInactive from '../images/like-inactive.svg';
import logo from '../images/logo.svg'

import interBlack from '../vendor/fonts/Inter-Black.woff2';
import interMedium from '../vendor/fonts/Inter-Medium.woff2';
import interRegular from '../vendor/fonts/Inter-Regular.woff2';

import '../pages/index.css';

const imagesFonts = [
  { name: 'Add Icon', link: addIcon },
  { name: 'Avatar', link: avatar },
  { name: 'Card One', link: cardOne },
  { name: 'Card Two', link: cardTwo },
  { name: 'Card Three', link: cardThree  },
  { name: 'Close', link: close },
  { name: 'Delete Icon', link: deleteIcon },
  { name: 'Edit Icon', link: editIcon },
  { name: 'Like Active', link: likeActive },
  { name: 'Like Inactive', link: likeInactive  },
  { name: 'Logo', link: logo },

  { name: 'Inter Black woff2', link: interBlack },
  { name: 'Inter Meduim woff2', link: interMedium },
  { name: 'Inter Regular woff2', link: interRegular },
]

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileForm = document.forms['edit-profile']
const cardForm = document.forms['new-place']

const name = profileForm.elements.name
const description = profileForm.elements.description

const placeName = cardForm.elements['place-name']
const link = cardForm.elements.link

const submitButtonProfile = profileForm.querySelector('.popup__button');
const submitButtonCard = cardForm.querySelector('.popup__button');

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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      this.classList.add('touched');
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) =>  {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement)
  })
}

enableValidation();

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

document.addEventListener('click', (e) => console.log(e.target))


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

  const cardData = 
  { "name": cardDescription,
    "link": cardImage}

  placesList.prepend(createCard(cardData));

  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeModalOnOverlayClick)
  document.addEventListener('keydown', closeModalByEsc)
}

function closeModalOnOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.currentTarget)
  }
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    console.log('Вы нажали эскейп!')
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup); }
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  const inputElements = Array.from(profileForm.querySelectorAll('.popup__input'));
  inputElements.forEach(inputElement => {
      hideInputError(profileForm, inputElement);
  });
  setSubmitButtonState(submitButtonProfile, true)
  openModal(profilePopup);
}

function clearCardCreateForm() {
  cardForm.reset()

  setSubmitButtonState(submitButtonCard, false);

  const inputs = cardForm.querySelectorAll('.popup__input');
  inputs.forEach(input => {
    input.classList.remove('touched');
  });

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

placesList.addEventListener('click', deleteCard);

// Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item));
});


// Функция, определяющая состояние кнопки сабмита должна быть после add...
function setSubmitButtonState(buttonElement, isFormValid) {
  if (isFormValid === true) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button_disabled');
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button_disabled');
  }
}

// Пример реализации, чтобы не была доступна кнопка отправить при пустении одного из полей формы
profileForm.addEventListener('input', function (evt) {
  const isValid = name.value.length > 1 && description.value.length > 1
  setSubmitButtonState(submitButtonProfile, isValid)
})

cardForm.addEventListener('input', function (evt) {
  const isValid = link.value.length > 1 && placeName.value.length > 1
  setSubmitButtonState(submitButtonCard, isValid)
})