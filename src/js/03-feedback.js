import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInp = document.getElementsByName('email');
const messageText = document.getElementsByName('message');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

function saveForm() {
  const state = {
    email: emailInp.value,
    message: messageText.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

function loadForm() {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInp.value = state.email || '';
    messageText.value = state.message || '';
  }
}

function handleInpt() {
  saveForm();
}

form.addEventListener('input', throttle(handleInpt, 500));
loadForm();

// feedbackForm.addEventListener('submit', evt => {
//   evt.preventDefault();
//   localStorage.removeItem(LocalStorage_key);
//   console.log({
//     email: emailInput.value,
//     message: messageTextarea.value,
//   });
// });
