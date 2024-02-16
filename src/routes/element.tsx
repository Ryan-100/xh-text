
import { lazy, ElementType, Suspense, SuspenseProps } from "react";


// loading screen

const Loadable = (Component: ElementType) => (props: SuspenseProps) =>
  (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
           loading
        </div>
        
      }
    >
      <Component {...props} />
    </Suspense>
  );

export const DashboardLayout = Loadable(lazy(() => import("../layout")));

export const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

export const UserProfile = Loadable(lazy(() => import("../pages/profilePage")));

export const ProfileEdit = Loadable(lazy(() => import("../pages/profilePage/components/ProfileEditComponent")));

export const AdminList = Loadable(lazy(() => import("../pages/admin")));

export const AdminCreate = Loadable(lazy(() => import("../pages/admin/Create")));

export const AdminDetail = Loadable(lazy(() => import("../pages/admin/Detail")));

export const EditAdminPermission = Loadable(lazy(() => import("../pages/admin/EditPermission")));

export const RiderList = Loadable(lazy(() => import("../pages/rider")));

export const RiderForm = Loadable(lazy(() => import("../pages/rider/Create")));

export const RiderDetails = Loadable(lazy(() => import("../pages/rider/RiderDetail")));

export const ParcelLists = Loadable(lazy(()=>import("../pages/parcelList/ParcelLists")));

export const ParcelListCreate = Loadable(lazy(()=>import("../pages/parcelList/Create")));

export const CustomerLists = Loadable(lazy(()=>import("../pages/customer")))

export const CustomerForm = Loadable(lazy(()=>import("../pages/customer/Create")))

export const CustomerDetails = Loadable(lazy(()=>import("../pages/customer/Detail")))

export const CustomerHistory = Loadable(lazy(()=>import("../pages/customer/History")))

export const Amount = Loadable(lazy(()=>import("../pages/setting/amount/Amount")))

export const AmountCreate = Loadable(lazy(()=>import("../pages/setting/amount/Create")))

export const ParcelType = Loadable(lazy(()=>import("../pages/setting/parcel/ParcelType")))

export const ParcelCreate = Loadable(lazy(()=>import("../pages/setting/parcel/Create")))

export const WeightList = Loadable(lazy(()=>import("../pages/setting/weight/WeightList")))

export const WeightCreate = Loadable(lazy(()=>import("../pages/setting/weight/Create")))

export const CityList = Loadable(lazy(()=>import("../pages/setting/city/CityList")))

export const CityCreate = Loadable(lazy(()=>import("../pages/setting/city/Create")))

export const CounterList = Loadable(lazy(()=>import("../pages/counter/CounterList")))

export const CounterCreate = Loadable(lazy(()=>import("../pages/counter/CreateorEdit")))

export const CounterDetails = Loadable(lazy(()=>import("../pages/counter/CounterDetail")))

export const RoleList = Loadable(lazy(()=>import("../pages/setting/roles/RoleList")))

export const RoleCreate = Loadable(lazy(()=>import("../pages/setting/roles/Create")))

export const PaymentMethod = Loadable(lazy(()=>import("../pages/setting/payment/PaymentMethod")))

export const PaymentCreate = Loadable(lazy(()=>import("../pages/setting/payment/Create")))

export const AllVersions = Loadable(lazy(()=>import("../pages/setting/version/AllVersions")))

export const VersionCreate = Loadable(lazy(()=>import("../pages/setting/version/Create")))

export const Banner = Loadable(lazy(()=>import("../pages/ads/Banner/Banner")))

export const BannerForm = Loadable(lazy(()=>import("../pages/ads/Banner/BannerForm")))

export const CustomerReport = Loadable(lazy(()=>import("../pages/report/customer")))

export const ParcelReport = Loadable(lazy(()=>import("../pages/report/parcel")))

export const CounterReport = Loadable(lazy(()=>import("../pages/report/counter")))

export const VoucherReport = Loadable(lazy(()=>import("../pages/report/voucher")))
