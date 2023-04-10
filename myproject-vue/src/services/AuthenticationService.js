import BaseService from './BaseService';

export default class AuthenticationService extends BaseService {
    
    registerUser(userData) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}user/register`;
          this.http.post(apiEndpoint, userData)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

      loginUser(userData) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}user/login`;
          this.http.post(apiEndpoint, userData)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
      // logoutUser(userToken) {
      //   return new Promise((resolve, reject) => {
      //     const apiEndpoint = `${this.baseURL}user/logout`;
      //     this.http.post(apiEndpoint, userToken,{
      //       headers: {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //         Authorization: `Token  ${this.getUserToken()}`,
      //       },
      //     }).then((response) => {
      //         resolve(response);
      //       })
      //       .catch((error) => {
      //         reject(error);
      //       });
      //   });
      // }
    
  
}