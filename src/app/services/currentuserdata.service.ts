import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserdataService {
  public currentUser = this.get_current_user();
  constructor( ) { }
  get_current_user() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser;
    } else {
      currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (currentUser) {
        return currentUser;
      }
    }
    return "";
  }


  get_user_token() {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return token.access.token;
    } else {
      token = JSON.parse(sessionStorage.getItem('token'));

      if (token) {
        return token.access.token;
      }
    }
    return '';
  }
  get_user_reftoken() {
    let token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
    if (token) {
      return  token.refresh.token
    } else {

      token = JSON.parse(sessionStorage.getItem('token'));
      console.log('else')
      console.log(token.refresh)
      if (token) {
        return token.refresh.token;
      }
    }
    return '';
  }

  set_user_data(data, rememberme = false) {
    if (rememberme == true) {
      localStorage.setItem('currentUser', JSON.stringify(data['user']));
      localStorage.setItem('token', JSON.stringify(data['tokens']));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(data['user']));
      sessionStorage.setItem('token', JSON.stringify(data['tokens']));
    }
    return true;
  }

  savetoken(tokenData) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token && Object.keys(token).length) {
      localStorage.setItem('token', JSON.stringify(tokenData['tokens']));
    } else {
      token = JSON.parse(sessionStorage.getItem('token'));
      if (token && Object.keys(token).length) {
        sessionStorage.setItem('token', JSON.stringify(tokenData['tokens']));
      }
    }
  }
  destory() {
    localStorage.clear();
    sessionStorage.clear();
  }
  isAuthenticated(): boolean {
    const token = this.get_user_token();
    const get_current_user = this.get_current_user();
    return (token && get_current_user)?true:false
  }
}
