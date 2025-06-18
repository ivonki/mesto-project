import { hideInputError, enableValidation, validationSettings } from './validate.js'
import { createCard, deleteCard, likeToggle } from './card.js'
import { openModal, closeModal } from './modal.js'
import { getUserData, updateUserData, getInitialCards, addNewCard } from './api.js'

import addIcon from '../../images/add-icon.svg';
import avatar from '../../images/avatar.jpg';
import cardOne from '../../images/card_1.jpg';
import cardTwo from '../../images/card_2.jpg';
import cardThree from '../../images/card_3.jpg';
import close from '../../images/close.svg';
import deleteIcon from '../../images/delete-icon.svg';
import editIcon from '../../images/edit-icon.svg';
import likeActive from '../../images/like-active.svg';
import likeInactive from '../../images/like-inactive.svg';
import logo from '../../images/logo.svg'

import interBlack from '../../vendor/fonts/Inter-Black.woff2';
import interMedium from '../../vendor/fonts/Inter-Medium.woff2';
import interRegular from '../../vendor/fonts/Inter-Regular.woff2';

import '../../pages/index.css';

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

let currentUserId;

enableValidation(validationSettings);

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

// document.addEventListener('click', (e) => console.log(e.target))

placesList.addEventListener('click', likeToggle);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardImage = linkInput.value;
  const cardDescription = descriptionInput.value;

  const cardData = 
  { "name": cardDescription,
    "link": cardImage}

  addNewCard(cardData.name, cardData.link)
    .then(newCard => {

      const cardElement = createCard({
        name: newCard.name,
        link: newCard.link
      });

      placesList.prepend(cardElement);

      evt.target.reset();
      closeModal(cardPopup);
    })
    .catch(err => {
      console.error('Ошибка при добавлении карточки:', err);
    })


  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

function getProfileData(userData) {
  profileName.textContent = userData.name;
  profileStatus.textContent = userData.about;

  const avatarElement = document.querySelector('.profile__image');
  if (avatarElement && userData.avatar) {
    avatarElement.style.backgroundImage = `url('${userData.avatar}')`;
  }
}

// Функция, отвечающая за подготовку модуля профиля к открытию.
// Включает изначальное скрытие ошибок с валидацией и ввод прошлого имени и рода занятия
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  const inputElements = Array.from(profileForm.querySelectorAll('.popup__input'));
  inputElements.forEach(inputElement => {
      hideInputError(profileForm, inputElement, validationSettings);
  });
  setSubmitButtonState(submitButtonProfile, true)
  openModal(profilePopup);
}

// Изменение поведения кнопки отправить в форме профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  updateUserData(newName, newAbout) // сделали запрос на сервер, где изменили данные. Потом из данных сервера обновили сайт.
    .then(updatedData => {
      getProfileData(updatedData);
      closeModal(profilePopup);
    })
    .catch(err => {
      console.error('Ошибка обновления профиля:', err);
    });

  closeModal(profilePopup);
}

getUserData()
  .then(userData => {
    getProfileData(userData);
    currentUserId = userData._id
  })
  .catch(err => {
    console.error('Ошибка загрузки данных:', err);
  });

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

placesList.addEventListener('click', deleteCard)

// Создаем карточки сразу с лайками с сервера
getInitialCards()
  .then(cards => {
    cards.forEach(item => {
      const cardElement = createCard(item);
      const deleteButton = cardElement.querySelector('.card__delete-button');
      const counter = cardElement.querySelector('.card__like-counter');

      counter.textContent = item.likes.length;
      placesList.append(cardElement);

      if (currentUserId != item.owner._id) {
        deleteButton.style.display = 'none';
      }
    });
  })
  .catch(error => {
    console.error('Ошибка при загрузке карточек:', error);
  });

// Функция, определяющая состояние кнопки сабмита
function setSubmitButtonState(buttonElement, isFormValid) {
  if (isFormValid === true) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button_disabled');
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button_disabled');
  }
}

profileForm.addEventListener('input', function (evt) {
  const isValid = name.value.length > 1 && description.value.length > 1
  setSubmitButtonState(submitButtonProfile, isValid)
})

cardForm.addEventListener('input', function (evt) {
  const isValid = link.value.length > 1 && placeName.value.length > 1
  setSubmitButtonState(submitButtonCard, isValid)
})