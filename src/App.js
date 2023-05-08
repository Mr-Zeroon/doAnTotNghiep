import { Routes, Route } from 'react-router-dom';
import User from "./pages/userPage/User";
import UserAdd from "./pages/userPage/UserAdd";
import Category from "./pages/categoryPage/Category";
import CategoryAdd from "./pages/categoryPage/CategoryAdd";
import UserEdit from "./pages/userPage/UserEdit";
import Order from "./pages/Order/Order";
import CategoryEdit from "./pages/categoryPage/CategoryEdit";
import Dashboard  from "./pages/dashboard/Dashboard";
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/LoginPage/Login';
import { Box } from '@mui/material';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import VoucherPage from './pages/VoucherPage/VoucherPage';
import VoucherAdd from './pages/VoucherPage/VoucherAdd';
import VoucherEdit from './pages/VoucherPage/VoucherEdit';
import MyComponent from './components/Map/MyMapComponent';

function App() {
  
  const currentUser = JSON.parse(localStorage.getItem("admin"))||[]
  return (
      <Box>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path='/' element={currentUser.length === 0 ?<NotFoundPage/> :<AdminLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="/notFound" element={<NotFoundPage/>} />
          <Route path="/maps" element={<MyComponent/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/user/userAdd" element={<UserAdd/>} />
          <Route path="/user/:editID" element={<UserEdit/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/category/Add" element={<CategoryAdd/>} />
          <Route path="/category/:editID" element={<CategoryEdit/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/voucher" element={<VoucherPage/>} />
          <Route path="/voucher/voucherAdd" element={<VoucherAdd/>} />
          <Route path="/voucher/:editID" element={<VoucherEdit/>} />
        </Route>   
      </Routes>
    </Box>
    
  );
}

export default App;
