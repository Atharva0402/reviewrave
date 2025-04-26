

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StoreList from './components/stores/StoreList';
import UserDashboard from './Pages/UserDashboard';
import CreateStore  from './Pages/CreateStore';
import StoreDetail from './components/stores/StoreDetails';
import RatingForm from './components/ratings/RatingForm';

import AdminDashboard from './Pages/AdminDashboard';
// import NotFound from './pages/NotFound';
import Navbar from './components/shared/Navbar';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'store_owner']} />}>
            <Route path="/stores" element={<StoreList />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
            <Route path="/stores/:id/rate" element={<RatingForm />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin', 'store_owner']} />}>
            <Route path="/stores/new" element={<CreateStore/>} />
          </Route>

          

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Fallback Routes */}
          <Route path="/" element={<Login />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App