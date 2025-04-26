// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Stores() {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/stores/getStores', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//         setStores(response.data.stores); // access 'stores' from backend
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   const handleStoreClick = (id) => {
//     navigate(`/stores/${id}`);
//   };

//   if (loading) return <div className="text-center mt-10">Loading stores...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Stores</h1>
//       {stores.length === 0 ? (
//         <p className="text-center text-gray-500">No stores available.</p>
//       ) : (
//         <div className="grid gap-4">
//           {stores.map((store) => (
//             <div
//               key={store.id}
//               className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
//               onClick={() => handleStoreClick(store.id)}
//             >
//               <h2 className="text-xl font-semibold">{store.name}</h2>
//               <p className="text-gray-600">{store.description}</p>
//               <p className="mt-2 font-medium">Average Rating: {store.average_rating?.toFixed(1) || 'N/A'}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
