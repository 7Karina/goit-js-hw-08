import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(handlerInput, 500));
form.addEventListener('submit', handlerSubmit);
document.addEventListener('DOMContentLoaded', loadForm);

const LOCAL_STORAGE_KEY = 'feedback-form-state';

function handlerSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('fill all fiels');
  }
  console.log(userData);
  removeEventListener(LOCAL_STORAGE_KEY);
  event.currentTarget.reset();
  userData = {};
}

function loadForm() {
  const userDataFromLS = load(LOCAL_STORAGE_KEY);
  if (!userDataFromLS) {
    return;
  }
  const formElements = form.elements;
  for (const key in userDataFromLS) {
    if (userDataFromLS.hasOwnProperty(key)) {
      formElements[key].value = userDataFromLS[key];
      if (userDataFromLS[key]) {
        userData[key] = userDataFromLS[key];
      }
    }
  }
}

function handlerInput(event) {
  const target = event.target;
  const formElValue = target.value;
  const formElName = target.name;
  userData[formElName] = formElValue;
  save(LOCAL_STORAGE_KEY, userData);
}

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}
function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('Remove item error: ', error.message);
  }
}
