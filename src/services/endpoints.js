const base = '/api/v1';

const endpoints = {
  // auth
  signup:            `${base}/signup`,
  verifyOTP:         `${base}/verify-otp`,
  requestPwdReset:   `${base}/forgot-password`,
  verifyResetOTP:    `${base}/verify-reset-otp`,

  // portfolio
  portfolio:  (userId) => `${base}/portfolio?user_id=${userId}`,
  metrics:    (userId) => `${base}/metrics/${userId}`,
};

export default endpoints;