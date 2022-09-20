import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/sample.controller.js";
import { verifyToken } from "../middlewares/sample.middleware.js";
import { refreshToken } from "../controllers/RefressToken.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users/add', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
export default router ;