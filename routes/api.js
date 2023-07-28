import express from "express";

import newAuthController from "../controllers/AuthController.js";
import newProductController from "../controllers/ProductController.js";

import jwtAuth from "../middleware/jwtAuth.js";

const router = express.Router();

router.post('/register', newAuthController.register);
router.post('/login', newAuthController.login);

// Token
// router.post("/refresh-token", newAuthController.refreshToken);

router.post('/product',jwtAuth(), newProductController.store);
router.get('/product', jwtAuth(), newProductController.index);
router.get('/product/:id', jwtAuth(), newProductController.getById);
router.put('/product/:id', jwtAuth(), newProductController.update);
router.delete('/product/:id', jwtAuth(), newProductController.destroy);

export default router;