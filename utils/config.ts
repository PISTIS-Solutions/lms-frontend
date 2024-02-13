export const baseURL = "https://pistis-lms-backend.onrender.com/api/v1/auth";

export const urls = {
  signup: `${baseURL}/users/student/`,
  changePassword: `${baseURL}/users/student/reset_password_confirm/`,
  activateEmail: `${baseURL}/users/student/activation/`,
  signin: `${baseURL}/jwt/create/`,
};
