import express from 'express';
import { createStore, getStores, getStoreById } from '../controllers/storeController.js';

import { updateStore } from '../controllers/storeController.js';

import { authenticateToken,authorizeRoles } from '../middleware/authMiddleware.js';
import { deleteRating ,updateRating} from '../controllers/ratingController.js';

const router = express.Router();


router.post('/' ,authenticateToken,authorizeRoles('admin' , 'store_owner' ),createStore)


// router.post('/', createStore);

// Route for getting all stores
router.get('/getStores', getStores);

// Route for getting a single store by ID
router.get('/:id', getStoreById);

// Route for creating a new rating for a store

// Route for getting all ratings for a store
// router.get('/:store_id/ratings', getRatingsForStore);


// Update a rating by ID
router.put('/ratings/:id', authenticateToken, updateRating);
router.put('/ratings/:id', authenticateToken, authorizeRoles('admin', 'store_owner'), deleteRating);


// update store (admin and storeOwner)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'store_owner'), updateStore);

export default router;
