// // export const registerUser = async (req, res) => {
// //     try {
// //       // Add your user registration logic here
// //       res.status(201).json({ message: 'User registered' });
// //     } catch (err) {
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   };
  
// //   export const getUsers = async (req, res) => {
// //     try {
// //       // Fetch all users from DB
// //       res.status(200).json([]);
// //     } catch (err) {
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   };
// import pool from '../db/index.js';

// // Register user
// export const registerUser = async (req, res) => {
//   const { name, email, password, address } = req.body;

//   if (!name || !email || !password || !address) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const query = 'INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING *';
//     const values = [name, email, password, address];

//     const { rows } = await pool.query(query, values);
//     res.status(201).json({ user: rows[0] });
//   } catch (err) {
//     console.error('Error registering user:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Get all users (for Admin)
// export const getUsers = async (req, res) => {
//   try {
//     const query = 'SELECT * FROM users';
//     const { rows } = await pool.query(query);

//     res.status(200).json({ users: rows });
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



import pool from '../db/index.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Get all users
export const getUsers = async (req, res) => {
  try {
    const query = 'SELECT id, name, email, role, created_at FROM users';
    const { rows } = await pool.query(query);

    res.status(200).json({ users: rows });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//! Register user
// export const registerUser = async (req,res)=>{
//   const {name ,email ,password,address,role} = req.body;
//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ error: 'Name, email, password, and role are required' });
//   }

//   try {
//     // Check if user already exists
//     const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
//     const { rows } = await pool.query(userCheckQuery, [email]);

//     if (rows.length > 0) {
//       return res.status(400).json({ error: 'User with this email already exists' });
//     }

//     // Hash password before saving
//     const hashedPasword  = await bcrypt.hash(password,10);
//     const query = `
//       INSERT INTO users(name,email,password,address,role)
//       VALUES ($1 ,$2,$3,$4,$5) RETURNING*
//     `;
//     const values = [name ,email,hashedPasword,address || null,role];
//     const result = await pool.query(query, values);
//     const newUser = result.rows[0];
//     res.status(201).json({user:newUser});
//     console.log("User Created")
//   } 
//   catch(err){
//     console.error('Error registering user: ', err);
//     res.status(500).json({error :"Internal error"})
//   }
// }

