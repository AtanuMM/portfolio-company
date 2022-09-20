'use strict'
import Users from "../models/sample.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    try {
        console.log("OKKKKK")
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        let userCreate = await Users.create({
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


export const userLogin = async (req, res) => {
    try {
        let user = await Users.findAll({
            where: {
                email: req.body.email
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
        await Users.update({ refresh_token: refreshToken }, {
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
