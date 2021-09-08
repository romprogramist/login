import axios from "../plugins/axios";
import API_ENV from "../config/api.config";



class Api {
  constructor(config) {
    this.url = config.apiUrl;
    this.countr = document.getElementById('country')
    
  }
  async countries() {
    try {
      const response = await axios.get(`${this.url}/location/get-countries`); 
      return response
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  async cities(i) {
    try {
      const response = await axios.get(`${this.url}/location/get-cities/${i}`); 
      return response
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
  // async prices(params) {
  //   try {
  //     const response = await axios.post(`${this.url}/location/get-cities/auth/signup`, ); 
  //     return response
  //   } catch (error) { 
  //     return Promise.reject(error);
  //   }
  // }
  
  
}

const api = new Api(API_ENV);

export default api;
