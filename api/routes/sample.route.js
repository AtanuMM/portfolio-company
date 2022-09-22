const express = require ("express");
const { getUsers, Register, Login, Logout } = require ("../controllers/sample.controller.js");
const { verifyToken } = require ("../middlewares/sample.middleware.js");
const { refreshToken } = require ("../controllers/RefressToken.js");
const { Addcontent,Update,Delete } = require ("../controllers/AddportfolioController.js");
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users/add', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/content/add', Addcontent);
router.patch('/content/edit', Update);
router.delete('/content/delete', Delete);
router.delete('/logout', Logout);
 
module.exports = router ;