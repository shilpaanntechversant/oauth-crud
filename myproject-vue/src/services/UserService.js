import BaseService from './BaseService';

export default class UserService extends BaseService {
    
    userList(param) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}user?page=${param}`;
          this.http.get(apiEndpoint,{
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer  ${this.getUserToken()}`,
            },
          }).then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

      
    
  
}