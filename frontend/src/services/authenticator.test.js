import Authenticator from './authenticator';

class TestStorage {
  constructor(items = {}) {
    this.items = items;
  }
  setItem(key, value) {
    this.items[key] = value;
  }
  removeItem(key) {
    delete this.items[key];
  }

  getItem(key) {
    return this.items[key];
  }
}

describe('Authenticator', () => {
  
  test("login sets user credentials", () => {
    const testStorage = new TestStorage();
    const authenticator = new Authenticator(testStorage);
    const expiration = 1595085263;
    authenticator.login("token", expiration);
    expect(testStorage.items).toEqual({
      token: "token",
      expiration: new Date(expiration * 1000).toLocaleString(),
    });
  });

  test("logout removes user credentials", () => {
    const testStorage = new TestStorage();
    const authenticator = new Authenticator(testStorage);
    const expiration = 1595085263;
    authenticator.login("token", expiration);
    authenticator.logout();
    expect(testStorage.items).toEqual({});
  });

  test("isLoginValid returns false for expired credentials", () => {
    const testStorage = new TestStorage();
    const authenticator = new Authenticator(testStorage);
    const expiration = 1594838441;
    authenticator.login("token", expiration);
    expect(authenticator.isLoginValid()).toBe(false);
  });

  test("isLoggedIn returns true with credentials", () => {
    const testStorage = new TestStorage();
    const authenticator = new Authenticator(testStorage);
    const expiration = 1594838441;
    authenticator.login("token", expiration);
    expect(authenticator.isLoggedIn()).toBe(true);
  });  

})