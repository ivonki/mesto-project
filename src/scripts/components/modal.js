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
    document.removeEventListener('keydown', closeModalByEsc);
}

export { openModal, closeModalOnOverlayClick, closeModalByEsc, closeModal }