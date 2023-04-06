import { ColorModeContext,useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./pages/globar/Topbar";
import Dashboard  from "./pages/dashboard/Dashboard";
import Sidebars from "./pages/globar/Sidebar"
import { Route, Routes } from "react-router-dom";
import User from "./pages/userPage/User";
import UserAdd from "./pages/userPage/UserAdd";
import Category from "./pages/categoryPage/Category";
import Food from "./pages/foodPage/Food";
import Oder from "./pages/oderPage/Oder";
import OrderComplete from "./pages/orderComplete/OrderComplete";


function App() {
  const [theme,colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App" >
          <Sidebars/>
          <main className="content">
            <Topbar/>
            <Routes>
                <Route index path="/" element={<Dashboard/>} />
                <Route path="/user" element={<User/>} />
                <Route path="/user/userAdd" element={<UserAdd/>} />
                <Route path="/category" element={<Category/>} />
                <Route path="/food" element={<Food/>} />
                <Route path="/oder" element={<Oder/>} />
                <Route path="/orderComplete" element={<OrderComplete/>} />   
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
