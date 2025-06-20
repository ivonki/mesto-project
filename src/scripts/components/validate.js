const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(settings.errorClass);
  }
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this.classList.add('touched');
        checkInputValidity(formElement, inputElement, settings);
      });
    });
  };
  
  function enableValidation (settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector))
    formList.forEach((formElement) =>  {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings)
    })
  }

export { showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, validationSettings }