'use strict'

const {db : {AddPortfolio ,}}=require("../models")

const userAdd = async (req, res) => {
    try {
        console.log("OKKKKK")
        const { category, projectName, Tstack, Llink, Dlink, Ldate, Isapp, psl, asl, desc } = req.body;
        let userCreate = await AddPortfolio.create({
            category: category,
            projectName: projectName,
            Tstack: Tstack,
            Llink: Llink,
            Dlink: Dlink,
            Ldate: Ldate,
            Isapp: Isapp,
            psl: psl,
            asl: asl,
            desc: desc
        });
        //UserModel.findAll({})
        return userCreate;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const userEdit =async(req, res)=>{
    try {
        console.log("OKKKKK")
        const {id} = req.params;

        const updateuser = await AddPortfolio.findByIdAndUpdate(id,req.body,{
            new: true
        });
        return updateuser;

    }  catch (error) {
        console.log(error);
        return false;
        
    }
}

const userDelete =  async(req, res)=>{
    try {
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id});

        return deleteuser;

    } catch (error) {
        console.log(error);
        return false;
    }
}



module.exports = { userAdd,userEdit,userDelete  }