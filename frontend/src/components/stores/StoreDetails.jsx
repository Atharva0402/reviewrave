import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RatingForm from '../ratings/RatingForm';

export default function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratings, setRatings] = useState([]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const [storeRes, ratingsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/stores/${id}`),
          axios.get(`http://localhost:5000/api/ratings/store/${id}`)
        ]);
        
        setStore(storeRes.data.store);
        setRatings(ratingsRes.data.ratings);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load store');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [id]);


  const handleNewRating = (newRating) => {
    setRatings([newRating, ...ratings]);
    setShowRatingForm(false);
    if (store) {
      const newAvg = ((store.average_rating * ratings.length) + newRating.rating) / (ratings.length + 1);
      setStore({...store, average_rating: newAvg});
    }
  };
  


  
  if (loading) return <div className="text-center p-8">Loading store details...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!store) return <div className="text-center p-8">Store not found</div>;


  return (
   

    // <div className="max-w-4xl mx-auto p-6">
    //   <button 
    //     onClick={() => navigate(-1)}
    //     className="mb-4 text-blue-500 hover:underline"
    //   >
    //     ← Back to stores
    //   </button>

    //   <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    //     <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
    //     <p className="text-gray-600 mb-4">{store.description}</p>
    //     <p className="text-gray-700 mb-4">{store.address}</p>
        
    //     <div className="flex items-center mb-6">
    //       <div className="flex items-center mr-4">
    //         <span className="text-yellow-500 text-xl mr-2">
    //           {'★'.repeat(Math.round(store.average_rating))}
    //           {'☆'.repeat(5 - Math.round(store.average_rating))}
    //         </span>
    //         <span className="text-gray-700">
    //           {store.average_rating?.toFixed(1) || '0'} out of 5
    //         </span>
    //       </div>
    //       <button
    //         onClick={() => setShowRatingForm(!showRatingForm)}
    //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //       >
    //         {showRatingForm ? 'Cancel' : 'Add Rating'}
    //       </button>
    //     </div>

    //     {showRatingForm && (
    //       <RatingForm storeId={id} onSubmit={handleRatingSubmit} />
    //     )}
    //   </div>

    //   <div className="bg-white rounded-lg shadow-md p-6">
    //     <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
    //     {ratings.length === 0 ? (
    //       <p className="text-gray-500">No reviews yet. Be the first to review!</p>
    //     ) : (
    //       <div className="space-y-4">
    //         {ratings.map(rating => (
    //           <div key={rating.id} className="border-b pb-4">
    //             <div className="flex justify-between items-center mb-2">
    //               <span className="font-semibold">{rating.user_name}</span>
    //               <span className="text-yellow-500">
    //                 {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
    //               </span>
    //             </div>
    //             {rating.comment && (
    //               <p className="text-gray-700">{rating.comment}</p>
    //             )}
    //             <p className="text-sm text-gray-500 mt-2">
    //               {new Date(rating.created_at).toLocaleDateString()}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to stores
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
            <p className="text-gray-600 mb-1">{store.address}</p>
            <p className="text-gray-700 mb-4">{store.description}</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <div className="flex items-center">
              <span className="text-yellow-500 text-2xl mr-2">
                {'★'.repeat(Math.round(store.average_rating || 0))}
                {'☆'.repeat(5 - Math.round(store.average_rating || 0))}
              </span>
              <span className="text-gray-700 font-medium">
                {store.average_rating?.toFixed(1) || '0.0'}
              </span>
            </div>
            <p className="text-sm text-gray-500 text-center mt-1">
              {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowRatingForm(!showRatingForm)}
          className={`mt-4 px-4 py-2 rounded-md ${showRatingForm ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'} hover:bg-blue-700 transition`}
        >
          {showRatingForm ? 'Cancel Review' : 'Write a Review'}
        </button>

        {showRatingForm && (
          <RatingForm storeId={id} onSubmit={handleNewRating} />
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Customer Reviews</h2>
        
        {ratings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p>No reviews yet. Be the first to review this store!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {ratings.map(rating => (
              <div key={rating.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{rating.user_name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(rating.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-xl mr-2">
                      {'★'.repeat(rating.rating)}
                      {'☆'.repeat(5 - rating.rating)}
                    </span>
                    <span className="font-medium">{rating.rating}.0</span>
                  </div>
                </div>
                
                {rating.comment && (
                  <p className="text-gray-700 mt-3 whitespace-pre-line">
                    {rating.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}