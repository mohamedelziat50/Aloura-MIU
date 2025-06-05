import express from 'express';
import { createGift, getAllGifts, getGiftById, updateGift, deleteGift } from '../controllers/gifting.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware without role restrictions
router.post('/', auth(["user", "admin"]), createGift); 
router.get('/', auth(["user", "admin"]), getAllGifts);
router.get('/:id', auth(["user", "admin"]), getGiftById);
router.put('/:id', auth(["user", "admin"]), updateGift);
router.delete('/:id', auth(["user", "admin"]), deleteGift);

export default router;