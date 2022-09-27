const {db : {User , }}=require("../models")
const { userRegister,userLogin } = require ("../services/sample.service.js")
 
 const getUsers = async(req,res) => {
    try {
        console.log(req.body,"6");
        const users = await User.findAll({
            
            attributes: {
                exclude: ['password']
            },
            
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
 const Register = async(req, res) => {
    try {
        let userRegisterController = await userRegister(req,res)
        //console.log(userLoginController,`line 38`)
        if(userRegisterController){
            res.status(200).json({msg: "Register Successful", code:200, status:true, data:userRegisterController});
        }else{
            res.status(400).json({msg: "Register UnSuccessful", code:400, status:false, data:userRegisterController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}
 
 const Login = async(req, res) => {
        try {
             let userLoginController= await userLogin(req,res)
        // console.log(userLoginController,`line 38`)
        if(userLoginController){
            res.status(200).json({msg: "Login Successful", code:200, status:true, data:userLoginController});
        }else{
            res.status(400).json({msg: "Invalid email or password", code:400, status:false, data:userLoginController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}


 const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

module.exports = { getUsers,Register,Login,Logout }