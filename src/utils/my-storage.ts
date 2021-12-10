/* eslint-disable @typescript-eslint/no-explicit-any */
// 实现存储的功能。
class MyStorage {
  setItem(key: string, value: any, isLocalStorage = true) {
    isLocalStorage
      ? localStorage.setItem(key, JSON.stringify(value))
      : sessionStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string, isLocalStorage = true) {
    if (isLocalStorage === true) {
      const result = localStorage.getItem(key);
      if (result !== null) {
        return JSON.parse(result);
      }
    } else {
      const result = sessionStorage.getItem(key);
      if (result !== null) {
        return JSON.parse(result);
      }
    }
  }
  removeItem(key: string, isLocalStorage = true) {
    isLocalStorage
      ? localStorage.removeItem(key)
      : sessionStorage.removeItem(key);
  }
  clear(isLocalStorage = true) {
    isLocalStorage ? localStorage.clear() : sessionStorage.clear();
  }
}

export default new MyStorage();
