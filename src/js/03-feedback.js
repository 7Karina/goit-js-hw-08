import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(handlerInput, 500));
form.addEventListener('submit', handlerSubmit);
document.addEventListener('DOMContentLoaded', loadForm);

const LOCAL_STORAGE_KEY = 'feedback-form-state';

function handlerSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.message.value.trim();
  console.log(value);
  event.target.reset();
}

function loadForm() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error.message);
  }
}

function handlerInput(event) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(event));
}
