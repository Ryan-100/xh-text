export const apiRoutes = {
  login: `post:auth/guard-user-signin`,

  //counter
  all_counter:`get:counter`,
  get_counter:`get:counter`,
  create_counter:`post:counter`,
  update_counter:`put:counter`,
  delete_counter:`delete:counter`,

  //system-noti
  system_noti_history:`get:system-notification`,
  send_system_noti:`post:system-notification`,

  // admin
  all_admin: `get:admin-user`,
  get_admin: `get:admin-user`,

  // role
  all_role: `get:role`,
};
