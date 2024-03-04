export type ISide = {
  link?: string;
  name: string;
  icon?: string;
  children?: { name: string; link: string; icon?: string }[];
};

export const items: ISide[] = [
  {
    link: "/dashboard",
    name: "Main Dashboard",
    icon: "dashboard",
    children: [
      { name: "Main Dashboard", link: "/dashboard" },
      { name: "Parcels", link: "/dashboard-parcels" },
      { name: "Customers", link: "/dashboard-customers" },
      { name: "Counters", link: "/dashboard-counters" },
      { name: "Riders", link: "/dashboard-riders" },
    ],
  },
  {
    link: "/admin",
    name: "Admins",
    icon: "people",
    children: [
      { name: "All Admins", link: "/admin" },
      { name: "Create Admins", link: "/admin/create" },
    ],
  },
  {
    link: "/counters",
    name: "Counters",
    icon: "counter",
    children: [
      { name: "All Counters", link: "/counters" },
      { name: "Create Counter", link: "/counters/create" },
    ],
  },
  {
    link: "/reports",
    name: "Report",
    icon: "report",
    children: [
      { name: "Daily Report", link: "/reports/daily", icon: "parcel" },
      { name: "Monthly Report", link: "/reports/monthly", icon: "parcel" },
      { name: "Yearly Report", link: "/reports/yearly", icon: "parcel" },
      { name: "Income Report", link: "/reports/income", icon: "parcel" },
      { name: "Parcel Report", link: "/reports/parcels", icon: "parcel" },
      { name: "Counter Report", link: "/reports/counters", icon: "counter" },
      { name: "Rider Report", link: "/reports/riders", icon: "voucher" },
      { name: "Customer Report", link: "/reports/customers", icon: "user" },
    ],
  },
  {
    link: "/setting",
    name: "Settings",
    icon: "setting",
  },

  {
    link: "/login",
    name: "Logout",
    icon: "logout",
  },
];

export const permissionData = [
  "View Parcel List",
  "View Customers",
  "Create Customers",
  "View Rider Reports",
  "View Income Reports",
  "View Parcel List",
  "View Customers",
  "Create Customers",
  "View Rider Reports",
  "View Income Reports",
  "View Parcel List",
  "View Customers",
  "Create Customers",
  "View Rider Reports",
  "View Income Reports",
];

export const counterOptions = [
  { value: "headquater", label: "headquater" },
  { value: "jiegao", label: "jiegao" },
  { value: "lasio", label: "lasio" },
  { value: "muse", label: "muse" },
  { value: "mandalay", label: "mandalay" },
];

export const parcelOptions = [
  { value: "daily use", label: "daily use" },
  { value: "cloth", label: "cloth" },
  { value: "gadget", label: "gadget" },
];

export const weightOptions = [
  { value: "0-1", label: "0-1" },
  { value: "1-2", label: "1-2" },
  { value: "2-3", label: "2-3" },
];

export const currencyOptions = [
  { value: "MMK", label: "MMK" },
  { value: "¥", label: "¥" },
];

export const roleOptions = [
  { value: "superAdmin", label: "superAdmin" },
  { value: "admin", label: "admin" },
];

