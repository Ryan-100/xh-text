import { useRoutes, Navigate } from "react-router-dom";
import {
  DashboardLayout,
  Dashboard,
  AdminList,
  UserProfile,
  CustomerLists,
  Amount,
  ParcelType,
  WeightList,
  CityList,
  CounterList,
  RoleList,
  AllVersions,
  AmountCreate,
  CustomerForm,
  ParcelCreate,
  WeightCreate,
  CityCreate,
  CounterCreate,
  RoleCreate,
  ParcelLists,
  ParcelListCreate,
  RiderList,
  RiderForm,
  CustomerDetails,
  CustomerHistory,
  CustomerReport,
  ParcelReport,
  CounterReport,
  AdminCreate,
  ProfileEdit,
  AdminDetail,
  EditAdminPermission,
  CounterDetails,
  RiderDetails,
  DeliveredHistory,
  PackageDetail,
  DailyReport,
  MonthlyReport,
  YearlyReport,
  IncomeReport,
  RiderReport,
  IncomeReportDetail,
  ParcelReportDetail,
  ParcelDetail,
  CounterReportDetail,
  CounterReportInvoice,
  RiderReportDetail,
  RiderStatusDetail,
  RiderPackageOnDate,
  RiderPackageDetail,
  CustomerDetail,
  CustomerOrderHistory,
  Setting,
  AppVersion,
  AmountDetail,
  AmountEdit,
  ParcelTypeDetail,
  ParcelEdit,
  WeightDetail,
  WeightEdit,
  CityDetail,
  EditCity,
  RoleDetail,
  AdminRoleEdit,
  PermissionLists,
  PermissionCreate,
  PermissionDetail,
  PermissionEdit,
  CurrencyList,
  CurrencyCreate,
  CurrencyDetail,
  EditCurrency,
  PaymentList,
  PaymentCreate,
  PaymentDetail,
  PaymentEdit,
  TimeList,
  TimeCreate,
  TimeDetail,
  TimeEdit,
  RegionList,
  RegionCreate,
  RegionDetail,
  RegionEdit,
  BlockList,
  BlockCreate,
  BlockDetail,
  BlockEdit,
  VoucherDetail,
  VoucherEdit,
  HelpCenterList,
  HelpCenterEdit,
  HelpCenterCreate,
  UserGuide,
  TermsAndPolicy,
  SendNotification,
  NotificationHistory,
  Onboarding,
  Banner,
  Ads,
  CounterEdit,
  MainCounterScan,
  AdminEdit,
  MainCounterCustom,
  MainCounterDetailScan
} from "../element";
import Login from "../../pages/login";

