const form = document.getElementById("form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const termsInput = document.getElementById("terms");

const termsField = document.getElementById("checkbox-field");

// event handler
const handleValid = (e) => {
	const errorDescribed = e.target.attributes["aria-describedby"].value;
	const error = document.getElementById(errorDescribed);
	if (errorDescribed === "email-error") {
		handleEmailValid(e, errorDescribed);
	} else error.classList.remove("hide");
};

const handleEmailValid = (e, errorDescribed) => {
	const [valid, required] = document.querySelectorAll(`.${errorDescribed}`);
	if (e.target.value) {
		valid.classList.remove("hide");
		required.classList.add("hide");
	} else {
		required.classList.remove("hide");
		valid.classList.add("hide");
	}
};

const handleClickTerms = (e) => {
	if (e.target.ariaChecked === "true") {
		termsInput.setAttribute("checked", false);
		e.target.ariaChecked = "false";
	} else {
		termsInput.setAttribute("checked", true);
		e.target.ariaChecked = "true";
	}
};

const handleSubmit = (e) => {
	console.log(e);

	e.preventDefault();
};

// eventListeners
form.addEventListener("invalid", handleValid, true);
termsField.addEventListener("click", handleClickTerms);
