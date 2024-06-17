const form = document.getElementById('form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const termsInput = document.getElementById('terms');
const radioFields = document.querySelectorAll('.radio');
const termsField = document.getElementById('checkbox-field');
const errors = document.querySelectorAll('.error-message');
const submitBtn = document.getElementById('submit');
const alert = document.getElementById('confirm');

const value = {
  firstName: '',
  lastName: '',
  email: '',
  queryType: 'general',
  message: '',
  terms: false,
};

const resetError = () => {
  for (let err of errors) {
    err.classList.add('hide');
  }
};

// event handler
const handleSubmitTrigger = resetError;

const handleValid = (e) => {
  const errorDescribed = e.target.attributes['aria-describedby'].value;
  const error = document.getElementById(errorDescribed);
  if (errorDescribed === 'email-error') handleEmailValid(e, errorDescribed);
  else error.classList.remove('hide');
};

const handleEmailValid = (e, errorDescribed) => {
  const [valid, required] = document.querySelectorAll(`.${errorDescribed}`);
  if (e.target.value) {
    valid.classList.remove('hide');
    required.classList.add('hide');
  } else {
    required.classList.remove('hide');
    valid.classList.add('hide');
  }
};

const handleClickRadio = (e, i) => {
  const checked = e.target.ariaChecked === 'true';
  const idx = i ? 0 : 1;
  if (checked) {
    radioFields[i].ariaChecked = 'false';
    radioFields[idx].ariaChecked = 'true';
  } else {
    radioFields[i].ariaChecked = 'true';
    radioFields[idx].ariaChecked = 'false';
  }
  value.queryType = radioFields[i].innerText;
};

const handleClickTerms = (e) => {
  const checked = e.target.ariaChecked === 'true';
  if (checked) {
    termsInput.setAttribute('checked', false);
    e.target.ariaChecked = 'false';
  } else {
    termsInput.setAttribute('checked', true);
    e.target.ariaChecked = 'true';
  }
  value.terms = !checked;
};

const handleSubmit = (e) => {
  e.preventDefault();
  resetError();
  const children = e.target.children;
  for (const child of children) {
    switch (child.innerText) {
      case 'Email Address':
        value.email = child.children.namedItem('email').value;
        break;
      case 'Message':
        value.message = child.children.namedItem('message').value;
        break;
      case `First Name\nLast Name`:
        const [first, last] = child.children;
        value.firstName = first.children.namedItem('first-name').value;
        value.lastName = last.children.namedItem('last-name').value;
        break;
      default:
        break;
    }
  }
  alert.classList.add('success');
  console.log('value:', value);
};

// eventListeners
submitBtn.addEventListener('click', handleSubmitTrigger);
form.addEventListener('invalid', handleValid, true);
form.addEventListener('submit', handleSubmit);
termsField.addEventListener('click', handleClickTerms);
radioFields.forEach((radio, i) =>
  radio.addEventListener('click', (e) => handleClickRadio(e, i))
);
