export const baseURL = "https://backend.dev.pististechub.io/api/v2/auth";

// export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const urls = {
  signup: `${baseURL}/users/`,
  changePassword: `${baseURL}/reset_password_confirm/`,
  activateEmail: `${baseURL}/activation/`,
  signin: `${baseURL}/jwt/create/`,
  forgotPassword: `${baseURL}/reset_password/`,
  adminRefreshToken: `${baseURL}/jwt/refresh/`,
  studentDashboard: `${baseURL}/students/dashboard/`,
  deleteStudent: `${baseURL}/user/deactivate_me/`,
  courses: `${baseURL}/courses/`,
  enrollCourses: `${baseURL}/students/enroll/`,
  updateStudentProfile: `${baseURL}/users/me/`,
  setStudentPassword: `${baseURL}/users/reset_password_confirm/`,
  activities: `${baseURL}/activities/`,
  resendToken: `${baseURL}/resend_activation/`,
  projectReview: `${baseURL}/students/project-review/`,
  
  plans: `${baseURL}/subscriptions/payment-plans/`,
  makeBeginnerPayment: `${baseURL}/subscriptions/make-payment-beginner/`,
  makeIntermediatePayment: `${baseURL}/subscriptions/make-payment-intermediate/`,
  
  
  getStudents: `${baseURL}/courses-and-students/`,
  bookings: `${baseURL}/booking-sessions/`,
  getSessions: `${baseURL}/booking-sessions/get_count/`,
  getAllSession: `${baseURL}/booking-sessions/`,

  cohorts: `${baseURL}/cohorts/`,
  
  waitlist: `${baseURL}/waitlist/join_waitlist/`
};
