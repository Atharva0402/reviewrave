import pool from '../db/index.js';

// Create a new store
export const createStore = async (req, res) => {
  const { name, description } = req.body;
  const owner_id = req.user.id;

  // Validate input
  if (!name || !owner_id) {
    return res.status(400).json({ error: 'Name and owner_id are required' });
  }

  try {
    const query = `
      INSERT INTO stores (name, description, owner_id)
      VALUES ($1, $2, $3) RETURNING *`;
      const values = [
        name.trim(),
        description ? description.trim() : null,
        owner_id
      ];
    const { rows } = await pool.query(query, values);
    res.status(201).json({ store: rows[0] });
  } catch (err) {
    console.error('Error creating store:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all stores
export const getStores = async (req, res) => {
  try {
    // const query = 'SELECT * FROM stores';
    const query = `
    SELECT s.*, 
           COALESCE(AVG(r.rating), 0) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `;
    const { rows } = await pool.query(query);

    res.status(200).json({ stores: rows });
  } catch (err) {
    console.error('Error fetching stores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get store by ID
export const getStoreById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM stores WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.status(200).json({ store: rows[0] });
  } catch (err) {
    console.error('Error fetching store:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a rating for a store

//  updating store
export const updateStore = async (req,res) =>{
  const {id} = req.params;
  const{name,description} = req.body;
  const user = req.user;
  
  try{
    const storeRes = await pool.query('SELECT * FROM stores WHERE id = $1',[id]);
    const store = storeRes.rows[0];
    
    if(!store){
      return res.status(404).json({error :"Store not found"});
    }
    if(user.role !== 'admin' && user.id !== store.owner_id){
      return res.status(403).json({error: "Not authorized to update this this store"})
    } 
    const updated = await pool.query(
      `UPDATE stores SET name = $1 ,description = $2 WHERE id = $3 RETURNING *`,
      [name || store.name,description || store.description,id ]
    )
    res.status(200).json({store:updated.rows[0]})
  }
  catch(err){
    console.error('Error updating store: ', err);
    res.status(500).json({error:'Internal server error'})
  }
}

// Delete store 
export const deleteStore = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const store = await pool.query('SELECT * FROM stores WHERE id = $1', [id]);
    
    if (!store.rows[0]) {
      return res.status(404).json({ error: 'Store not found' });
    }

    // Only admin or store owner can delete
    if (user.role !== 'admin' && user.id !== store.rows[0].owner_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await pool.query('DELETE FROM stores WHERE id = $1', [id]);
    res.json({ message: 'Store deleted successfully' });
  } catch (err) {
    console.error('Error deleting store:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};