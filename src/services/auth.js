import api from './api';
import endpoints from './endpoints';

export const signup             = (userData) => api.post(endpoints.signup, userData);
export const verifyOTP          = (email, otp) => api.post(endpoints.verifyOTP, { email, otp });
export const requestPwdReset    = (email) => api.post(endpoints.requestPwdReset, { email });
export const verifyResetOTP     = (email, otp, newPassword) =>
  api.post(endpoints.verifyResetOTP, { email, otp, new_password: newPassword });