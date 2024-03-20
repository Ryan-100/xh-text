import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../sidebar/Sidebar";
import Header from "../hearder/Header";
import Outleting from "../outlet";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function RootLayout() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex",height:'100vh'}}>
      <CssBaseline />

      <Header open={open} setOpen={setOpen} />

      <Sidebar open={open}  />

      <Box component="main" id="main-body" className="bg-bright-ascent h-screen flex-grow p-6 overflow-auto">
        <DrawerHeader />
        <Outleting />
      </Box>
    </Box>
  );
}
