'use strict'
const bcrypt = require( "bcryptjs");
const jwt = require ("jsonwebtoken");
const {db : {User  }}=require("../models")


 const userRegister = async (req, res) => {
    try {
        console.log("OKKKKK")
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        let userCreate = await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        return userCreate;
    } catch (error) {
        console.log(error);
        return false;
    }
}


 const userLogin = async (req, res) => {
    try {
        let user = await User.findAll({
            where: {
                email: req.body.email,

            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        let objToSend={accessToken,match}
        return objToSend;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// const userLogout=async(req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.sendStatus(204);
//     const user = await User.findAll({
//         where:{
//             refresh_token: refreshToken
//         }
//     });
//     if(!user[0]) return res.sendStatus(204);
//     const userId = user[0].id;
//     await User.update({refresh_token: null},{
//         where:{
//             id: userId
//         }
//     });
//     res.clearCookie('refreshToken');
//     return res.sendStatus(200);
// }




module.exports = { userRegister,userLogin }
