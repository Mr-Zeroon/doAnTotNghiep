import { ColorModeContext,useMode } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebars from "../pages/globar/Sidebar";
import Topbar from "../pages/globar/Topbar";

const AdminLayout = () => {
    const [theme,colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box className="App" >
          <Sidebars/>
          <main className="content">
            <Topbar/>
            <Outlet/>
          </main>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default AdminLayout