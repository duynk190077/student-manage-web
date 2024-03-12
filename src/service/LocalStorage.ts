import { KEY } from '../constant/key-storage';

class LocalStorageService {
  getLocalAccessToken() {
    return localStorage.getItem(KEY.ACCESS_TOKEN);
  }
  updateLocalAccessToken(token: string) {
    localStorage.setItem(KEY.ACCESS_TOKEN, token);
  }
  getUserId() {
    return localStorage.getItem(KEY.USER_ID);
  }
  updateUserId(userId: string) {
    localStorage.setItem(KEY.USER_ID, userId);
  }
  getRole() {
    return localStorage.getItem(KEY.ROLE);
  }
  updateRole(role: string) {
    localStorage.setItem(KEY.ROLE, role);
  }
  clearLocalStorage() {
    localStorage.clear();
  }
}

export default new LocalStorageService();
