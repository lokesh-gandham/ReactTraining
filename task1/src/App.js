import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components//login/Login';
import Register from './components/registration/Register';
import Navbar from './components//navbar/Navbar';
import Home from './components/admin/Home';
import Dashboard from './components/admin/Dashboard';
import RequireAuth from './components/login/RequireAuth';
import ProductUpdate from './components/admin/ProductUpdate';
import AddProduct from './components/admin/AddProduct';

import UnAuthorized from './components/unauthorized/UnAuthorized';
import UserDashboard from './components/user/UserDashboard';
import CartItems from './components/cart/Cartitems';
import Orders from './components/orders/Orders';
import UpdateUser from './components/admin/UpdateUSer';


function App() {
  return (
  <div className="App">
       <Navbar />
      <Routes>
        {/* Admin Routes */}
        <Route path='/home' element={<RequireAuth allowedRoles={['admin']}><Home /></RequireAuth>} />
        <Route path='/update/:id' element={<RequireAuth allowedRoles={['admin']}><UpdateUser/></RequireAuth>} />
        <Route path='/product/update/:id' element={<RequireAuth allowedRoles={['admin']}><ProductUpdate /></RequireAuth>} />
        <Route path='/addproduct' element={<RequireAuth allowedRoles={['admin']}><AddProduct /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth allowedRoles={['admin']}><Dashboard /></RequireAuth>} />

        {/* User Routes */}
        <Route path='/userDashboard' element={<RequireAuth allowedRoles={['user']}><UserDashboard /></RequireAuth>} />
        <Route path='/cartitems' element={<RequireAuth allowedRoles={['user']}><CartItems /></RequireAuth>} />

        {/*orders route*/}
        <Route path='/orders' element={<RequireAuth allowedRoles={['user', 'admin']}><Orders /></RequireAuth>} />

        {/* Authentication Routes */}
        <Route path='/Register' element={<Register />} />
        <Route path='/' element={<Login />} />

        {/* Unauthorized Route */}
        <Route path='/unauthorized' element={<UnAuthorized />} />
      </Routes>
    </div>
  );
}

export default App;