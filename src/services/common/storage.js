export const getAccessToken = () => localStorage.getItem('accessToken')
export const removeAccessToken = () => localStorage.removeItem('accessToken')
export const setAccessToken = (token) => localStorage.setItem('accessToken', token)
export const removeAuthToken = () => localStorage.removeItem('auth');