export const weightRows = [
  {
    id: 1,
    weight: "1+",
  },
  {
    id: 2,
    weight: "2+",
  },
];
export const cityRows = [
  {
    id: 1,
    name: "Jiegao",
    prefix: "JGO",
    currency: "¥",
  },
  {
    id: 2,
    name: "Lasio",
    prefix: "LAO",
    currency: "¥",
  },
  {
    id: 3,
    name: "Mandalay",
    prefix: "MDY",
    currency: "MMK",
  },
];
export const permissionRows = [
  {
    id: 1,
    branch: "Jiegao",
    role: "A",
    permission:['Scan Parcels','Create Customer','Create Rider','Create Admin'],
    counter: "丽缘",
  },
  {
    id: 2,
    branch: "Lasio",
    role: "B",
    permission:['Scan Parcels','Create Customer','Create Rider','Create Admin'],
    counter: "达锅",
  },
  {
    id: 3,
    branch: "Lasio",
    role: "B",
    permission:['Scan Parcels','Create Customer','Create Rider','Create Admin'],
    counter: "桂美",
  },
  {
    id: 4,
    branch: "Mandalay",
    role: "A",
    permission:['Scan Parcels','Create Customer','Create Rider','Create Admin'],
    counter: "TZT",
  },
];
export const counterRows = [
  {
    id: 1,
    city: "Jiegao",
    region: "Shan State",
    block: "A",
    counter: "丽缘",
  },
  {
    id: 2,
    city: "Lasio",
    region: "Shan State",
    block: "B",
    counter: "达锅",
  },
  {
    id: 3,
    city: "Lasio",
    region: "Shan State",
    block: "B",
    counter: "桂美",
  },
  {
    id: 4,
    city: "Mandalay",
    region: "Mandalay",
    block: "A",
    counter: "TZT",
  },
];
export const counterReports = [
  {
    id: 21,
    date: "1/12/21",
    scanned_customer: 0,
    item: "0_ 0 MMK / 0.00 ¥",
    delivered: "0_ 0 MMK / 0.00 ¥",
    pick_up: "0 / 0 ¥",
  },
  {
    id: 15,
    date: "2/11/22",
    scanned_customer: 0,
    item: "0_ 0 MMK / 0.00 ¥",
    delivered: "0_ 0 MMK / 0.00 ¥",
    pick_up: "0_ 0 MMK / 0.00 ¥",
  },
  {
    id: 345,
    date: "2/1/22",
    scanned_customer: 0,
    item: "0_ 0 MMK / 0.00 ¥",
    delivered: "0_ 0 MMK / 0.00 ¥",
    pick_up: "0_ 0 MMK / 0.00 ¥",
  },
];
export const voucherReports = [
  {
    id: 21,
    date: "1/12/21",
    delivered: "0 / 0 ¥",
    pick_up: "0 / 0 ¥",
  },
  {
    id: 15,
    date: "2/11/22",
    delivered: "0 / 0 ¥",
    pick_up: "0 / 0 ¥",
  },
];
export const parcelReports = [
  {
    id: 21,
    date: "1/12/21",
    arrive_jiegao: 0,
    arrive_lasio: "24_915 ¥",
    take_lasio: "0_0.00 ¥",
    arrive_laukkai: "0_0.00MMK",
    take_laukkai: "0_0.00 ¥",
    arrive_muse: "0_0.00 ¥",
    take_muse: "0_0.00 ¥",
  },
  {
    id: 15,
    date: "2/11/22",
    arrive_jiegao: 0,
    arrive_lasio: "3_915 ¥",
    take_lasio: "0_0.00MMK",
    arrive_laukkai: "0_0.00MMK",
    take_laukkai: 0,
    arrive_muse: "0_0.00 ¥",
    take_muse: "0_0.00 ¥",
  },
  {
    id: 12,
    date: "5/1/20",
    arrive_jiegao: 0,
    arrive_lasio: 0,
    take_lasio: 0,
    arrive_laukkai: 0,
    take_laukkai: 0,
    arrive_muse: 0,
    take_muse: 0,
  },
  {
    id: 154,
    date: "3/2/22",
    arrive_jiegao: "419_11915 ¥",
    arrive_lasio: 0,
    take_lasio: 0,
    arrive_laukkai: 0,
    take_laukkai: 0,
    arrive_muse: 0,
    take_muse: 0,
  },
  {
    id: 13,
    date: "4/4/23",
    arrive_jiegao: 0,
    arrive_lasio: 0,
    take_lasio: 0,
    arrive_laukkai: 0,
    take_laukkai: 0,
    arrive_muse: 0,
    take_muse: 0,
  },
];
export const roleRows = [
  {
    id: 1,
    role: "Jiegao_Admin_Role",
  },
  {
    id: 2,
    role: "Lashio_Admin_Role",
  },
  {
    id: 5,
    role: "Lashio_Counter_Admin_Role",
  },
  {
    id: 3,
    role: "Mandalay_Admin_Role",
  },
  {
    id: 4,
    role: "Mandalay_Counter_Admin_Role",
  },
];
export const parcelLists = [
  {
    id: 1,
    barcode: "123123123",
    username: "mg mg",
    type: "Daily used",
    counter: "达锅",
  },
  {
    id: 2,
    barcode: "85676743563",
    username: "staff",
    type: "Cloth",
    counter: "桂美",
  },
  {
    id: 3,
    barcode: "42345345345",
    username: "ffats",
    type: "Gadgets",
    counter: "TZT",
  },
];

