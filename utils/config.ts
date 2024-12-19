export const baseURL = "https://backend.pististechub.io/api/v1/auth";

// export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const urls = {
  signup: `${baseURL}/users/student/`,
  changePassword: `${baseURL}/users/student/reset_password_confirm/`,
  activateEmail: `${baseURL}/users/student/activation/`,
  signin: `${baseURL}/jwt/create/`,
  forgotPassword: `${baseURL}/users/student/reset_password/`,
  adminRefreshToken: `${baseURL}/jwt/refresh/`,
  studentDashboard: `${baseURL}/users/student/dashboard/`,
  deleteStudent: `${baseURL}/users/student/deactivate_me/`,
  courses: `${baseURL}/courses/`,
  updateStudentProfile: `${baseURL}/users/student/me/`,
  setStudentPassword: `${baseURL}/users/student/set_password/`,
  activities: `${baseURL}/activities/`,
  resendToken: `${baseURL}/users/student/resend_activation/`,
  projectReview: `${baseURL}/users/student/project-review/`,
  getStudents: `${baseURL}/courses-and-students/`,
  bookings: `${baseURL}/users/booking/`,
  getSessions: `${baseURL}/users/booking/get_count/`,
  getAllSession: `${baseURL}/users/booking/get_all/`,
};
