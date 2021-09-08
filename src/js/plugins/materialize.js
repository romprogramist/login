import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete, {
  minLength: 0,
});
export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}
