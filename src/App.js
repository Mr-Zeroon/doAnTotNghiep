import { Routes, Route } from 'react-router-dom';
import User from "./pages/userPage/User";
import UserAdd from "./pages/userPage/UserAdd";
import Category from "./pages/categoryPage/Category";
import CategoryAdd from "./pages/categoryPage/CategoryAdd";
import OrderComplete from "./pages/orderComplete/OrderComplete";
import UserEdit from "./pages/userPage/UserEdit";
import Order from "./pages/Order/Order";
import CategoryEdit from "./pages/categoryPage/CategoryEdit";
import Dashboard  from "./pages/dashboard/Dashboard";
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/LoginPage/Login';

function App() {
  
  return (
      <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path='/' element={<AdminLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/user/userAdd" element={<UserAdd/>} />
          <Route path="/user/:editID" element={<UserEdit/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/category/Add" element={<CategoryAdd/>} />
          <Route path="/category/:editID" element={<CategoryEdit/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/orderComplete" element={<OrderComplete/>} />
        </Route>   
      </Routes>
    </div>
    
  );
}

export default App;
