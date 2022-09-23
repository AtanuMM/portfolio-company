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
    const updateuser = await AddPortfolio.update(req.body,{
        where:{
            id:req.params.id
        }
    })
    return updateuser;
  } catch (err) {
    console.log(err)
  }
}



const userDelete =  async(req, res)=>{
    try {
        return !!await AddPortfolio.destroy({
            where: {
                id:req.params.id
            }
        });
    } catch (err) {
        console.log(err);;
    }

}




module.exports = { userAdd,userEdit,userDelete  }