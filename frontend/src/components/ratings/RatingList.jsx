import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RatingList({ storeId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/ratings/store/${storeId}/`,
          { // it is store not stores
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setRatings(response.data.ratings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [storeId]);

  if (loading) return <div>Loading ratings...</div>;

  return (
    <div className="space-y-4">
      {ratings.length === 0 ? (
        <p className="text-gray-500">No ratings yet.</p>
      ) : (
        ratings.map((rating) => (
          <div key={rating.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <span className="font-semibold">{rating.user_name}</span>
              <span className="mx-2">•</span>
              <span className="text-yellow-500">
                {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
              </span>
            </div>
            <p className="text-gray-700">{rating.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}