import { Routes, Route } from 'react-router-dom';
import User from "./pages/userPage/User";

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
import Places from './components/Map/MyMapComponent';
import AddShipper from './pages/userPage/Add/AddShipper';
import AddStore from './pages/userPage/Add/AddStore';
import AddAdmin from './pages/userPage/Add/AddAdmin';
import EditStore from './pages/userPage/Edit/EditStore';

function App() {
  
  const currentUser = JSON.parse(localStorage.getItem("admin"))||[]
  return (
      <Box>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path='/' element={<AdminLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="/notFound" element={<NotFoundPage/>} />
          <Route path="/maps" element={<Places/>} />

          <Route path="/user" element={<User/>} />
          <Route path="/user/addShipper" element={<AddShipper/>} />
          <Route path="/user/addStore" element={<AddStore/>} />
          <Route path="/user/addAdmin" element={<AddAdmin/>} />
          <Route path="/user/admin/:editID" element={<UserEdit/>} />
          <Route path="/user/store/:editID" element={<EditStore/>} />

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