export const packageRows = [
  {
    id: 1,
    type: "barcode",
    code: "012345678901222",
    parcel_type: "Electronic Devices",
    kg_amount: "1 KG | 4,000 Ks",
  },
  {
    id: 2,
    type: "parcel",
    code: "LAB1P112345678",
    parcel_type: "Electronic Devices",
    kg_amount: "1 KG | 4,000 Ks",
  },
  {
    id: 11,
    type: "barcode",
    code: "012345678901222",
    parcel_type: "Electronic Devices",
    kg_amount: "1 KG | 4,000 Ks",
  },
  {
    id: 22,
    type: "parcel",
    code: "LAB1P112345678",
    parcel_type: "Electronic Devices",
    kg_amount: "1 KG | 4,000 Ks",
  },
];
export const counterReportDetailRows = [
  {
    id: 1,
    customer_id: "012345678901222",
    package_id:"LABAER012345",
    item_amount: "10/100,000 Ks",
    status:"Delivery"
  },
  {
    id: 2,
    customer_id: "LAB1P112345678",
    package_id:"LABAER012345",
    item_amount: "10/100,000 Ks",
    status:"Picked up"
  },
]
export const parcelReportRows = [
  {
    id: 1,
    time:'11:10:00 AM',
    type: "barcode",
    code: "012345678901222",
    scan_rider: "KyiD7Dkk801",
    user_id:"LABAER012345",
    weight_amount: "10/100,000 Ks",
    status:"Delivery"
  },
  {
    id: 2,
    time:'11:10:00 AM',
    type: "parcel",
    code: "LAB1P112345678",
    scan_rider: "KyiD7Dkk801",
    user_id:"LABAER012345",
    weight_amount: "10/100,000 Ks",
    status:"Picked up"
  },
  {
    id: 11,
    time:'11:10:00 AM',
    type: "barcode",
    code: "012345678901222",
    scan_rider: "KyiD7Dkk801",
    user_id:"LABAER012345",
    weight_amount: "10/100,000 Ks",
    status:"Picked up"
  },
  {
    id: 22,
    time:'11:10:00 AM',
    type: "parcel",
    code: "LAB1P112345678",
    scan_rider: "KyiD7Dkk801",
    user_id:"LABAER012345",
    weight_amount: "10/100,000 Ks",
    status:"Picked up"
  },
];

export const parcelDetail = {
  barcode:'012345678976543',
  charges:'2,500 MMK',
  user_id:"LA12345Q",
  parcel_type:'Electronic Devices',
  weight:'5 KG',
  date:'10 Jan 2023, 12:25:25 PM',
  rider:'Kyaw12345Q',
  status:'Pick Up'
}

export const dailyReportSheet = {
  customers :[
    { id: 1, key: "Total Customers", value: "50,000,000" },
    { id: 1, key: "New Customers", value: "5,000" },
  ],
  income:[
    { id: 1, key: "Total Income", value: "8,000,000,000 Ks" },
    { id: 1, key: "Jie Gong Branch Counter 1", value: "4,000,000,000 Ks" },
    { id: 1, key: "Lashio Branch Counter 1", value: "4,000,000,000 Ks" },
    { id: 1, key: "Muse Branch Counter 1", value: "4,000,000,000 Ks" },
  ],
  parcel:[
    { id: 1, key: "Total Parcel", value1: "30,000,000",value2:"Scan Parcels = 4,000,000   Customized Parcels = 1,000,000 Total Pickup Parcels = 20,000,000  Total Delivery Parcels = 10,000,000" },
    { id: 2, key: "Jie Gong Branch Counter 1", value1: "5,000,000",value2:"Scan Parcels = 4,000,000   Customized Parcels = 1,000,000" },
    { id: 3, key: "Jie Gong Branch Counter 1", value1: "5,000,000",value2:"Scan Parcels = 4,000,000   Customized Parcels = 1,000,000" },
    { id: 3, key: "Jie Gong Branch Counter 1", value1: "5,000,000",value2:"Scan Parcels = 4,000,000   Customized Parcels = 1,000,000" },
    
  ]
}

export const incomeReportSheet = {
  daily: [
    { id: 1, key: "Today Income", value: "50,000,000 Ks" },
    { id: 1, key: "Pickup Amount", value: "20,000,000 Ks" },
    { id: 1, key: "Delivery Amount", value: "20,000,000 Ks" },
  ],
  monthly: [
    { id: 1, key: "Today Income", value: "50,000,000 Ks" },
    { id: 1, key: "Pickup Amount", value: "20,000,000 Ks" },
    { id: 1, key: "Delivery Amount", value: "20,000,000 Ks" },
  ],
  yearly: [
    { id: 1, key: "Today Income", value: "50,000,000 Ks" },
    { id: 1, key: "Pickup Amount", value: "20,000,000 Ks" },
    { id: 1, key: "Delivery Amount", value: "20,000,000 Ks" },
  ],
};

