import express from 'express';
import { findAll } from '../controllers/product.controller.js';

const router = express.Router();
// index
router.get('/', findAll);

export default function setupProductRoutes(app) {
    app.use('/api/products', router);
}