const routes = [
  {
    path: "",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <AdminList />,
      },
      {
        path: "create",
        element: <AdminCreate />,
      },
      {
        path: "edit/:id",
        element: <AdminEdit />,
      },
      {
        path: "edit/permissions/:id",
        element: <EditAdminPermission />,
      },
      {
        path: ":id",
        element: <AdminDetail />,
      },
    ],
  },
  {
    path: "/rider",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <RiderList />,
      },
      {
        path: "edit/:id",
        element: <RiderForm />,
      },
      {
        path: "create",
        element: <RiderForm />,
      },
    ],
  },
  {
    path: "/customers",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <CustomerLists />,
      },
      {
        path: "edit/:id",
        element: <CustomerForm />,
      },
      {
        path: "history/:id",
        element: <CustomerHistory />,
      },
      {
        path: ":id",
        element: <CustomerDetails />,
      },
      {
        path: "create",
        element: <CustomerForm />,
      },
    ],
  },
  {
    path: "/counters",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <CounterList />,
      },
      {
        path: "/counters/main-counter-scan-parcel/:counterId",
        element: <MainCounterScan />,
      },
      {
        path: "/counters/main-counter-parcel/:counterId",
        element: <MainCounterCustom />,
      },
      {
        path: "/counters/main-counter-parcel/scan-detail/:counterId",
        element: <MainCounterDetailScan />,
      },
      {
        path: "create",
        element: <CounterCreate />,
      },
      {
        path: "edit/:id",
        element: <CounterEdit />,
      },
      {
        path: ":id",
        element: <CounterDetails />,
      },
      {
        path: "riders/:id",
        element: <RiderDetails />,
      },
      {
        path: "delivered-history",
        element: <DeliveredHistory />,
      },
      {
        path: "delivered-history/package/:id",
        element: <PackageDetail />,
      },
      {
        path: "customer/:id",
        element: <CustomerDetails />,
      },
      {
        path: "customer-history",
        element: <CustomerHistory />,
      },
    ],
  },
  {
    path: "/parcel-lists",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <ParcelLists />,
      },
      {
        path: "create",
        element: <ParcelListCreate />,
      },
    ],
  },
  {
    path: "/setting",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Setting />,
      },
      {
        path: "notification",
        element: <SendNotification />,
      },
      {
        path: "notification/history",
        element: <NotificationHistory />,
      },
      {
        path: "notification/history?filter_type=:filterType&from_date=:fromDate&to_date=:toDate",
        element: <NotificationHistory />,
      },
      {
        path: "onboarding",
        element: <Onboarding />,
      },
      {
        path: "advertising-ads",
        element: <Banner />,
      },
      {
        path: "ads",
        element: <Ads />,
      },
      {
        path: "amount",
        element: <Amount />,
      },
      {
        path: "amount/create",
        element: <AmountCreate />,
      },
      {
        path: "amount/:id",
        element: <AmountDetail />,
      },
      {
        path: "amount/:id/edit",
        element: <AmountEdit />,
      },
      {
        path: "parcel-type",
        element: <ParcelType />,
      },
      {
        path: "parcel-type/create",
        element: <ParcelCreate />,
      },
      {
        path: "parcel-type/:id",
        element: <ParcelTypeDetail />,
      },
      {
        path: "parcel-type/:id/edit",
        element: <ParcelEdit />,
      },
      {
        path: "weight",
        element: <WeightList />,
      },
      {
        path: "weight/create",
        element: <WeightCreate />,
      },
      {
        path: "weight/:id",
        element: <WeightDetail />,
      },
      {
        path: "weight/:id/edit",
        element: <WeightEdit />,
      },
      {
        path: "city",
        element: <CityList />,
      },
      {
        path: "city/create",
        element: <CityCreate />,
      },
      {
        path: "city/:id",
        element: <CityDetail />,
      },
      {
        path: "city/:id/edit",
        element: <EditCity />,
      },
      {
        path: "currency",
        element: <CurrencyList />,
      },
      {
        path: "currency/create",
        element: <CurrencyCreate />,
      },
      {
        path: "currency/:id",
        element: <CurrencyDetail />,
      },
      {
        path: "currency/:id/edit",
        element: <EditCurrency />,
      },
      {
        path: "open-close",
        element: <TimeList />,
      },
      {
        path: "open-close/create",
        element: <TimeCreate />,
      },
      {
        path: "open-close/:id",
        element: <TimeDetail />,
      },
      {
        path: "open-close/:id/edit",
        element: <TimeEdit />,
      },
      {
        path: "region",
        element: <RegionList />,
      },
      {
        path: "region/create",
        element: <RegionCreate />,
      },
      {
        path: "region/:id",
        element: <RegionDetail />,
      },
      {
        path: "region/:id/edit",
        element: <RegionEdit />,
      },
      {
        path: "block",
        element: <BlockList />,
      },
      {
        path: "block/create",
        element: <BlockCreate />,
      },
      {
        path: "block/:id",
        element: <BlockDetail />,
      },
      {
        path: "block/:id/edit",
        element: <BlockEdit />,
      },
      {
        path: "payment-method",
        element: <PaymentList />,
      },
      {
        path: "payment-method/create",
        element: <PaymentCreate />,
      },
      {
        path: "payment-method/:id",
        element: <PaymentDetail />,
      },
      {
        path: "payment-method/:id/edit",
        element: <PaymentEdit />,
      },
      {
        path: "admin-role",
        element: <RoleList />,
      },
      {
        path: "admin-role/create",
        element: <RoleCreate />,
      },
      {
        path: "admin-role/:id",
        element: <RoleDetail />,
      },
      {
        path: "admin-role/:id/edit",
        element: <AdminRoleEdit />,
      },
      {
        path: "admin-permission",
        element: <PermissionLists />,
      },
      {
        path: "admin-permission/create",
        element: <PermissionCreate />,
      },
      {
        path: "admin-permission/:id",
        element: <PermissionDetail />,
      },
      {
        path: "admin-permission/:id/edit",
        element: <PermissionEdit />,
      },
      {
        path: "app-version",
        element: <AppVersion />,
      },
      {
        path: "app-version/history",
        element: <AllVersions />,
      },
      {
        path: "app-version/history?skip=:skipValue&take=:takeValue&filter[app_name]=:appValue",
        element: <AllVersions />,
      },
      {
        path: "voucher",
        element: <VoucherDetail />,
      },
      {
        path: "voucher/:id",
        element: <VoucherEdit />,
      },
      {
        path: "user-guide",
        element: <UserGuide />,
      },
      {
        path: "help-center",
        element: <HelpCenterList />,
      },
      {
        path: "help-center/create",
        element: <HelpCenterCreate />,
      },
      {
        path: "help-center/:id/edit",
        element: <HelpCenterEdit />,
      },
      {
        path: "terms-and-policy",
        element: <TermsAndPolicy />,
      },
      
    ],
  },
  {
    path: "/reports",
    element: <DashboardLayout />,
    children: [
      {
        path: "customers",
        element: <CustomerReport />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetail />,
      },
      {
        path: "customers/:id/history",
        element: <CustomerOrderHistory />,
      },
      {
        path: "daily",
        element: <DailyReport />,
      },
      {
        path: "monthly",
        element: <MonthlyReport />,
      },
      {
        path: "yearly",
        element: <YearlyReport />,
      },
      {
        path: "income",
        element: <IncomeReport />,
      },
      {
        path: "income/:id",
        element: <IncomeReportDetail />,
      },
      {
        path: "parcels",
        element: <ParcelReport />,
      },
      {
        path: "parcels/:id",
        element: <ParcelReportDetail />,
      },
      {
        path: "parcels/detail/:id",
        element: <ParcelDetail />,
      },
      {
        path: "riders",
        element: <RiderReport />,
      },
      {
        path: "riders/:id",
        element: <RiderReportDetail />,
      },
      {
        path: "riders/status/:id",
        element: <RiderStatusDetail />,
      },
      {
        path: "riders/packages-date/:id",
        element: <RiderPackageOnDate />,
      },
      {
        path: "riders/packages/:id",
        element: <RiderPackageDetail />,
      },
      {
        path: "counters",
        element: <CounterReport />,
      },
      {
        path: "counters/:id",
        element: <CounterReportDetail />,
      },
      {
        path: "counters/:id/invoice",
        element: <CounterReportInvoice />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "profile/edit",
        element: <ProfileEdit />,
      },
    ],
  },
];

const AdminRoutes = () => {
  return useRoutes(routes);
};

export default AdminRoutes;
