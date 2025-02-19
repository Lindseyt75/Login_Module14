import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
    } catch (e) {
      return true;
    }
  }
  
  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('jwt_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('jwt_token', idToken);
    window.location.href = '/'; // Redirect to main Kanban board
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('jwt_token');
    window.location.href = '/login'; // Redirect to login page
  }
}

export default new AuthService();
