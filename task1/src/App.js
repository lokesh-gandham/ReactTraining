import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './components/admin/Home';
import Dashboard from './components/admin/Dashboard';
import RequireAuth from './components/RequireAuth';
import ProductUpdate from './components/admin/ProductUpdate';
import AddProduct from './components/admin/AddProduct';

import UnAuthorized from './components/UnAuthorized';
import UserDashboard from './components/user/UserDashboard';
import CartItems from './components/user/Cartitems';
import Orders from './components/user/Orders';
import UpdateUser from './components/admin/UpdateUSer';
import Practice from './components/Practice';


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