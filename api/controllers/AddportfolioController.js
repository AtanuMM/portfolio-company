const { userAdd,userEdit,userDelete } = require ("../services/AddPortfolioService.js")


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

const Delete = async(req, res) => {
    try {
        let userDeleteController = await userDelete(req,res)
        //console.log(userLoginController,`line 38`)
        if(userDeleteController){
            res.status(200).json({msg: "Delete Successful", code:200, status:true, data:userDeleteController});
        }else{
            res.status(400).json({msg: "Delete UnSuccessful", code:400, status:false, data:userDeleteController});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    }
}



module.exports = { Addcontent,Update,Delete }