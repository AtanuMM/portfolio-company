const express = require ("express");
const { getUsers, Register, Login, Logout } = require ("../controllers/sample.controller.js");
const { verifyToken } = require ("../middlewares/sample.middleware.js");
const { refreshToken } = require ("../controllers/RefressToken.js");
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users/add', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
module.exports = router ;