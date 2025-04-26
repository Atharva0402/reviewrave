// import { Link } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom'

// export default function StoreCard({ store, currentUserId }) {
//   // Safely handle missing or undefined properties
//   const safeStore = {
//     id: store?.id || 0,
//     name: store?.name || 'Unknown Store',
//     description: store?.description || 'No description available',
//     address: store?.address || 'Address not provided',
//     average_rating: store?.average_rating || 0
//   };

//   // Calculate star rating display
//   const renderStars = () => {
//     const rating = safeStore.average_rating;
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     return (
//       <div className="flex items-center">
//         {[...Array(5)].map((_, i) => (
//           <span key={i} className="text-yellow-400">
//             {i < fullStars ? '★' : hasHalfStar && i === fullStars ? '½' : '☆'}
//           </span>
//         ))}
//         <span className="ml-2 text-gray-600 text-sm">
//           ({rating.toFixed(1)})
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="p-5">
//         <h2 className="text-xl font-semibold mb-2 line-clamp-1">{safeStore.name}</h2>
//         <p className="text-gray-600 mb-3 line-clamp-2">{safeStore.description}</p>
        
//         <div className="mb-3">
//           {renderStars()}
//         </div>
        
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">
//             {safeStore.address.substring(0, 20)}
//             {safeStore.address.length > 20 && '...'}
//           </span>
//           <Link
//             to={`/stores/${safeStore.id}`}
//             className="text-blue-500 hover:text-blue-700 text-sm font-medium hover:underline"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from 'react-router-dom';

export default function StoreCard({ store, currentUserId }) {
  const navigate = useNavigate();

  const safeStore = {
    id: store?.id || 0,
    name: store?.name || 'Unknown Store',
    description: store?.description || 'No description available',
    address: store?.address || 'Address not provided',
    average_rating: Number(store?.average_rating) || 0
  };

  const renderStars = () => {
    const rating = safeStore.average_rating;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    console.log('Rating:', safeStore.average_rating);
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? '★' : hasHalfStar && i === fullStars ? '☆' : '☆'}
          </span>
        ))}
        <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div
      onClick={() => navigate(`/stores/${safeStore.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1">{safeStore.name}</h2>
        <p className="text-gray-600 mb-3 line-clamp-2">{safeStore.description}</p>

        <div className="mb-3">
          {renderStars()}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {safeStore.address.substring(0, 20)}
            {safeStore.address.length > 20 && '...'}
          </span>
        </div>
      </div>
    </div>
  );
}
