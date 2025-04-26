import express from 'express';
import { getUsers } from '../controllers/userController.js';
import {registerUser} from '../controllers/authcontroller.js'
const router = express.Router();

// Route for getting all users
router.get('/', getUsers);
router.post('/register',registerUser)


export default router;
