const express = require ("express");
const { getUsers, Register, Login, Logout, SearchUser } = require ("../controllers/sample.controller.js");
const { verifyToken } = require ("../middlewares/sample.middleware.js");
const { refreshToken } = require ("../controllers/RefressToken.js");
const { Addcontent,Update,Delete,getContent,ShowData, SearchData} = require ("../controllers/AddportfolioController.js");
 
const router = express.Router();
 
router.get('/get/users',getUsers);
router.post('/users/add', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/content/add', Addcontent);
router.patch('/content/edit/:id', Update);
router.get('/content/get', getContent);
router.delete('/content/delete/:id', Delete);
router.delete('/logout', Logout);
router.get("/showData/:id",ShowData);
router.get("/search/:key",SearchUser)
module.exports = router ;