export const incomeReportDetail = [
  {
    id:1,
    package_user:'LA068259638 / Kyaw12345Q',
    parcel_price:"50 / 100,000 Ks",
    status:'Delivered',
  },
  {
    id:13,
    package_user:'LA068259638 / Kyaw12345Q',
    parcel_price:"50 / 100,000 Ks",
    status:'Pick Up',
  },
  {
    id:11,
    package_user:'LA068259638 / Kyaw12345Q',
    parcel_price:"50 / 100,000 Ks",
    status:'Pick Up',
  },
]

export const incomeReportRows = {
  daily: [
    {
      id: 1,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
    {
      id: 2,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
    {
      id: 3,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
  ],
  monthly: [
    {
      id: 1,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
    {
      id: 2,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
    {
      id: 3,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
  ],
  yearly: [
    {
      id: 1,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
    {
      id: 2,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
    {
      id: 3,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      pickup: "2,000,000 Ks",
      delivery: "2,000,000 Ks",
    },
  ],
};

export const counterReportRows = {
  daily: [
    {
      id: 1,
      counter: "Lashio_Branch_Counter1",
      income: "",
      parcels: 2000,
    },
    {
      id: 2,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
    {
      id: 3,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
  ],
  monthly: [
    {
      id: 1,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
    {
      id: 2,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
    {
      id: 3,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
  ],
  yearly: [
    {
      id: 1,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
    {
      id: 2,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
    {
      id: 3,
      counter: "Lashio_Branch_Counter1",
      income: "5,000,000 Ks",
      parcels: 2000,
    },
  ],
};

export const customerHistoryRows = {
  pickup: [
    {
      id: 1,
      date: "9 Sep 2023, 11:00:00 AM",
      parcel: 11,
      package_id: "LABAER012387",
      amount: "10,000 Ks",
    },
    {
      id: 1,
      date: "9 Sep 2023, 11:00:00 AM",
      parcel: 112,
      package_id: "LABAER012387",
      amount: "310,000 Ks",
    },
    {
      id: 1,
      date: "9 Sep 2023, 11:00:00 AM",
      parcel: 341,
      package_id: "LABAER012387",
      amount: "210,000 Ks",
    },
  ],

  delivery: [
    {
      id: 1,
      date: "9 Sep 2023, 11:00:00 AM",
      parcel: 11,
      package_id: "LABAER012387",
      amount: "10,000 Ks",
    },
    {
      id: 1,
      date: "9 Sep 2023, 11:00:00 AM",
      parcel: 112,
      package_id: "LABAER012387",
      amount: "310,000 Ks",
    },
    {
      id: 1,
      date: "9 Sep 2023, 11:00:00 AM",
      parcel: 341,
      package_id: "LABAER012387",
      amount: "210,000 Ks",
    },
  ],
};
export const historyRows = [
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
  {
    id: 1,
    date: "9 Sep 2023, 11:00:00 AM",
    cus_id: "LABAER012345",
    package_id: "LABAER012387",
    item_amount: "10/10,000 Ks",
    counter: "Lashio_Branch_Counter1",
  },
];
export const parcelRows = [
  {
    id: 1,
    type: "Daily used",
    status: "Default",
  },
  {
    id: 2,
    type: "Cloth",
    status: "Default",
  },
  {
    id: 3,
    type: "Gadgets",
    status: "Default",
  },
];
export const versionRows = [
  {
    id: 1,
    os: "android",
    app: "XH Express",
    link: "http://68.183.187.160:3000/",
    version: "22",
    update: true,
  },
  {
    id: 2,
    os: "IOS",
    app: "XH Express",
    link: "http://68.183.187.160:3000/",
    version: "1.2.1",
    update: true,
  },
  {
    id: 3,
    os: "rider",
    app: "XH Express",
    link: "http://68.183.187.160:3000/",
    version: "21",
    update: true,
  },
  {
    id: 4,
    os: "counter",
    app: "XH Express",
    link: "http://68.183.187.160:3000/",
    version: "1.1.2",
    update: true,
  },
];
export const paymentRows = [
  {
    id: 23423,
    method: "Cash On Delivery",
    city: "Mandalay",
    icon: "data:image/png;base64,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",
    switch: true,
  },
  {
    id: 4234,
    method: "KBZPay",
    city: "Lasio",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEUAVKb///8AR6EARKDEzuPg5fAAUqUASaIAS6IAQZ8ATqQARaDr7vWZrdEATaMAUKQAP56vvtq5xt5pir/19/tvjsAUWainuNbR2unw8/iGn8kxZq7b4u68yeA+brHn6/Naf7l5lcQlYKtRebbJ0+U9bbGQps1IdLQAOJyKosudsdJ+mcZ0ksISWKgAL5lihLwAKJcANZscfsdrAAANMklEQVR4nO2dZ5uiOhiGKUooCtjrjHWcHXWO5/z/P3eUBEgjhKKYvXg+7Y4IuU1/S9D0v11a0wV4ulpC9dUSqq+WUH21hOqrJVRfLaGujzfdN9aiImFn+ek45jvLCVeXj7KE3Z3p2YH27gp8wxnNSxD2bqFvNV16WbnO57ooYT98/9rDFYSXYoSfRtNFLiww7ckT9iy36fKWUGByWyqPsAfUaqGJQh4ih3BsKQqoaSanoXIIP1VsolDBrwxhX71BJpU9ySfshU2XspJCZu5nCG/KdsJIwSqPsKt2Fd4Hm04O4c5vuogVFXznEJrKrEWzFPaEhB2v6QJWFpgJCZd20wWsrGArJPxUeyR9yAJCQqfp8tUgZyEgHP8NhN5aQLgxmy5eDfKOAsLu30BodFpC1dUSqq+WUH21hOqrJVRfLaH6agnVV0uovlpC9dUSqq+WUH0VJbSCbEN/ELyjp6oYYeDst6uQH7rghqvt3iH4LcAJrvMMwL+BZeSE5fGiXmzOdeTtCxHa3937X8cTns/NnDz8A5tvzFvlTwfdHq3N+ji7aibrefX3ww1zNaHOJ2AA+wvmssWFQCxCGBzQ35fMk7QwdtOl7iqf8msRd146FKMruDrRjvb2gSHnqg+ieEUIzXH8wZTucOEg/mgdf8fiBLNgGk8It49lSwDq+p55MO2nv2tYljAYJR/0qd8yBdT1eLgBA12sjxArrr+UIpwxrYeDWJrQ7icfdMgH4YD6CjVTs5tX3DkW6EE7ozN0ZOOXWMRaCIkHEYA6QDXDCyqjNPB4Nxepw44ALGLthCTgMS61uckv8HcyLFl7KUK6e3AR6yYMyeHsN+5cMoTz9AHgR4aQGWl4iDUTUoD7pFZkCNPfQ9O8UW7H1YcZ0S8kYr2EJOD4N112YIT/eLGM6Y1o03jMVWA6HqMQb729zAAmArFWQhKwhy9aMcJ0zLSswAiwumJHf1IBUaDf7DUxjlgnYUhkb3SJhSNGSIZ0BNjkPhRHr1oePiB/iWJ5McQaCUnAuUO0oUxCzUsrfiiuQyI8dJRzbYd/0yqEJOAxJDtJNiF2I3ErJfrAKS9YOUGsjZAEHFKAAkKQ3mgpiu70Ttj9B/nRSzFiXYTkCD1jQm2zCZ207a0EgXNghN1/LhPKi4pUEyEJ2Gd/4UxCI90nbQQV435i98+eJziI9RCSgEuOQQcj/OPG8m0jxHYR1+zRkcwk0CSDJKNi1UL4D/G1K3fTnxLeJrF2J7zzipqegYcUihozi1gH4ZAYZG7cATF/1bYQxOcSGT23AoG8d8TSe/ysDc7HH+6jcgm7rmCJgs8Ty0Kx2E7/i7hvDYT6pVQd9unpBf8u/iiJeYIQlehaB6H+zRswcgjHg31m1QA8mUdqnhCoFkKdZwrO74dDN8PyiudIbKomRNRDyEutkdkfHnjtO5hiV4wr29HrIdSHwhk/WyPOKAnKzRNPJuSMNlKEHAJinthWT/ioQHjEWxObmoERgmmq/ecV3+Vv6PZNrOeXNSQ/lif8CMEV/z/dYfA9voUpcIGJzXZU+p95xm45qyMbojTh4P7jO/i8vKZqI3tvoVl/0qeSplfiRzvWkhpYlhBuJhy8r1Ezs4AQt44SWSs+MU84tbgjSxIuYbmIgV3fEaONiFALEyePbqccAW5Yqz5PVCHsxO3HvuHXf0lZoijCVQJi2WPsZtXniUqESecxcY/KGKsPcSvFEsrSn8XBTcKHuhIDq9u88ekLH21EhLgFJjHUE5tq/mq+EULLwr+BjTaZhFbg4P7e+Bn1zxM1EWruAf/KJPntcas+cQwQuOHPjPPjwA774/Bf2UiFVxBqHjFPJgMERkhEIOCjiZ5YTMnEeV7IwmbDiVR4DSFpmR57sYdUal0a/yJUlmCGriWGnzoINWKUj52YcoQfaBscyFyc5T98PmGAmza7qMwSXu57jSObd3DLv/ahPF/VswgJB+4CDYNSdRj3Wveaf+1DnEiFGgndXfIB81OGaTeK6xCIz017qLePzRjBIffiSDm+qoqEWFDPFz1uW16yMY/7YfCVV9wzFgXn5J+W99Ch+IRRJCbKjk8IG7BtJRntF/FYqgFhEFCv7+L1wZzQwdWgxCkWhSL3PIh45i043K+oFuZWOtoZB/65cIv54LJ3qIHfXwkOykM/yqXMSqdY9KVtTE47i98XAud2uqwI21/gOQYtz3FMD3DO7+NdTMjkBDTWTqhZri1wF9n+G56j0UZBq6+WsIps06F0H2NefgTqEwm9n8WYUm8+PH2Hrz2H8XmELnveHdLw65UHbD2PEHAisGMd97WZYXL1PEJDQJgYXF+gpxPi3RC/9+BVp/k9m3D2Hz6Wel+X5HmzF01FzyYcEB3OCnwvsZXeXnMw6msJH7KAhWzb3ktG1NcT3hlDiHh6yYl+TRDGdvLeS8bTRgjjCFPGvWQFru/73BRHK9vZJvhIa4oQVSIRPxsAM9xvJ5fLbvTpMRZ8+3ebldsZgO1UsIBohhA5j9MPAxBuZ5jNozsjrQWRiYhvhoosRIJDOhsihB8mZlewYhPd8JWd5T/+MuYuEszIvpPdUBsihKl7cY6UfdJ52iWPt6Alb8KZQS3oaF+9G6ERRXHEFmzqiNFEp8R46EQrPl5wGThnV2+ThNDVFIe6Guhxg8thNd1/TmaxQ2AUD0U2dBt8sz0RRgSc364fkuV6lL93+nXAfaKIQorCA3LrxMmMlhn9lz3XGLl0rOz5ohlCZOFO4qHA9MuxCUsrcuqf46+jGZRJQIaNgfYUseV4NaEDHTlpjTDvX0Aru6R/IacJ7RKyYIFF7oxGCFGuyIfIVYaih5Kyo0Rhg6xE6PFjwv/YcryWECAvjDgmyIzqOUmLRbX1Qw4pYeQsuYjM/a8nDMIdvDvHg4UL5q+nmQVwglkQ1YUO6xZuw168A34Mk2hxtsjZHsLRaJ70VRTtN8JnfU80XhPleB4hYcUw96NZ4t2f0m00sA0T2Y0N4FpwsYIVAeKs8S2XG91JHL5QhNAt5N4S29oWNCAIv/ud6L1p4966M7vuQ48qAnIqY8HIcLU3F9dDET/+Vb8WCBQQEg5NEhBYMyqSSB9/0EWAWX3YrA/fezASm9ALxmIUQBQQrr9Jo7cV8pfeVBFQOEOS4Q57qmBJWoawAGIW4XjwRZ7Tc1+SpQ7uxWZDxIURRXCiQSqZ9Y2olrnHLFQg1CeyiPDOY/zthPPObLd3GMdMHDW2/lmFTvSKv+n256PHFgEtQtEgjIJU82ySxSOGZGsRjaV/yAOUOA58AJvo4uAknjcrsEEYsEUIo00HmvVtOGHmFadETJQkonBvgQmtODcGXRkhWwQ/Cp1Csz5cuea+gqNM1Jccoiwh2vqx5yU4bBHQKi2a9eHkkf8yo1JxbVKIsoRw/8OJBeIRwpYZzfrQEJL/MqNykXsyiLKEZlotpDj9EGE/os7QnjjfqFwy30ICUZYQlpntTnBVzRyoFhXivuP1d49/SERjls2ZyUcsRshaYODpGTShBW06mgXnRmbPXx9hPqI0IX+Lhw5DYxb/cCc88yL74lFia1A+dy0PsdhIw2T7ojwOdnsD46X/RKBbiaiOCvmHOasbWUJ0UtuIuFtsieIQGnAMfSztpF5dWCWHVIwoPeMje/A2TVULvH2XW4To+jSbTMoBWSlLVogoS5gE5g6nDvBd3wYO9GL88AnRTvghIONErpYHLEKUJtScuAzr2fK6Ow3hmvvMWbVFSsKR5YK+K2Y6CxDlCamzfKAujpVBiKxwsvl7VXO5s89fgcP6j5Sv3tlRt12vgBZZMeacyG5kMV/LOcmLEPI24uPMGcny761tLRl6boMTloBy3D72yNHzOL6YeFfB87VVI9TcEaNJtt/u3ppuB+lYBMsOV8tB53gcnkfAg1hgNeK79KPRNM96EauQNTFwGQlHM8GpyryC+8C475Ht1J2b8X24njtLjTNKxgijsVT211OPEHmlpHO8lCG0DWjFCdBpBdLGaVUIjfOxvwpNMzzA9dxFOmJMEUJ07HIvdvAXOFBCEUIqXXNTIKxREULyZPK11JIbSRFCzUjPbhgvBaeEcb6pCKEGws+fwUdn2D+ExcJSlSF8eFABMIrn3ChEWFItofpqCdVXS6i+WkL11RKqr5ZQfbWE6qslVF8tofpqCdWXcRQQLl52eMUT5c0FhPqrzq54ppyeiLCu04qblKmLCIUpU2qIPpGRIswNE39/2WchoUQI7rvL6YoJOcHJaok8n5hDOFe9Ej36lcg0YX46w3uLfe0yQ0i/00ExmUxMIENY4/HvDchlD+9lCdlcT4UE6KRGLmFP3eV3yDnWlkOoblfkBeZyCfW5qWRD5QLyCfXe70tO5apVLuCfvMwn1PVJqFY1WuaBHWSEhPp8pVBTDbzfzAPhMwl1vfM4WvWF546WVWA7K3qpJkd4746zLXA8T3zqdrPyHO9wFr6jXUj40GJ97LyvjvPcV07kEiqvllB9tYTqqyVUXy2h+moJ1VdLqL7+B/ma7xJ+xAK/AAAAAElFTkSuQmCC",
    switch: true,
  },
];

export const amountRows = [
  {
    id: 1,
    city: "Mandalay",
    parcelType: "Daily used",
    weight: "0-1",
    amount: "3000 MMK",
  },
  {
    id: 2,
    city: "Jiegao",
    parcelType: "Daily used",
    weight: "0-1",
    amount: "3000 MMK",
  },
  {
    id: 3,
    city: "Lashio",
    parcelType: "Daily used",
    weight: "0-1",
    amount: "3000 MMK",
  },
  {
    id: 4,
    city: "Muse",
    parcelType: "Daily used",
    weight: "0-1",
    amount: "3000 MMK",
  },
];

export const customerRows = [
  {
    id: 1,
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    name: "john-doe",
    phone: "+999-343-212",
    city: "Mandalay",
    region: "Mandalay",
  },
  {
    id: 2,
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    name: "john-wick",
    phone: "+899-343-212",
    city: "Jiegao",
    region: "Jiegao",
  },
  {
    id: 3,
    name: "david-holland",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    phone: "+799-343-212",
    city: "Lasio",
    region: "Lasio",
  },
  {
    id: 4,
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    name: "ryan-gastling",
    phone: "+919-343-212",
    city: "Muse",
    region: "Muse",
  },
];

export const riderRows = [
  {
    id: 1,
    name: "john_doe",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    phone: "+123-456-789",
    city: "Lasio",
    counter: "Lasio",
    createdAt: "28/4/23",
    switch: true,
  },
  {
    id: 2,
    name: "jane_smith",
    img: "https://images.unsplash.com/photo-1677123718817-5a203404d638?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    phone: "+123-456-789e",
    city: "Mandalay",
    counter: "Mandalay",
    createdAt: "12/3/22",
    switch: true,
  },
  {
    id: 3,
    name: "david_brown",
    img: "https://images.unsplash.com/photo-1697472925037-e38438b132b0?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    phone: "+123-456-789",
    city: "Muse",
    counter: "Muse",
    createdAt: "25/4/21",
    switch: true,
  },
  {
    id: 4,
    name: "lisa_wilson",
    img: "https://images.unsplash.com/photo-1697472106815-829bad01f7b8?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    phone: "+123-456-789g",
    city: "Jiegao",
    counter: "Jiegao",
    createdAt: "29/1/21",
    switch: true,
  },
];
export const bannderRows = [
  {
    id: 1,
    createdAt: "28/4/23",
    link: "www.banner.com",
    img: "https://alidropship.com/wp-content/uploads/2019/12/best-banner-ads-examples.jpg",
    status: "active",
  },
  {
    id: 2,
    createdAt: "2/4/23",
    link: "www.banner.com",
    img: "https://startupnation.com/wp-content/uploads/2021/11/banner-templates--1920x1024.jpg",
    status: "passive",
  },
];
export const userRows = [
  {
    id: 1,
    username: "john_doe",
    img: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    status: "active",
    email: "john.doe@example.com",
    age: 28,
  },
  {
    id: 2,
    username: "jane_smith",
    img: "https://images.unsplash.com/photo-1677123718817-5a203404d638?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    status: "passive",
    email: "jane.smith@example.com",
    age: 32,
  },
  {
    id: 3,
    username: "david_brown",
    img: "https://images.unsplash.com/photo-1697472925037-e38438b132b0?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    status: "active",
    email: "david.brown@example.com",
    age: 25,
  },
  {
    id: 4,
    username: "lisa_wilson",
    img: "https://images.unsplash.com/photo-1697472106815-829bad01f7b8?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    status: "pending",
    email: "lisa.wilson@example.com",
    age: 29,
  },
  {
    id: 5,
    username: "michael_johnson",
    img: "https://images.unsplash.com/photo-1689997665293-c798b812a244?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    status: "passive",
    email: "michael.johnson@example.com",
    age: 35,
  },

  {
    id: 6,
    username: "jane_smith",
    img: "https://images.unsplash.com/photo-1677123718817-5a203404d638?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    status: "passive",
    email: "jane.smith@example.com",
    age: 32,
  },
  {
    id: 7,
    username: "david_brown",
    img: "https://images.unsplash.com/photo-1697472925037-e38438b132b0?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    status: "active",
    email: "david.brown@example.com",
    age: 25,
  },
  {
    id: 8,
    username: "lisa_wilson",
    img: "https://images.unsplash.com/photo-1697472106815-829bad01f7b8?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    status: "pending",
    email: "lisa.wilson@example.com",
    age: 29,
  },
  {
    id: 9,
    username: "michael_johnson",
    img: "https://images.unsplash.com/photo-1689997665293-c798b812a244?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    status: "passive",
    email: "michael.johnson@example.com",
    age: 35,
  },
  {
    id: 10,
    username: "jane_smith",
    img: "https://images.unsplash.com/photo-1677123718817-5a203404d638?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    status: "passive",
    email: "jane.smith@example.com",
    age: 23,
  },
  {
    id: 11,
    username: "david_brown",
    img: "https://images.unsplash.com/photo-1697472925037-e38438b132b0?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    status: "active",
    email: "david.brown@example.com",
    age: 25,
  },
  {
    id: 12,
    username: "lisa_wilson",
    img: "https://images.unsplash.com/photo-1697472106815-829bad01f7b8?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
    status: "pending",
    email: "lisa.wilson@example.com",
    age: 29,
  },
  {
    id: 13,
    username: "michael_johnson",
    img: "https://images.unsplash.com/photo-1689997665293-c798b812a244?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    status: "passive",
    email: "michael.johnson@example.com",
    age: 35,
  },
];

export const adminHeaders = ["ID", "Name", "Email"];

export const dummyAdmin = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
  },
  {
    id: 5,
    name: "Eve White",
    email: "eve@example.com",
  },
];
export const movieHeaders = ["ID", "name", "email", "gender"];

export const dummyMovies = [
  {
    id: 1,
    name: "The Shawshank Redemption",
    email: "Drama",
    gender: 9.3,
  },
  {
    id: 2,
    name: "The Godfather",
    email: "Crime",
    gender: 9.2,
  },
  {
    id: 3,
    name: "Pulp Fiction",
    email: "Crime",
    gender: 8.9,
  },
  {
    id: 4,
    name: "The Dark Knight",
    email: "Action",
    gender: 9.0,
  },
  {
    id: 5,
    name: "Fight Club",
    email: "Drama",
    gender: 8.8,
  },
];
