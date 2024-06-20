export const getAuthUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const saveAuthUserToStorage = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};
