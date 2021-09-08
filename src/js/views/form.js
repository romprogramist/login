import { getAutocompleteInstance } from "../plugins/materialize";

/**
 * Function inputErrorTemplate
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
    <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 * Function showInputError. Add input error
 * @param {HTMLInputElement} el
 */
export function showInputError(el) {
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || "Invalid input";
  const template = inputErrorTemplate(msg);
  el.classList.add("is-invalid");
  parent.insertAdjacentHTML("beforeend", template);
}
/**
 * Function removeInputError. Remove input error
 * @param {HTMLInputElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector(".invalid-feedback");
  if (!err) return;

  el.classList.remove("is-invalid");
  parent.removeChild(err);
}

class FormUI {
  constructor(autocompleteInstance) {
    this._form = document.forms["locationControls"];
    this.emaill = document.getElementById("emaill");
    this.password = document.getElementById("passwor");
    this.nickname = document.getElementById("nickname");
    this.first_name = document.getElementById("first_name");
    this.last_name = document.getElementById("last_name");
    this.phone = document.getElementById("phone");
    this.gender_orientation = document.getElementById("gender_orientation");
    this.city = document.getElementById("city");
    this.country = document.getElementById("country");
    this.date_of_birth_day = document.getElementById("date_of_birth_day");
    this.date_of_birth_month = document.getElementById("date_of_birth_month");
    this.date_of_birth_year = document.getElementById("date_of_birth_year");

    this.cityAutocompletev = autocompleteInstance(this.city);
    this.countryAutocompletev = autocompleteInstance(this.country);
  }
  get formValue() {
    return this._form.value;
  }
  get emaillValue() {
    return this.emaill.value;
  }
  get passwordValue() {
    return this.password.value;
  }
  get nicknameValue() {
    return this.nickname.value;
  }
  get first_nameValue() {
    return this.first_name.value;
  }
  get last_nameValue() {
    return this.last_name.value;
  }
  get phoneValue() {
    return this.phone.value;
  }
  get gender_orientationValue() {
    return this.gender_orientation.value;
  }
  get cityValue() {
    return this.city.value;
  }
  get countryValue() {
    return this.country.value;
  }
  get date_of_birth_dayValue() {
    return this.date_of_birth_day.value;
  }
  get date_of_birth_monthValue() {
    return this.date_of_birth_month.value;
  }
  get date_of_birth_yearValue() {
    return this.date_of_birth_year.value;
  }

  setAutocompleteData(data) {
    this.cityAutocompletev.updateData(data);
  }
  setAutocompleteDataC(data) {
    this.countryAutocompletev.updateData(data);
  }
}
const formUI = new FormUI(getAutocompleteInstance);

export default formUI;
