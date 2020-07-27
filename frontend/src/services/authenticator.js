import { TOKEN, EXPIRATION } from '../constants';

export default class Authenticator {
  constructor(sessionStorage) {
    this.sessionStorage = sessionStorage;
  }
  login(token, expirationPayload) {
    this.sessionStorage.setItem(TOKEN, token);
    const expiration = new Date(expirationPayload * 1000).toLocaleString();
    this.sessionStorage.setItem(EXPIRATION, expiration);
  }

  logout() {
    this.sessionStorage.removeItem(TOKEN);
    this.sessionStorage.removeItem(EXPIRATION);
  }

  isLoginValid() {
    const expiration = this.sessionStorage.getItem(EXPIRATION);
    return new Date().toLocaleString() < expiration;
  }

  isLoggedIn() {
    return !!this.sessionStorage.getItem(TOKEN);
  }
}