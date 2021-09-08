import api from "../services/sitisCantris";

class Locations {
  constructor(api) {
    this.api = api;
    this.countriesWithIndexes = null;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.shortCountriesList = null;
    this.inputCent = document.getElementById("country");
    this.inputCity = document.getElementById("city");
    this.index = null;
  }

  async init() {
    const response = await Promise.all([this.api.countries()]);
    const [countries] = response;
    this.countriesWithIndexes = response;
    this.countries = this.serializeCountries(countries);
    return response;
  }

  async init1() {
    if (!this.index) {
      return;
    }
    const res = await Promise.all([this.api.cities(this.index)]);
    const [cities] = res;
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return res;
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [key]) => {
      acc[key] = null;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    return Object.values(countries).reduce((acc, countriy) => {
      acc[countriy] = countriy;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    return Object.values(cities).reduce((acc, city) => {
      acc[city] = city;
      return acc;
    }, {});
  }

  setCountryIndexByName(countryName) {
    if (this.countriesWithIndexes) {
      const arrObj = Object.entries(this.countriesWithIndexes[0]).reduce(
        (acc, curr) => {
          acc[curr[1]] = curr[0];
          return acc;
        },
        {}
      );
      this.index = arrObj[countryName];
    }
  }
}

const locations = new Locations(api);

export default locations;
