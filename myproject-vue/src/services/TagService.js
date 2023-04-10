import BaseService from './BaseService';


export default class TagService extends BaseService {
    tagList(param) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}tag?page=${param}`;
          this.http.get(apiEndpoint,{
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.getUserToken()}`,
            },
          }).then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
      tagListWithOutPagination() {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}tag/list`;
          this.http.get(apiEndpoint,{
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.getUserToken()}`,
            },
          }).then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
      tagCreate(tagData) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}tag/`;
          this.http.post(apiEndpoint,tagData,{
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

      tagDetails(tagId) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}tag/${tagId}`;
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

      tagUpdate(tagData) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}tag/${tagData.id}`;
          this.http.put(apiEndpoint,tagData,{
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

      tagDelete(tagId) {
        return new Promise((resolve, reject) => {
          const apiEndpoint = `${this.baseURL}tag/${tagId}`;
          this.http.delete(apiEndpoint,{
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.getUserToken()}`,
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