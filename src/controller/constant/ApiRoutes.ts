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

  //currency
  all_currency: `get:currency`,
  get_currency: `get:currency`,
  create_currency: `post:currency`,
  update_currency: `put:currency`,
  delete_currency: `delete:currency`,

  //weight
  all_weight: `get:weight`,
  get_weight: `get:weight`,
  create_weight: `post:weight`,
  update_weight: `put:weight`,
  delete_weight: `delete:weight`,

  //parcel-type
  all_parcel: `get:parcel-type`,
  get_parcel: `get:parcel-type`,
  create_parcel: `post:parcel-type`,
  update_parcel: `put:parcel-type`,
  delete_parcel: `delete:parcel-type`,

  // admin
  all_admin: `get:admin-user`,
  get_admin: `get:admin-user`,

  // role
  all_role: `get:role`,
};
