import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Add admin-specific components here */}
      <button 
        onClick={signOut}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}