import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "../../../icons";
import { useDispatch } from "react-redux";
import { emit } from "../../../store/actions";
``

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
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(emit("DRAWER_HANDLER", !open));
    setOpen(p=>!p);
  };


  return (
    <AppBar position="fixed" open={open} sx={{backgroundColor:'white',color:'black','.MuiAppBar-root':{boxShadow:'none'}}}>
      <Toolbar className="flex w-full justify-between items-center">
        <div className="flex items-center justify-start w-1/2">
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
        </div>
   
      </Toolbar>
    </AppBar>
  );
};

export default Header;
