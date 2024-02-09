import React from "react";
import { useRef, useState } from "react";
import ChevronDown from "../../../icons/chevronDown";
import { useSize } from "ahooks";
import { usePageName } from "../../../machine/usePageName";
import { Link } from "react-router-dom";
import { useSubscription, gql } from "@apollo/client";
import { useOwnData } from "../../../machine/useOwner";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "../../../icons";

const TOTAL_COUNT_SUBSCRIPTION = gql`
  subscription GetTotalCount($user_id: String!) {
    getTotalCount(user_id: $user_id) {
      totalcount
    }
  }
`;

const drawerWidth = 312;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  boxShadow:'none',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = ({ open, setOpen }) => {
  const ref = useRef(null);
  const size = useSize(ref);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { page } = usePageName((store) => store);
  const { userData } = useOwnData((store) => store);

  const { data } = useSubscription(TOTAL_COUNT_SUBSCRIPTION, {
    variables: { user_id: userData.id },
  });

  const handleDrawerOpen = () => {
    setOpen(p=>!p);
  };

  return (
    <AppBar position="fixed" open={open} sx={{backgroundColor:'white',color:'black','.MuiAppBar-root':{boxShadow:'none'}}}>
      <Toolbar className="flex w-full justify-between items-center">
        <div className="flex items-center justify-center w-1/2">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "block" }),
            }}
            >
            <Icon name="menu" />
          </IconButton>
          <p className="capitalize font-semibold text-lg w-full">{page}</p>
        </div>
      <div className="flex w-full items-center justify-end">
        <div className="flex gap-2 items-center">
          <div
            // onMouseEnter={() => setIsOpen(true)}
            // onMouseLeave={() => setIsOpen(false)}
            // ref={ref}
            className="relative flex items-center gap-2 px-2 py-1 rounded "
          >
            <p>{userData.username}</p>
            {/* <div className="mt-1">
              <ChevronDown />
            </div>
            <div
              style={{ width: size?.width }}
              className={`absolute overflow-hidden transition-all duration-500 ease-in-out rounded bg-white shadow bottom-[-74px] left-0 ${
                isOpen
                  ? "opacity-100 translate-y-0 z-10 "
                  : "opacity-0 translate-y-6 z-[-10]"
              }`}
            >
              <Link to={"/dashboard/user-profile"}>
                <p className="px-2 py-2 border-b text-sm border-b-[#aeaeae] hover:bg-[#eaeaea] ">
                  Profile
                </p>
              </Link>
              <Link to={"/login"}>
                <p className="px-2 py-2 border-b text-sm border-b-[#aeaeae] hover:bg-[#eaeaea] ">
                  Logout
                </p>
              </Link>
            </div> */}
          </div>
          {/* <Link to={"/dashboard/chat"}>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              {data && data.getTotalCount.totalcount !== 0 && (
                <p className="absolute -top-1 -right-1 w-3 h-3 bg-red rounded-full text-[8px] text-white flex items-center justify-center">
                  {data.gtweotalCount.totalcount < 10
                    ? data.getTotalCount.totalcount
                    : "9+"}
                </p>
              )}
            </div>
          </Link> */}
        </div>
      </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
