export const apiRoutes = {
	login: `post:auth/admin-user-signin`,

  //counter
  all_counter: `get:counter`,
  get_counter: `get:counter`,
  create_counter: `post:counter`,
  main_counter: `get:counter/main-counter`,
  other_counter: `get:counter/other-counter`,
  main_counter_parcel_detail: `get:counter/main-counter-parcel/detail?counter_id={counter_id}&from_date={from_date}&to_date={to_date}&skip={skip}&take={take}&parcel_type={parcel_type}`,
  update_counter: `patch:counter`,
  delete_counter: `delete:counter`,

	//image upload
	upload_image: `post:upload`,

	//user guide
	create_userguide: `post:user-guide`,

	//MODULE
	get_module: `get:module`,

	//terms-and-policy
	create_terms: `post:term-and-policy`,

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

  //permission
  all_permission: `get:role-item`,
  get_permission: `get:role-item`,
  create_permission: `post:role-item`,
  update_permission: `post:role-item`,
  delete_permission: `delete:role-item`,

  //currency
  all_currency: `get:currency`,
  get_currency: `get:currency`,
  create_currency: `post:currency`,
  update_currency: `patch:currency`,
  delete_currency: `delete:currency`,

  //app-banner
  all_app_banner: `get:app-banner`,
  get_app_banner: `get:app-banner`,
  create_app_banner: `post:app-banner`,
  update_app_banner: `patch:app-banner`,
  delete_app_banner: `delete:app-banner`,

  //app-just-banner
  all_app_just_banner: `get:app-just-banner`,
  get_app_just_banner: `get:app-just-banner`,
  create_app_just_banner: `post:app-just-banner`,
  update_app_just_banner: `patch:app-just-banner`,
  delete_app_just_banner: `delete:app-just-banner`,

  //ads-banner
  all_ads_banner: `get:ads-banner`,
  get_ads_banner: `get:ads-banner`,
  create_ads_banner: `post:ads-banner`,
  update_ads_banner: `patch:ads-banner`,
  delete_ads_banner: `delete:ads-banner`,

  //payment-type
  all_payment: `get:payment-type`,
  get_payment: `get:payment-type`,
  create_payment: `post:payment-type`,
  update_payment: `patch:payment-type`,
  delete_payment: `delete:payment-type`,

  //weight
  all_weight: `get:weight`,
  get_weight: `get:weight`,
  create_weight: `post:weight`,
  update_weight: `patch:weight`,
  delete_weight: `delete:weight`,

  //help-center
  all_help_center: `get:help-sender`,
  get_help_center: `get:help-sender`,
  create_help_center: `post:help-sender`,
  update_help_center: `patch:help-sender`,
  delete_help_center: `delete:help-sender`,

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

  // report
  get_report: `get:admin-dashboard-report/daily-monthly-yearly-report`,

  // income daily report
  get_daily_income_report: `get:admin-dashboard-report/daily-income-report`,

};
