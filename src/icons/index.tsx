import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import BalanceIcon from "@mui/icons-material/Balance";
import DomainIcon from "@mui/icons-material/Domain";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaymentIcon from "@mui/icons-material/Payment";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import PanoramaRoundedIcon from "@mui/icons-material/PanoramaRounded";
import DvrIcon from "@mui/icons-material/Dvr";
import {
  AdIcon,
  AddIcon,
  AdminIcon,
  AdminPermission,
  AdminRole,
  AppVersion,
  ArrowLeft,
  ArrowRight,
  BarCode,
  BlockIcon,
  CalendarIcon,
  CancelIcon,
  ChargesIcon,
  CityBranch,
  CopyIcon,
  CopyLinkIcon,
  CurrencyIcon,
  DashboardIcon,
  DeleteIcon,
  DeliveryIcon,
  DestinationIcon,
  DetailIcon,
  EditIcon,
  EyeIcon,
  HelpCenter,
  HistoryIcon,
  MUIRadioChecked,
  MUIRadioIcon,
  NotificationIcon,
  OpenClose,
  ParcelIcon,
  ParcelTypeIcon,
  PaymentMethod,
  PeopleIcon,
  PriceIcon,
  PrimaryDeleteIcon,
  RegionIcon,
  SaveIcon,
  SuccessIcon,
  TermsAndPolicy,
  UserGuide,
  UserIcon,
  WeightIcon,
  WhiteEditIcon,
} from "./Icon";

