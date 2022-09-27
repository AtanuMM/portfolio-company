const {db : {User , }}=require("../models")
const jwt = require ("jsonwebtoken");
// const { StringDecoder } = require('node:string_decoder');
// const decoded = new StringDecoder('utf8');
const refreshToken = async(req, res) => {
    try {
        const validToken = req.body.refreshToken;
        if(!validToken) 
        {
            return res.sendStatus(401);
        }else{
        const user = await User.findAll({
            where:{
                refresh_token: validToken
            }
        });
    
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(validToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { refreshToken }