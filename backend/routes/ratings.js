
// export default router;
import express from 'express';
import { updateRating, deleteRating,createRating, getRatingsByStore, addRating } from '../controllers/ratingController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ratings', createRating);

router.get('/store/:storeId', getRatingsByStore);
router.post('/', authenticateToken, addRating);
router.put('/:id', authenticateToken, updateRating);
router.delete('/:id', authenticateToken, deleteRating);  // Simplified delete endpoint

export default router;