interface IconProps {
  name: string;
  color?: string;
  fillColor?: string;
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = (props) => {
  switch (props.name) {
    case "dashboard":
      return <DashboardIcon {...props} />;
    case "admin":
      return <AdminIcon {...props} />;
    case "history":
      return <HistoryIcon {...props} />;
    case "view":
      return <EyeIcon {...props} />;
    case "barcode":
      return <BarCode {...props} />;
    case "charges":
      return <ChargesIcon {...props} />;
    case "user":
      return <UserIcon {...props} />;
    case "weight":
      return <WeightIcon {...props} />;
    case "city":
      return <CityBranch {...props} />;
    case "block":
      return <BlockIcon {...props} />;
    case "region":
      return <RegionIcon {...props} />;
    case "people":
      return <PeopleIcon {...props} />;
    case "delivery":
      return <DeliveryIcon {...props} />;
    case "parcel":
      return <ParcelIcon {...props} />;
    case "noti":
      return <NotificationIcon {...props} />;
    case "app":
      return <AppVersion {...props} />;
    case "ads":
      return <AdIcon {...props} />;
    case "price":
      return <PriceIcon {...props} />;
    case "parcel1":
      return <ParcelTypeIcon {...props} />;
    case "admin-role":
      return <AdminRole {...props} />;
    case "admin-permission":
      return <AdminPermission {...props} />;
    case "currency":
      return <CurrencyIcon {...props} />;
    case "clock":
      return <OpenClose {...props} />;
    case "payment-method":
      return <PaymentMethod {...props} />;
    case "destination":
      return <DestinationIcon {...props} />;
    case "user-guide":
      return <UserGuide {...props} />;
    case "agent":
      return <HelpCenter {...props} />;
    case "terms":
      return <TermsAndPolicy {...props} />;
    case "success":
      return <SuccessIcon {...props} />;
    case "cancel":
      return <CancelIcon {...props} />;
    case "copylink":
      return <CopyLinkIcon {...props} />;
    case "radio":
      return <MUIRadioIcon {...props} />;
    case "radio-check":
      return <MUIRadioChecked {...props} />;
    case "menu":
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33301 8H26.6663M5.33301 16H26.6663M5.33301 24H14.6663"
            stroke="#444240"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case "id":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11.25" stroke="black" stroke-width="1.5" />
          <path
            d="M8.28406 6.92V17H6.33206V6.92H8.28406ZM14.0377 6.92C14.795 6.92 15.4884 7.02133 16.1177 7.224C16.747 7.42667 17.2857 7.73067 17.7337 8.136C18.1924 8.54133 18.5444 9.048 18.7897 9.656C19.0457 10.2533 19.1737 10.952 19.1737 11.752C19.1737 12.68 19.0244 13.48 18.7257 14.152C18.427 14.8133 18.0217 15.3573 17.5097 15.784C16.9977 16.2 16.4004 16.5093 15.7177 16.712C15.0457 16.904 14.3257 17 13.5577 17H10.5977V6.92H14.0377ZM12.5497 15.464H13.4137C13.883 15.464 14.3364 15.4107 14.7737 15.304C15.2217 15.1867 15.6164 14.9893 15.9577 14.712C16.299 14.4347 16.571 14.056 16.7737 13.576C16.987 13.096 17.0937 12.488 17.0937 11.752C17.0937 10.6853 16.7897 9.86933 16.1817 9.304C15.5844 8.73867 14.7737 8.456 13.7497 8.456H12.5497V15.464Z"
            fill="black"
          />
        </svg>
      );
    case "location1":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 11.25C13.5508 11.25 14.8125 9.98831 14.8125 8.4375C14.8125 6.88669 13.5508 5.625 12 5.625C10.4492 5.625 9.1875 6.88669 9.1875 8.4375C9.1875 9.98831 10.4492 11.25 12 11.25ZM12 7.5C12.5169 7.5 12.9375 7.92056 12.9375 8.4375C12.9375 8.95444 12.5169 9.375 12 9.375C11.4831 9.375 11.0625 8.95444 11.0625 8.4375C11.0625 7.92056 11.4831 7.5 12 7.5Z"
            fill="black"
          />
          <path
            d="M20.4375 8.4375C20.4375 3.78506 16.6524 0 12 0C7.34756 0 3.5625 3.78506 3.5625 8.4375C3.5625 10.278 4.14478 12.0272 5.24644 13.496L9.74916 19.4991C10.278 20.2041 11.1195 20.625 12 20.625C12.8805 20.625 13.722 20.2041 14.2509 19.499L18.7536 13.496C19.8552 12.0272 20.4375 10.278 20.4375 8.4375ZM17.2536 12.3709L12.751 18.3739C12.5716 18.6129 12.2979 18.75 12 18.75C11.7021 18.75 11.4284 18.6129 11.2491 18.374L6.74639 12.3709C5.89013 11.2293 5.4375 9.86911 5.4375 8.4375C5.4375 4.81894 8.38144 1.875 12 1.875C15.6186 1.875 18.5625 4.81894 18.5625 8.4375C18.5625 9.86911 18.1099 11.2293 17.2536 12.3709Z"
            fill="black"
          />
          <path
            d="M16.6875 23.0625C16.6875 22.5447 16.2678 22.125 15.75 22.125H8.25C7.73222 22.125 7.3125 22.5447 7.3125 23.0625C7.3125 23.5803 7.73222 24 8.25 24H15.75C16.2678 24 16.6875 23.5803 16.6875 23.0625Z"
            fill="black"
          />
        </svg>
      );
    case "rider":
      return <DirectionsBikeIcon />;
    case "newUser":
      return <PersonAddAltIcon />;
    case "setting":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4111 11.5896L18.5527 10.9047C17.9646 10.4355 17.9657 9.56352 18.5527 9.09527L19.4111 8.41035C20.0219 7.92289 20.1782 7.08703 19.7826 6.42277L18.0876 3.57723C17.6919 2.91301 16.8667 2.62629 16.1259 2.89527L15.0847 3.27336C14.3715 3.53227 13.5929 3.09559 13.4679 2.36863L13.2851 1.30559C13.1551 0.549102 12.4863 0 11.695 0H8.30503C7.5137 0 6.84493 0.549102 6.71487 1.30562L6.53206 2.36863C6.40685 3.09687 5.62716 3.53184 4.91531 3.2734L3.87411 2.89527C3.13324 2.62629 2.30817 2.91305 1.91245 3.57723L0.217469 6.42273C-0.178176 7.08691 -0.0219654 7.92281 0.588972 8.41031L1.44736 9.09523C2.03545 9.56445 2.03428 10.4364 1.44736 10.9047L0.588932 11.5896C-0.0219653 12.0771 -0.178216 12.913 0.217428 13.5772L1.91245 16.4227C2.30813 17.0869 3.13304 17.3737 3.87411 17.1047L4.91527 16.7266C5.62857 16.4676 6.40705 16.9046 6.53202 17.6313L6.71483 18.6943C6.84493 19.4509 7.5137 20 8.30499 20H11.695C12.4863 20 13.155 19.4509 13.2851 18.6944L13.4679 17.6314C13.5931 16.9034 14.3727 16.4681 15.0847 16.7267L16.1259 17.1047C16.8669 17.3738 17.6919 17.087 18.0876 16.4228L19.7826 13.5772C20.1782 12.913 20.0219 12.0771 19.4111 11.5896ZM16.6915 15.6415L15.6503 15.2634C13.9858 14.6591 12.1694 15.6787 11.8778 17.3745L11.695 18.4375H8.30503L8.12222 17.3745C7.83007 15.6754 6.01096 14.6603 4.34975 15.2634L3.30855 15.6415L1.61357 12.796L2.47196 12.1111C3.8442 11.0161 3.84134 8.9816 2.47196 7.88895L1.61357 7.20402L3.30859 4.35848L4.34975 4.73656C6.01422 5.34086 7.83063 4.32133 8.12222 2.62551L8.30499 1.5625H11.695L11.8778 2.62551C12.1699 4.3248 13.9891 5.33961 15.6502 4.73656L16.6914 4.35848L18.3868 7.20363C18.3868 7.20363 18.3867 7.20375 18.3864 7.20398L17.528 7.88891C16.1558 8.98375 16.1586 11.0183 17.528 12.111L18.3864 12.7959L16.6915 15.6415ZM10 6.14582C7.80738 6.14582 6.02353 7.8748 6.02353 10C6.02353 12.1252 7.80738 13.8542 10 13.8542C12.1926 13.8542 13.9765 12.1252 13.9765 10C13.9765 7.8748 12.1926 6.14582 10 6.14582ZM10 12.2917C8.69628 12.2917 7.63561 11.2636 7.63561 10C7.63561 8.73637 8.69628 7.70832 10 7.70832C11.3037 7.70832 12.3644 8.73637 12.3644 10C12.3644 11.2636 11.3037 12.2917 10 12.2917Z"
            fill="#444240"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3437 16.1563H17.6961C17.5836 16.1563 17.4781 16.2055 17.4078 16.2922C17.2437 16.4914 17.0679 16.6836 16.8828 16.8664C16.1255 17.6245 15.2285 18.2286 14.2414 18.6453C13.2187 19.0773 12.1195 19.2989 11.0093 19.2969C9.88669 19.2969 8.79919 19.0766 7.77732 18.6453C6.79019 18.2286 5.89319 17.6245 5.13591 16.8664C4.37727 16.111 3.77236 15.2155 3.35466 14.2297C2.92107 13.2078 2.7031 12.1227 2.7031 11C2.7031 9.87738 2.92341 8.79222 3.35466 7.77035C3.77185 6.78363 4.37185 5.89535 5.13591 5.13363C5.89997 4.37191 6.78825 3.77191 7.77732 3.35472C8.79919 2.92347 9.88669 2.70316 11.0093 2.70316C12.132 2.70316 13.2195 2.92113 14.2414 3.35472C15.2304 3.77191 16.1187 4.37191 16.8828 5.13363C17.0679 5.31879 17.2414 5.51097 17.4078 5.70785C17.4781 5.79457 17.5859 5.84379 17.6961 5.84379H19.3437C19.4914 5.84379 19.5828 5.67972 19.5008 5.5555C17.7031 2.76175 14.5578 0.912535 10.9836 0.92191C5.36794 0.935973 0.865597 5.49457 0.921847 11.1032C0.978097 16.6227 5.47341 21.0782 11.0093 21.0782C14.5742 21.0782 17.7054 19.2313 19.5008 16.4446C19.5804 16.3203 19.4914 16.1563 19.3437 16.1563ZM21.4273 10.8524L18.1015 8.22738C17.9773 8.12894 17.7968 8.218 17.7968 8.37504V10.1563H10.4375C10.3343 10.1563 10.25 10.2407 10.25 10.3438V11.6563C10.25 11.7594 10.3343 11.8438 10.4375 11.8438H17.7968V13.625C17.7968 13.7821 17.9797 13.8711 18.1015 13.7727L21.4273 11.1477C21.4497 11.1302 21.4678 11.1077 21.4803 11.0822C21.4928 11.0566 21.4993 11.0285 21.4993 11C21.4993 10.9716 21.4928 10.9435 21.4803 10.9179C21.4678 10.8923 21.4497 10.8699 21.4273 10.8524Z"
            fill="#444240"
          />
        </svg>
      );
    case "dollar":
      return <AttachMoneyIcon />;
    case "parcel2":
      return <DvrIcon />;
    case "counter":
      return (
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9575 1H2.04209C1.56307 1 1.17474 1.38832 1.17474 1.86734V11.0318C1.17474 11.5108 1.56307 11.8991 2.04209 11.8991H17.9575C18.4365 11.8991 18.8249 11.5108 18.8249 11.0318V1.86734C18.8249 1.38832 18.4365 1 17.9575 1Z"
            stroke="#444240"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.17474 9.25146H18.8253"
            stroke="#444240"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.6477 15.4289H7.35223L8.23509 11.8992H11.7649L12.6477 15.4289Z"
            stroke="#444240"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.8253 20.9998H1.17474L2.94004 18.0215H17.06L18.8253 20.9998Z"
            stroke="#444240"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case "add":
      return <AddIcon {...props}/>;
    case "roles":
      return <ManageAccountsIcon />;
    case "payment":
      return <PaymentIcon />;
    case "version":
      return <DeveloperModeIcon />;
    case "report":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3165 5.15877L10.3675 1.13107L10.3642 1.12942C10.0102 0.953206 9.58967 0.957143 9.23903 1.13997L5.82971 2.94939C5.802 2.96113 5.77539 2.97537 5.7499 2.99175L1.66436 5.16007C1.25455 5.37465 1 5.79508 1 6.2578V13.7425C1 14.2052 1.25455 14.6256 1.66436 14.8402L9.23565 18.8585L9.23906 18.8603C9.41788 18.9536 9.61495 19.0003 9.81205 19.0003C10.0014 19.0003 10.1908 18.9572 10.3642 18.8708L18.3165 14.8415C18.739 14.6302 19.0013 14.2058 19.0013 13.7333V6.26698C19.0013 5.79448 18.739 5.37001 18.3165 5.15877ZM9.72774 2.07425C9.77938 2.04774 9.84105 2.04721 9.89316 2.07277L17.3338 5.84286L14.438 7.28455L7.16363 3.43511L9.72774 2.07425ZM9.27724 17.6869L2.15708 13.908L2.15367 13.9062C2.09246 13.8742 2.05438 13.8115 2.05438 13.7425V6.73357L9.27724 10.4999V17.6869ZM9.81001 9.58861L2.62687 5.84296L6.03813 4.03253L13.2765 7.86284L9.81001 9.58861ZM17.9469 13.7332C17.9469 13.8038 17.9077 13.8672 17.8446 13.8986L10.3317 17.7053V10.5067L13.7908 8.78457V10.5901C13.7908 10.8813 14.0269 11.1174 14.318 11.1174C14.6092 11.1174 14.8452 10.8813 14.8452 10.5901V8.25961L17.9469 6.71543V13.7332Z"
            fill="#444240"
            stroke="#444240"
            stroke-width="0.4"
          />
        </svg>
      );
    case "bicycle":
      return <PedalBikeIcon />;
    case "on":
      return <ToggleOnIcon />;
    case "off":
      return <ToggleOffIcon />;
    case "edit":
      return <EditIcon />;
    case "edit1":
      return <WhiteEditIcon />;
    case "delete":
      return <DeleteIcon />;
    case "delete2":
      return <PrimaryDeleteIcon />;
    case "copy":
      return <CopyIcon {...props} />;
    case "calendar":
      return <CalendarIcon {...props} />;
    case "save":
      return <SaveIcon />;
    case "details":
      return <DetailIcon {...props} />;
    case "leftArrow":
      return <ArrowLeft />;
    case "rightArrow":
      return <ArrowRight />;
    case "banner":
      return <PanoramaRoundedIcon />;

    case "2marks":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.12 4.17757C11.3901 4.42777 11.4063 4.84958 11.1561 5.11969L5.1519 11.6019C4.66025 12.1327 3.84041 12.1327 3.34876 11.6019L0.844566 8.89833C0.59437 8.6282 0.610518 8.2064 0.880639 7.9562C1.15075 7.706 1.57256 7.7222 1.82275 7.99227L4.25033 10.6131L10.1779 4.21365C10.4281 3.94353 10.8499 3.92738 11.12 4.17757ZM14.4537 4.17757C14.7237 4.42777 14.7399 4.84957 14.4897 5.11969L8.48553 11.6019C8.23533 11.872 7.81353 11.8882 7.54339 11.638C7.27326 11.3878 7.25713 10.966 7.50733 10.6959L13.5115 4.21365C13.7617 3.94353 14.1835 3.92738 14.4537 4.17757Z"
            fill="white"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
