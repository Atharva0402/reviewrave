
import { useEffect, useState } from 'react';
import StoreCard from './StoreCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');




  useEffect(() => {
    const fetchStores = async () => {
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/stores/getStores', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    console.log("store api response", response.data)

        setStores(response.data.stores); // access 'stores' from backend
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <div className="text-center p-8">Loading stores...</div>;

  const handleStoreClick = (storeId) => {
    navigate(`/stores/${storeId}`);
  };

  if (loading) return <div className="text-center mt-10">Loading stores...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    // <div className="p-6 max-w-4xl mx-auto">
    //   <h1 className="text-3xl font-bold mb-6 text-center">All Stores</h1>
    //   {stores.length === 0 ? (
    //     <p className="text-center text-gray-500">No stores available.</p>
    //   ) : (
    //     <div className="grid gap-4">
    //       {stores.map((store) => (
    //         <div
    //           key={store.id}
    //           className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
    //           onClick={() => handleStoreClick(store.id)}
    //         >
    //           <h2 className="text-xl font-semibold">{store.name}</h2>
    //           <p className="text-gray-600">{store.description}</p>
    //           <p className="mt-2 font-medium">Average Rating: {store.average_rating?.toFixed(1) || 'N/A'}</p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>

// <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Stores</h1>
//       {stores.length === 0 ? (
//         <p className="text-center text-gray-500">No stores available.</p>
//       ) : (
//         <div className="grid gap-4">
//           {stores.map((store) => (
//             <div
//               key={store.id}
//               className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer transition duration-200 hover:shadow-md"
//               onClick={() => handleStoreClick(store.id)}
//             >
//               <h2 className="text-xl font-semibold">{store.name}</h2>
//               <p className="text-gray-600">{store.description}</p>
//               <div className="mt-2 flex justify-between items-center">
//                 <span className="font-medium">
//                   Rating: {store.average_rating?.toFixed(1) || 'N/A'}
//                 </span>
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/stores/${store.id}/rate`);
//                   }}
//                   className="text-blue-500 hover:text-blue-700"
//                 >
//                   Rate this store
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>

<div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Stores</h1>
      
      {stores.length === 0 ? (
        <div className="text-center text-gray-500">
          No stores found. Check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map(store => (
            <StoreCard 
              key={store.id} 
              store={store}
              currentUserId={localStorage.getItem('userId')} 
            />
          ))}
        </div>
      )}
      
    </div>
    
  );
}
