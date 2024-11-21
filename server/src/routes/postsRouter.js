import express from 'express';
import { createPost, deletePost, updatePost, getPost, getPosts, likePost } from '../controllers/postsController.js';

const router = express.Router();


router.post('/create', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/posts/:id/like', likePost);

export default router;