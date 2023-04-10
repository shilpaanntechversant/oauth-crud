const axios = require('axios');

export default class BaseService {
  constructor() {
    this.baseURL = process.env.VUE_APP_API_URL;
    this.http = axios;
  }

  getUserToken = () => {
    this.userToken = localStorage.getItem('token');
    return this.userToken;
  }
}
