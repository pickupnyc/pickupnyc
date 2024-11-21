import { pool } from '../config/database.js';

export const createPost = async (req, res) => {
    console.log("Post request received")
    const { creator_id, body, created_at, is_reply, parent_post_id, likes } = req.body;
    console.log([creator_id, body, created_at, is_reply, parent_post_id, likes]);
    try {
        const { rows } = await pool.query(
            'INSERT INTO posts (creator_id, body, created_at, is_reply, parent_post_id, likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [creator_id, body, created_at, is_reply, parent_post_id, likes]
        );
        res.status(201).json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { creator_id, body, created_at, is_reply, parent_post_id, likes } = req.body;
        const { id } = req.params;
        const { rows } = await pool.query(
            'UPDATE posts SET creator_id = $1, body = $2, created_at = $3, is_reply = $4, parent_post_id = $5, likes = $6 WHERE id = $7 RETURNING *',
            [creator_id, body, created_at, is_reply, parent_post_id, likes, id]
        );
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        res.json({ message: 'Post deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      
      const post = await pool.query(
        'SELECT likes FROM posts WHERE id = $1',
        [id]
      );
  
      const newLikes = post.likes + 1;
      
      const updatedPost = await pool.query(
        'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *',
        [newLikes, id]
      );
      
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
