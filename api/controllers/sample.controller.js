import Users from "../models/sample.model.js";
import { userRegister,userLogin } from "../services/sample.service.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
// export const Register = async(req, res) => {
//     const { name, email, password, confPassword } = req.body;
//     if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);
//     try {
//         await Users.create({
//             name: name,
//             email: email,
//             password: hashPassword
//         });
//         res.json({msg: "Registration Successful"});
//     } catch (error) {
//         console.log(error);
//     }
// }

export const Register = async(req, res) => {
    try {
        let userLoginController= await userRegister(req,res)
        //console.log(userLoginController,`line 38`)
        if(userLoginController){
            res.status(200).json({msg: "Login Successful", code:200, status:true, data:userLoginController});
        }else{
            res.status(400).json({msg: "Login UnSuccessful", code:400, status:false, data:userLoginController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}
 
// export const Login = async(req, res) => {
//     try {
//         const user = await Users.findAll({
//             where:{
//                 email: req.body.email
//             }
//         });
//         const match = await bcrypt.compare(req.body.password, user[0].password);
//         if(!match) return res.status(400).json({msg: "Wrong Password"});
//         const userId = user[0].id;
//         const name = user[0].name;
//         const email = user[0].email;
//         const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
//             expiresIn: '15s'
//         });
//         const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
//             expiresIn: '1d'
//         });
//         await Users.update({refresh_token: refreshToken},{
//             where:{
//                 id: userId
//             }
//         });
//         res.cookie('refreshToken', refreshToken,{
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000
//         });
//         res.json({ accessToken });
//     } catch (error) {
//         res.status(404).json({msg:"Email not found"});
//     }
// }

export const Login = async(req, res) => {
        try {
             let userLoginController= await userLogin(req,res)
        // console.log(userLoginController,`line 38`)
        if(userLoginController){
            res.status(200).json({msg: "Login Successful", code:200, status:true, data:userLoginController});
        }else{
            res.status(400).json({msg: "Email not found", code:400, status:false, data:userLoginController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}


export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}