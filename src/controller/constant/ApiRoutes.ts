export const apiRoutes = {
	login: `post:auth/admin-user-signin`,

	//counter
	all_counter: `get:counter`,
	get_counter: `get:counter`,
	create_counter: `post:counter`,
	update_counter: `put:counter`,
	delete_counter: `delete:counter`,

	//system-noti
	system_noti_history: `get:system-notification`,
	send_system_noti: `post:system-notification`,

  //amount
  all_amount: `get:delivery-fee`,
  get_amount: `get:delivery-fee`,
  create_amount: `post:delivery-fee`,
  update_amount: `patch:delivery-fee`,
  delete_amount: `delete:delivery-fee`,
  //city
  all_city: `get:city`,
  get_city: `get:city`,
  create_city: `post:city`,
  update_city: `patch:city`,
  delete_city: `delete:city`,

  //currency
  all_currency: `get:currency`,
  get_currency: `get:currency`,
  create_currency: `post:currency`,
  update_currency: `patch:currency`,
  delete_currency: `delete:currency`,

  //weight
  all_weight: `get:weight`,
  get_weight: `get:weight`,
  create_weight: `post:weight`,
  update_weight: `patch:weight`,
  delete_weight: `delete:weight`,

  //parcel-type
  all_parcel: `get:parcel-type`,
  get_parcel: `get:parcel-type`,
  create_parcel: `post:parcel-type`,
  update_parcel: `patch:parcel-type`,
  delete_parcel: `delete:parcel-type`,

	//app-version
	version_history: `get:version`,
	send_version: `post:version`,


	// admin
	all_admin: `get:admin-user`,
	create_admin: `post:admin-user`,
	update_admin: `patch:admin-user`,
	get_admin: `get:admin-user`,
	delete_admin: `delete:admin-user`,

	// role
	all_role: `get:role`,
  get_role: `get:role`,
  create_role: `post:role`,
  update_role: `patch:role`,
  delete_role: `delete:role`,

	// region
	all_region: `get:region`,
  get_region: `get:region`,
  create_region: `post:region`,
  update_region: `patch:region`,
  delete_region: `delete:region`,

	// block
	all_block: `get:block`,
  get_block: `get:block`,
  create_block: `post:block`,
  update_block: `patch:block`,
  delete_block: `delete:block`,
};
