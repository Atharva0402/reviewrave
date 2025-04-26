
import pool from '../db/index.js';

// Helper function to validate rating input
const validateRatingInput = (rating, comment) => {
  const errors = [];
  
  if (rating === undefined || rating === null) {
    errors.push('Rating is required');
  } else if (isNaN(rating) || rating < 1 || rating > 5) {
    errors.push('Rating must be a number between 1 and 5');
  }
  
  if (comment && comment.length > 500) {
    errors.push('Comment must be less than 500 characters');
  }
  
  return errors;
};

export const getRatingsByStore = async (req, res) => {
  const { storeId } = req.params;
  
  try {
    const result = await pool.query(
      `SELECT r.*, u.name AS user_name 
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1`, 
      [storeId]
    );
    
    res.status(200).json({ ratings: result.rows });
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

export const addRating = async (req, res) => {
  const { user_id, store_id, rating, comment } = req.body;
  const user = req.user; // Assuming you have user from authentication middleware

  // Validate input
  const validationErrors = validateRatingInput(rating, comment);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Check if user already rated this store
    const existingRating = await pool.query(
      'SELECT id FROM ratings WHERE user_id = $1 AND store_id = $2',
      [user_id, store_id]
    );

    if (existingRating.rows.length > 0) {
      return res.status(400).json({ error: 'You have already rated this store' });
    }

    const query = `
      INSERT INTO ratings (user_id, store_id, rating, comment) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [user_id, store_id, rating, comment || null];

    const result = await pool.query(query, values);
    res.status(201).json({ rating: result.rows[0] });
  } catch (err) {
    console.error('Error adding rating:', err);
    res.status(500).json({ error: 'Failed to add rating' });
  }
};

export const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const user = req.user;

  // Validate input
  const validationErrors = validateRatingInput(rating, comment);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const result = await pool.query('SELECT * FROM ratings WHERE id = $1', [id]);
    const existingRating = result.rows[0];

    if (!existingRating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // Authorization check
    if (existingRating.user_id !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this rating' });
    }

    const updateQuery = `
      UPDATE ratings 
      SET rating = $1, comment = $2, updated_at = NOW() 
      WHERE id = $3 
      RETURNING *`;
    const values = [
      rating || existingRating.rating, 
      comment || existingRating.comment, 
      id
    ];

    const updated = await pool.query(updateQuery, values);
    res.json({ rating: updated.rows[0] });
  } catch (err) {
    console.error('Error updating rating:', err);
    res.status(500).json({ error: 'Failed to update rating' });
  }
};

// export const deleteRating = async (req, res) => {
//   const { id } = req.params;
//   const user = req.user;

//   try {
//     const result = await pool.query('SELECT * FROM ratings WHERE id = $1', [id]);
//     const rating = result.rows[0];

//     if (!rating) {
//       return res.status(404).json({ error: 'Rating not found' });
//     }

//     // Authorization check
//     if (rating.user_id !== user.id && user.role !== 'admin') {
//       return res.status(403).json({ error: 'Not authorized to delete this rating' });
//     }

//     await pool.query('DELETE FROM ratings WHERE id = $1', [id]);
//     res.json({ message: 'Rating deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting rating:', err);
//     res.status(500).json({ error: 'Failed to delete rating' });
//   }
// };

export const deleteRating = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    // First get the rating to check ownership
    const ratingResult = await pool.query('SELECT * FROM ratings WHERE id = $1', [id]);
    const rating = ratingResult.rows[0];

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // Authorization check:
    // - The user who created the rating can delete it
    // - Admins can delete any rating
    if (rating.user_id !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this rating' });
    }

    // Perform the deletion
    await pool.query('DELETE FROM ratings WHERE id = $1', [id]);
    res.json({ message: 'Rating deleted successfully' });
  } catch (err) {
    console.error('Error deleting rating:', err);
    res.status(500).json({ error: 'Failed to delete rating' });
  }
};
export const createRating = async (req, res) => {
  const { user_id, store_id, rating, comment } = req.body;

  // Validate input
  if (!user_id || !store_id || !rating) {
    return res.status(400).json({ error: 'User, store, and rating are required' });
  }

  try {
    const query = `
      INSERT INTO ratings (user_id, store_id, rating, comment)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user_id, store_id, rating, comment || null];

    const { rows } = await pool.query(query, values);
    res.status(201).json({ rating: rows[0] });
  } catch (err) {
    console.error('Error creating rating:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all ratings for a store
export const getRatingsForStore = async (req, res) => {
  const { store_id } = req.params;

  try {
    const query = 'SELECT * FROM ratings WHERE store_id = $1';
    const { rows } = await pool.query(query, [store_id]);

    res.status(200).json({ ratings: rows });
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
