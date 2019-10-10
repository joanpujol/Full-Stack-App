import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        if(!data.error && data.message) {
          return [{message: data.message}];
        }
        return data.error.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async createCourse(courseData, username, password) {
    const response = await this.api("/courses", "POST", courseData, true, {username, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.error.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(courseId, courseData, username, password) {
    const response = await this.api(`/courses/${courseId}`, "PUT", courseData, true, {username, password});
    if (response.status === 204) {
      return [];
    }
    else if ([400, 403].includes(response.status)) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(courseId, username, password) {
    const response = await this.api(`/courses/${courseId}`, "DELETE", null, true, {username, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.error.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
