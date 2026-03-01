import express from 'express';
import { executeQuery } from '../controllers/executeController.js';

const router = express.Router();


router.post('/', executeQuery);

export default router;
