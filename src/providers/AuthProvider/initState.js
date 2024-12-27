const authInitState = JSON.parse(localStorage.getItem('auth')) || {
  isLoggedIn: false,
  user: {},
  user_detail: {}
};

export { authInitState };
