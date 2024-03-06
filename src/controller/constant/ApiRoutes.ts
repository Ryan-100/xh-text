export const apiRoutes = {
  login: `post:auth/guard-user-signin`,

  //counter
  all_counter: `get:counter`,
  get_counter: `get:counter`,
  create_counter: `post:counter`,
  update_counter: `put:counter`,
  delete_counter: `delete:counter`,

  //system-noti
  system_noti_history: `get:system-notification`,
  send_system_noti: `post:system-notification`,
  
  //app-version
  version_history: `get:version`,
  send_version: `post:version`,

  //amount
  all_amount: `get:delivery-fee`,
  get_amount: `get:delivery-fee`,
  create_amount: `post:delivery-fee`,
  update_amount: `put:delivery-fee`,
  delete_amount: `delete:delivery-fee`,
  //city
  all_city: `get:city`,
  get_city: `get:city`,
  create_city: `post:city`,
  update_city: `put:city`,
  delete_city: `delete:city`,
};
