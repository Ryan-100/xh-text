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
  PaymentMethod,
  RoleList,
  AllVersions,
  AmountCreate,
  CustomerForm,
  ParcelCreate,
  WeightCreate,
  CityCreate,
  CounterCreate,
  PaymentCreate,
  RoleCreate,
  VersionCreate,
  ParcelLists,
  ParcelListCreate,
  RiderList,
  RiderForm,
  CustomerDetails,
  CustomerHistory,
  Banner,
  CustomerReport,
  ParcelReport,
  VoucherReport,
  CounterReport,
  BannerForm,
  AdminCreate,
  ProfileEdit,
  AdminDetail,
  EditAdminPermission,
  CounterDetails,
  RiderDetails,
} from "../element";
import MovieMenu from "../../pages/menu";
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
        element: <AdminCreate />,
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
        path: "create",
        element: <CounterCreate />,
      },
      {
        path: "edit/:id",
        element: <CounterCreate />,
      },
      {
        path: ":id",
        element: <CounterDetails />,
      },
      {
        path: "riders/:id",
        element: <RiderDetails />,
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
        path: "amount",
        element: <Amount />,
      },
      {
        path: "amount/create",
        element: <AmountCreate />,
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
        path: "weight",
        element: <WeightList />,
      },
      {
        path: "weight/create",
        element: <WeightCreate />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/create",
        element: <CityCreate />,
      },
      {
        path: "counters",
        element: <CounterList />,
      },
      {
        path: "counters/create",
        element: <CounterCreate />,
      },
      {
        path: "payment-type",
        element: <PaymentMethod />,
      },
      {
        path: "payment-type/create",
        element: <PaymentCreate />,
      },
      {
        path: "roles",
        element: <RoleList />,
      },
      {
        path: "roles/create",
        element: <RoleCreate />,
      },
      {
        path: "versions",
        element: <AllVersions />,
      },
      {
        path: "versions/create",
        element: <VersionCreate />,
      },
    ],
  },
  {
    path: "/advertisement",
    element: <DashboardLayout />,
    children: [
      {
        path: "banner",
        element: <Banner />,
      },
      {
        path: "banner/:id",
        element: <BannerForm />,
      },
      {
        path: "banner/create",
        element: <BannerForm />,
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
        path: "parcels",
        element: <ParcelReport />,
      },
      {
        path: "vouchers",
        element: <VoucherReport />,
      },
      {
        path: "counters",
        element: <CounterReport />,
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
