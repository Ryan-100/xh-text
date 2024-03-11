export const apiRoutes = {
	login: `post:auth/guard-user-signin`,

  //counter
  all_counter: `get:counter`,
  get_counter: `get:counter`,
  create_counter: `post:counter`,
  main_counter: `get:counter/main-counter`,
  other_counter: `get:counter/other-counter`,
  main_counter_parcel_detail: `get:counter/main-counter-parcel/detail?counter_id={counter_id}&from_date={from_date}&to_date={to_date}&skip={skip}&take={take}&parcel_type={parcel_type}`,
  update_counter: `patch:counter`,
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

  //region
  all_region:`get:region`,

  //block
all_block:"get:block"
};
