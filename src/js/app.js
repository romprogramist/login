import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import "./plugins";
import axios from "./plugins/axios";
// import API_ENV from "../config/api.config";

import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import locations from "./store/location";
import formUI from "./views/form";
// import formValue from "./store/valuesInputs";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});
inputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    notify({ mas: "Login faild", className: "alert-danger" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  locations
    .init()
    .then((r) => {
      formUI.setAutocompleteDataC(locations.countries);
    })
    .catch((error) => {
      alert(error);
    });

  formUI.country.addEventListener("change", function (e) {
    locations.setCountryIndexByName(this.value);

    locations.init1().then((c) => {
      formUI.setAutocompleteData(locations.shortCitiesList);
    });
  });

  document
    .querySelector(".locationControls")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      onFormSubmit();
    });

  async function onFormSubmit() {
    const emaill = formUI.emaillValue;
    const password = formUI.passwordValue;
    const nickname = formUI.nicknameValue;
    const first_name = formUI.first_nameValue;
    const last_name = formUI.last_nameValue;
    const phone = formUI.phoneValue;
    const gender_orientation = formUI.gender_orientationValue;
    const city = formUI.cityValue;
    const country = formUI.countryValue;
    const date_of_birth_day = formUI.date_of_birth_dayValue;
    const date_of_birth_month = formUI.date_of_birth_monthValue;
    const date_of_birth_year = formUI.date_of_birth_yearValue;   


    axios.post(`https://mlp-demo.herokuapp.com/api/public/auth/signup`, {
      'email': emaill,
      'password': password,
      'nickname': nickname,
      'first_name': first_name,
      'last_name': last_name,
      'phone': phone,
      'gender_orientation': gender_orientation,
      'city': city,
      'country': country,
      'date_of_birth_day': date_of_birth_day,
      'date_of_birth_month': date_of_birth_month,
      'date_of_birth_year': date_of_birth_year,
    });
  }
});
