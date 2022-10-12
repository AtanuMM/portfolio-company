const {db : {AddPortfolio ,conn }, db}=require("../models")
const { userAdd,userEdit,userDelete,contentGet, showData } = require ("../services/AddPortfolioService.js")

const getContent = async(req,res) => {

    try {
        let userGetController = await contentGet(req,res)
        //console.log(userLoginController,`line 38`)
        if(userGetController){
            res.status(200).json({msg: " Successful", code:200, status:true, data:userGetController});
        }else{
            res.status(400).json({msg: "UnSuccessful", code:400, status:false, data:userGetController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }


}
const Addcontent = async(req, res) => {
    try {
        let userAddController = await userAdd(req,res)
        //console.log(userLoginController,`line 38`)
        if(userAddController){
            res.status(200).json({msg: "Add Successful", code:200, status:true, data:userAddController});
        }else{
            res.status(400).json({msg: "Add UnSuccessful", code:400, status:false, data:userAddController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}

const Update = async(req, res) => {
    try {
        let userEditController = await userEdit(req,res)
        //console.log(userLoginController,`line 38`)
        if(userEditController){
            res.status(200).json({msg: "Update Successful", code:200, status:true, data:userEditController});
        }else{
            res.status(400).json({msg: "Update UnSuccessful", code:400, status:false, data:userEditController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}

// const ShowData =async (req, res) => {
//     try {
//         console.log(req.params);
//         const { id } = req.params;
//         const userindividual = await AddPortfolio.Id({ id: id });
//         console.log(userindividual);
//         res.status(201).json(userindividual);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

const ShowData =  async(req, res)=>{
    try {
        let userShowDataController = await showData(req,res)
        //console.log(userLoginController,`line 38`)
        if(userShowDataController){
            res.status(200).json({msg: "DAta Successful", code:200, status:true, data:userShowDataController});
        }else{
            res.status(400).json({msg: "DAta UnSuccessful", code:400, status:false, data:userShowDataController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}


const Delete = async(req, res) => {
    try {
        let userDeleteController = await userDelete(req,res)
        console.log(userDeleteController)
        if(userDeleteController){
            res.status(200).json({msg: "Delete Successful", code:200, status:true, data:userDeleteController});
        }
        else {
            res.status(400).json({msg: "Delete UnSuccessful", code:400, status:false, data:userDeleteController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}

module.exports = { Addcontent,Update,Delete,getContent,ShowData }