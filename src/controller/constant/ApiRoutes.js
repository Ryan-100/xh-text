export const apiRoutes = {
  login: `post:auth/signIn`,
  register: `post:auth/signUp`,
  logout: `get:auth/signOut`,
  currentUser: `get:auth/me`,
  forgotPassword: `post:auth/forgotpassword`,
  resetPassword: `put:auth/resetpassword`,
  updateUserDetail: `put:auth/updateuserdetail`,
  changePassword: `put:auth/changepasword`,
  checkOtp: `post:auth/checkOTP`,
};
