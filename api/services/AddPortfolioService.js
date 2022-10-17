'use strict'

const { where } = require("sequelize");
const {db : {AddPortfolio ,}}=require("../models")

const userAdd = async (req, res) => {
    try {
        console.log("OKKKKK")
        const { category,industry, projectName, Tstack1, Llink, Dlink,Wdate,Credential,Tstack2, Isapp, psl, psldate, asl, asldate, desc } = req.body;
        const userCreate = await AddPortfolio.create({
            category: category,
            industry: industry,
            projectName: projectName,
            Tstack1: Tstack1,
            Llink: Llink,
            Dlink: Dlink,
            Wdate: Wdate,
            Credential: Credential,
            Tstack2: Tstack2,
            Isapp: Isapp,
            psl: psl,
            psldate: psldate,
            asl: asl,
            asldate: asldate,
            desc: desc,
            // isActive:true
        });
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

// const userDelete =  async(req, res)=>{
//     try {
//         let projectId=req.params.id
//         let date= new Date()
//        let findProject= await AddPortfolio.findOne({where:{id:projectId}})
//     //    console.log(findProject,'54');
//         if(findProject==null){
//             return false
//         } 
//         else {
//             console.log("ln59");
//             let projectSoftDel= await AddPortfolio.update(
//                 {
//                     isDeleted:true,
//                     deletedAt:date  
//                 }, 
//                 {
//                 where: {
//                     id:projectId
//                 }
//               }
//               );
//              console.log(projectSoftDel,'70')
//               return projectSoftDel
              
//         }
//     } 
//        catch (err) {
//         console.log(err);;
//     }
// }




const contentGet =  async(req, res)=>{
    try {
        let findAll=await AddPortfolio.findAll({
            where:{
                isDeleted:false,
                deletedAt:null 
            }
           })
           console.log(findAll,`line 76`)
           return findAll;
    } catch (error) {
        console.log(error);
    }
}

const showData =  async(req, body)=>{
    try {
        let findOne=await AddPortfolio.findOne({
            where:{
                id:req.params.id
            }
           })
           console.log(findOne,`line 76`)
           return findOne;
    } catch (error) {
        console.log(err);
    }
}




    // const userDelete =async(req, res)=>{
    //     try {
    //         let projectId=req.params.id       
    //    let deleteuser= await AddPortfolio.findOne({where:{id:projectId}})
    //    if (deleteuser == true) {
    //     return false
    //    } else {
    //    }
    //     } catch (error) {
    //         throw error
    //     }
    // }

module.exports = { userAdd,userEdit,contentGet,showData }