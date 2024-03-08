import { lazy, ElementType, Suspense, SuspenseProps } from "react";

// loading screen

const Loadable = (Component: ElementType) => (props: SuspenseProps) =>
  (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">loading</div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export const DashboardLayout = Loadable(lazy(() => import("../layout")));

export const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

export const UserProfile = Loadable(lazy(() => import("../pages/profilePage")));

export const ProfileEdit = Loadable(
  lazy(() => import("../pages/profilePage/components/ProfileEditComponent"))
);

export const AdminList = Loadable(lazy(() => import("../pages/admin")));

export const AdminCreate = Loadable(
  lazy(() => import("../pages/admin/Create"))
);

export const AdminDetail = Loadable(
  lazy(() => import("../pages/admin/Detail"))
);

export const EditAdminPermission = Loadable(
  lazy(() => import("../pages/admin/EditPermission"))
);

export const RiderList = Loadable(lazy(() => import("../pages/rider")));

export const RiderForm = Loadable(lazy(() => import("../pages/rider/Create")));

export const RiderDetails = Loadable(
  lazy(() => import("../pages/rider/RiderDetail"))
);

export const ParcelLists = Loadable(
  lazy(() => import("../pages/parcelList/ParcelLists"))
);

export const ParcelListCreate = Loadable(
  lazy(() => import("../pages/parcelList/Create"))
);

export const CustomerLists = Loadable(lazy(() => import("../pages/customer")));

export const CustomerForm = Loadable(
  lazy(() => import("../pages/customer/Create"))
);

export const CustomerDetails = Loadable(
  lazy(() => import("../pages/customer/Detail"))
);

export const CustomerHistory = Loadable(
  lazy(() => import("../pages/customer/History"))
);

export const CounterList = Loadable(
  lazy(() => import("../pages/counter/CounterList"))
);

export const MainCounterDetail = Loadable(
  lazy(() => import("../pages/counter/MainCounterDetail"))
);

export const CounterCreate = Loadable(
  lazy(() => import("../pages/counter/CounterCreate"))
);

export const CounterEdit = Loadable(
  lazy(() => import("../pages/counter/CounterEdit"))
);

export const CounterDetails = Loadable(
  lazy(() => import("../pages/counter/CounterDetail"))
);

export const DeliveredHistory = Loadable(
  lazy(() => import("../pages/counter/DeliveredHistory"))
);

export const PackageDetail = Loadable(
  lazy(() => import("../pages/counter/PackageDetail"))
);

export const BannerForm = Loadable(
  lazy(() => import("../pages/ads/Banner/BannerForm"))
);

export const DailyReport = Loadable(
  lazy(() => import("../pages/report/daily"))
);

export const MonthlyReport = Loadable(
  lazy(() => import("../pages/report/monthly"))
);

export const YearlyReport = Loadable(
  lazy(() => import("../pages/report/yearly"))
);

export const IncomeReport = Loadable(
  lazy(() => import("../pages/report/income"))
);

export const IncomeReportDetail = Loadable(
  lazy(() => import("../pages/report/income/Detail"))
);

export const CustomerReport = Loadable(
  lazy(() => import("../pages/report/customer"))
);

export const CustomerDetail = Loadable(
  lazy(() => import("../pages/report/customer/Detail"))
);

export const CustomerOrderHistory = Loadable(
  lazy(() => import("../pages/report/customer/History"))
);

export const ParcelReport = Loadable(
  lazy(() => import("../pages/report/parcel"))
);

export const ParcelReportDetail = Loadable(
  lazy(() => import("../pages/report/parcel/ReportDetail"))
);

export const ParcelDetail = Loadable(
  lazy(() => import("../pages/report/parcel/Detail"))
);

export const CounterReport = Loadable(
  lazy(() => import("../pages/report/counter"))
);

export const CounterReportDetail = Loadable(
  lazy(() => import("../pages/report/counter/ReportDetail"))
);

export const CounterReportInvoice = Loadable(
  lazy(() => import("../pages/report/counter/Invoice"))
);

export const RiderReport = Loadable(
  lazy(() => import("../pages/report/rider"))
);

export const RiderReportDetail = Loadable(
  lazy(() => import("../pages/report/rider/ReportDetail"))
);

export const RiderStatusDetail = Loadable(
  lazy(() => import("../pages/report/rider/StatusDetail"))
);

export const RiderPackageOnDate = Loadable(
  lazy(() => import("../pages/report/rider/PackageOnDate"))
);

export const RiderPackageDetail = Loadable(
  lazy(() => import("../pages/report/rider/PackageDetail"))
);

export const Setting = Loadable(lazy(() => import("../pages/setting")));

export const RoleList = Loadable(
  lazy(() => import("../pages/setting/roles/RoleList"))
);

export const RoleCreate = Loadable(
  lazy(() => import("../pages/setting/roles/Create"))
);

export const RoleDetail = Loadable(
  lazy(() => import("../pages/setting/roles/Detail"))
);

export const Onboarding = Loadable(
  lazy(() => import("../pages/setting/photos/OnBoarding"))
);

export const Banner = Loadable(
  lazy(() => import("../pages/setting/photos/Banner"))
);

export const Ads = Loadable(
  lazy(() => import("../pages/setting/photos/Ads"))
);

export const AdminRoleEdit = Loadable(
  lazy(() => import("../pages/setting/roles/EditRole"))
);

export const PermissionLists = Loadable(
  lazy(() => import("../pages/setting/permissions/PermissionList"))
);

export const PermissionCreate = Loadable(
  lazy(() => import("../pages/setting/permissions/Create"))
);

export const PermissionDetail = Loadable(
  lazy(() => import("../pages/setting/permissions/Detail"))
);

export const PermissionEdit = Loadable(
  lazy(() => import("../pages/setting/permissions/EditPermission"))
);

export const AppVersion = Loadable(
  lazy(() => import("../pages/setting/version"))
);

export const AllVersions = Loadable(
  lazy(() => import("../pages/setting/version/AllVersions"))
);

export const NotificationHistory = Loadable(
  lazy(() => import("../pages/setting/notification/History"))
);

export const SendNotification = Loadable(
  lazy(() => import("../pages/setting/notification"))
);

export const Amount = Loadable(
  lazy(() => import("../pages/setting/amount/Amount"))
);

export const AmountCreate = Loadable(
  lazy(() => import("../pages/setting/amount/Create"))
);

export const AmountDetail = Loadable(
  lazy(() => import("../pages/setting/amount/Detail"))
);

export const AmountEdit = Loadable(
  lazy(() => import("../pages/setting/amount/EditAmount"))
);

export const ParcelType = Loadable(
  lazy(() => import("../pages/setting/parcel/ParcelType"))
);

export const ParcelCreate = Loadable(
  lazy(() => import("../pages/setting/parcel/Create"))
);

export const ParcelTypeDetail = Loadable(
  lazy(() => import("../pages/setting/parcel/Detail"))
);

export const ParcelEdit = Loadable(
  lazy(() => import("../pages/setting/parcel/EditParcel"))
);

export const WeightList = Loadable(
  lazy(() => import("../pages/setting/weight/WeightList"))
);

export const WeightCreate = Loadable(
  lazy(() => import("../pages/setting/weight/Create"))
);

export const WeightDetail = Loadable(
  lazy(() => import("../pages/setting/weight/Detail"))
);

export const WeightEdit = Loadable(
  lazy(() => import("../pages/setting/weight/EditWeight"))
);

export const CityList = Loadable(
  lazy(() => import("../pages/setting/city/CityList"))
);

export const CityCreate = Loadable(
  lazy(() => import("../pages/setting/city/Create"))
);

export const CityDetail = Loadable(
  lazy(() => import("../pages/setting/city/Detail"))
);

export const EditCity = Loadable(
  lazy(() => import("../pages/setting/city/EditCity"))
);

export const CurrencyList = Loadable(
  lazy(() => import("../pages/setting/currency/CurrencyList"))
);

export const CurrencyCreate = Loadable(
  lazy(() => import("../pages/setting/currency/Create"))
);

export const CurrencyDetail = Loadable(
  lazy(() => import("../pages/setting/currency/Detail"))
);

export const EditCurrency = Loadable(
  lazy(() => import("../pages/setting/currency/EditCurrency"))
);

export const TimeList = Loadable(
  lazy(() => import("../pages/setting/time/TimeList"))
);

export const TimeCreate = Loadable(
  lazy(() => import("../pages/setting/time/Create"))
);

export const TimeDetail = Loadable(
  lazy(() => import("../pages/setting/time/Detail"))
);

export const TimeEdit = Loadable(
  lazy(() => import("../pages/setting/time/EditTime"))
);

export const RegionList = Loadable(
  lazy(() => import("../pages/setting/region/RegionList"))
);

export const RegionCreate = Loadable(
  lazy(() => import("../pages/setting/region/Create"))
);

export const RegionDetail = Loadable(
  lazy(() => import("../pages/setting/region/Detail"))
);

export const RegionEdit = Loadable(
  lazy(() => import("../pages/setting/region/EditRegion"))
);

export const BlockList = Loadable(
  lazy(() => import("../pages/setting/block/BlockList"))
);

export const BlockCreate = Loadable(
  lazy(() => import("../pages/setting/block/Create"))
);

export const BlockDetail = Loadable(
  lazy(() => import("../pages/setting/block/Detail"))
);

export const BlockEdit = Loadable(
  lazy(() => import("../pages/setting/block/EditBlock"))
);

export const PaymentList = Loadable(
  lazy(() => import("../pages/setting/payment/PaymentList"))
);

export const PaymentCreate = Loadable(
  lazy(() => import("../pages/setting/payment/Create"))
);

export const PaymentDetail = Loadable(
  lazy(() => import("../pages/setting/payment/Detail"))
);

export const PaymentEdit = Loadable(
  lazy(() => import("../pages/setting/payment/EditPayment"))
);

export const VoucherEdit = Loadable(
  lazy(() => import("../pages/setting/voucher/Edit"))
);

export const VoucherDetail = Loadable(
  lazy(() => import("../pages/setting/voucher/Detail"))
);

export const UserGuide = Loadable(
  lazy(() => import("../pages/setting/userguide"))
);

export const HelpCenterCreate = Loadable(
  lazy(() => import("../pages/setting/helpcenter/Create"))
);

export const HelpCenterList = Loadable(
  lazy(() => import("../pages/setting/helpcenter"))
);

export const HelpCenterEdit = Loadable(
  lazy(() => import("../pages/setting/helpcenter/Edit"))
);

export const TermsAndPolicy = Loadable(
  lazy(() => import("../pages/setting/terms"))
);
