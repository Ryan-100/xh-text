import React0, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ISide, items } from "../../config";
import Icon from "../../../icons";
import ChevronDown from "../../../icons/chevronDown";
import { usePageName } from "../../../machine/usePageName";
import { Divider, Tooltip } from "@mui/material";

interface StateItem extends ISide {
  popup: boolean;
}

const createStateFromItems = (items: ISide[]): Record<string, StateItem> => {
  const state: Record<string, StateItem> = {};
  items.forEach((item) => {
    state[item.name] = { ...item, popup: false };
    if (item.children) {
      item.children.forEach((child) => {
        state[child.name] = { ...child, popup: false };
      });
    }
  });
  return state;
};

const initialState = createStateFromItems(items);

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const drawerWidth = 312;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ open }) => {
  const [state, setState] = useState(initialState);
  const location = useLocation();

  const { changePage } = usePageName((store) => store);

  const handleItemClick = (name: string) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        popup: !prev[name]?.popup,
      },
    }));
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ ".MuiPaper-root": { backgroundColor: "#fff", color: "#444240" } }}
    >
      {!open && <DrawerHeader />}
      <div
        className={`${
          open ? "flex" : "hidden"
        } justify-center items-center space-x-6 my-4`}
      >
        <img
          src="/dashboardLogo.png"
          className="w-16 object-cover max-h-14"
          alt="logo"
        />
        <div className="">
          <p className="text-primary text-lg md:text-xl xl:title">
            XH Express
          </p>
          <p className="text-secondary text-2xs md:text-xs xl:text-sm font-semibold">
            Superadmin
          </p>
        </div>
      </div>
      <List>
        {items.map((item: ISide) =>
          !item.children ? (
            <>
              {item.name == "Settings" && (
                <div className={`${open?"my-5":""}`}>
                  <Divider />
                </div>
              )}
              <Link to={item.link} key={item.name}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <Tooltip title={item.name} placement="right">
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor:
                          location.pathname.includes(item.link) && "#ECEDEF",
                        borderRight:`4px solid ${location.pathname.includes(item.link) && "#ff6604"}`,
                      }}
                      onClick={() => changePage(item.name)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name={item.icon} color={location.pathname.includes(item.link) ? "#FF6604":"#444240"} fillColor={location.pathname.includes(item.link) ? "#FF6604":"#444240"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0, color: "#444240","@media (min-width: 250px)": {
                          ".MuiTypography-root": { fontSize: "14px" }, // mobiles
                        },
                        "@media (min-width: 768px)": {
                          ".MuiTypography-root": { fontSize: "16px" }, // Laptops
                        },
                        "@media (min-width: 1440px)": {
                          ".MuiTypography-root": { fontSize: "20px" }, // XL screens
                        }, }}
                        
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </Link>
            </>
          ) : (
            <>
              {item.name == "Admins" && (
                <div className="">
                  <Divider />
                  <p className={`text-gray text-base my-4 mx-6 ${open?'block':'hidden'}`}>Support</p>
                </div>
              )}
              {item.name == "Report" && (
                <div className="">
                  <Divider />
                  <p className={`text-gray text-base my-4 mx-6 ${open?'block':'hidden'}`}>Reports</p>
                </div>
              )}
              <div key={item.name}>
                <Tooltip title={item.name} placement="right">
                  <ListItemButton
                    onClick={() => {
                      handleItemClick(item.name);
                      changePage(item.name);
                    }}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor:
                        location.pathname.includes(item.link) && "#ECEDEF",
                        borderRight:`4px solid ${location.pathname.includes(item.link) && "#ff6604"}`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={item.icon}  color={location.pathname.includes(item.link) ? "#FF6604":"#444240"} fillColor={location.pathname.includes(item.link) ? "#FF6604":"#444240"} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0,"@media (min-width: 250px)": {
                        ".MuiTypography-root": { fontSize: "14px" }, // mobiles
                      },
                      "@media (min-width: 768px)": {
                        ".MuiTypography-root": { fontSize: "16px" }, // Laptops
                      },
                      "@media (min-width: 1440px)": {
                        ".MuiTypography-root": { fontSize: "20px" }, // XL screens
                      }, }}
                      
                    />
                    <div
                      className={`${open ? "block" : "hidden"} ${
                        state[item.name].popup ? "rotate-[-180deg]" : "rotate-0"
                      } transition-all duration-500`}
                    >
                      <ChevronDown
                        width={"24px"}
                        height={"24px"}
                      />
                    </div>
                  </ListItemButton>
                </Tooltip>
                {/* when side bar item has children lists */}
                {item.children.map((child, index) => {
                  let count = index + 1;
                  let delay = count / 10;
                  return (
                    <div
                      key={child.name}
                      style={{
                        transitionDelay: " " + count / 10 && delay + "s",
                      }}
                      className={`  overflow-hidden  transition-all duration-300 ease-in-out ${
                        open && "pl-[2rem]"
                      }   ${
                        state[item.name].popup
                          ? "h-[64px] opacity-100"
                          : " opacity-0 h-0 pl-0 "
                      }`}
                    >
                      <Link to={child.link} className="h-[64px]">
                        <Tooltip title={child.name} placement="right">
                          <ListItemButton
                            style={{
                              transitionDelay: " " + count / 5 && delay + "s",
                            }}
                            className={`  rounded overflow-hidden capitalize flex items-center text-sm font-[400] transition-all duration-300 ease-in-out h-[35px]  `}
                            sx={{
                              minHeight: 64,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                              color: location.pathname.includes(child.link)
                                ? "#FF6604"
                                : "#444240",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: open ? 0 : 1,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",                              
                              }}
                            >
                              <p className={`${location.pathname.includes(child.link)?'text-primary':'text-secondary'}`}>-</p>

                            </ListItemIcon>
                            <ListItemText
                              primary={child.name}
                              sx={{
                                display: open ? "block" : "none",
                                "@media (min-width: 250px)": {
                                  ".MuiTypography-root": { fontSize: "12px" }, // mobiles
                                },
                                "@media (min-width: 768px)": {
                                  ".MuiTypography-root": { fontSize: "14px" }, // Laptops
                                },
                                "@media (min-width: 1440px)": {
                                  ".MuiTypography-root": { fontSize: "16px" }, // XL screens
                                },
                              }}
                              
                            />
                          </ListItemButton>
                        </Tooltip>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
