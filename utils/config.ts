export const baseURL = "https://backend.dev.pististechub.io/api/v2/auth";

export const urls = {
  signup: `${baseURL}/users/`,
  changePassword: `${baseURL}/reset_password_confirm/`,
  activateEmail: `${baseURL}/activation/`,
  signin: `${baseURL}/jwt/create/`,
  forgotPassword: `${baseURL}/reset_password/`,
  adminRefreshToken: `${baseURL}/jwt/refresh/`,
  studentDashboard: `${baseURL}/dashboard/`,
  deleteStudent: `${baseURL}/deactivate_me/`,
  courses: `${baseURL}/courses/`,
  updateStudentProfile: `${baseURL}/me/`,
  setStudentPassword: `${baseURL}/set_password/`,
  activities: `${baseURL}/activities/`,
  resendToken: `${baseURL}/resend_activation/`,
  projectReview: `${baseURL}/project-review/`,
  getStudents: `${baseURL}/courses-ands/`,
  plans: `${baseURL}/subscriptions/payment-plans/`,
  makeBeginnerPayment: `${baseURL}/subscriptions/make-payment-beginner/`,
  makeIntermediatePayment: `${baseURL}/subscriptions/make-payment-intermidiate/`,
};
