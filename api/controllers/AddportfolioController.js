const { response } = require("express");
const { production } = require("../config/config");
const { db: { AddPortfolio, conn }, db } = require("../models")
const { userAdd, userEdit, userDelete, contentGet, showData } = require("../services/AddPortfolioService.js")

const getContent = async (req, res) => {

    try {
        let userGetController = await contentGet(req, res)
        //console.log(userLoginController,`line 38`)
        if (userGetController) {
            res.status(200).json({ msg: " Successful", code: 200, status: true, data: userGetController });
        } else {
            res.status(400).json({ msg: "UnSuccessful", code: 400, status: false, data: userGetController });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", code: 500, status: false, error: error });
    }


}
const Addcontent = async (req, res) => {
    try {
        let userAddController = await userAdd(req, res)
        //console.log(userLoginController,`line 38`)
        if (userAddController) {
            res.status(200).json({ msg: "Add Successful", code: 200, status: true, data: userAddController });
        } else {
            res.status(400).json({ msg: "Add UnSuccessful", code: 400, status: false, data: userAddController });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", code: 500, status: false, error: error });
    }
}

//const SearchData = async (req, res) => {
// try {
//     const search = await AddPortfolio.findAll({
//         if (search) {
//             AddPortfolio.where('column_name.category', 'like', `%${search}%`) 
//                 // .orWhere('column_name.first_name', 'like', `%${search}%`) 
//                 // .orWhere('column_name.personal_email', 'like', `%${search}%`) 
//                 // .orWhere('column_name.work_email', 'like', `%${search}%`) 
//                 // .orWhere('column_name.office_name', 'like', `%${search}%`)
//         }
//     });
//     res.json(search);
// } catch (error) {
//     console.log(error);
// }
// var category = req.query.category;
// var sql;

// if (category) {
//     var params = category.split(",");
//     sql = "SELECT * FROM AddPortfolios WHERE category IN " + params;
// } else {
//     sql = "SELECT * FROM AddPortfolios WHERE category =" + category;
// }

// AddPortfolio.query(sql, function (error, results, fields) {
//     res.json({"status": 200, "error": null, "response": results});
// });


// let result = await AddPortfolio.findAll({
//     "$or": [
//         { category: { $regex: req.params.key } },
//         { Tstack1: { $regex: req.params.key } },
//         { Tstack2: { $regex: req.params.key } }
//     ]
// });
// res.send(result)
//SELECT AddPortfolios.projectName FROM AddPortfolios WHERE AddPortfolios.category='' OR AddPortfolios.industry='';
//}
// const SearchData1 = async (req, res) => {
//     try {
//         const users = await AddPortfolio.findAll({
//             "$or":[
//                 {category:{$regex:req.params.key}},
//                 {Tstack1:{$regex:req.params.key}},
//                 {Tstack2:{$regex:req.params.key}}
//             ]
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }
// const SearchData = async (req, res) => {
//     try {
//         const users = await AddPortfolio.findAll({
//             "$or":[
//                 {category:{$regex:req.params.key}},
//                 {Tstack1:{$regex:req.params.key}},
//                 {Tstack2:{$regex:req.params.key}}
//             ]
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }
// const SearchData = async (req, res) => {
//     console.log(req.params.key);
//     let data = await AddPortfolio.findAll(
//         {
//             "$or":[
//                 { "projectName":{$regex:req.params.key}}
//             ]
//         }
//     )
//     res.send(data)
// }


const Update = async (req, res) => {
    try {
        let userEditController = await userEdit(req, res)
        //console.log(userLoginController,`line 38`)
        if (userEditController) {
            res.status(200).json({ msg: "Update Successful", code: 200, status: true, data: userEditController });
        } else {
            res.status(400).json({ msg: "Update UnSuccessful", code: 400, status: false, data: userEditController });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", code: 500, status: false, error: error });
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

const ShowData = async (req, res) => {
    try {
        let userShowDataController = await showData(req, res)
        //console.log(userLoginController,`line 38`)
        if (userShowDataController) {
            res.status(200).json({ msg: "DAta Successful", code: 200, status: true, data: userShowDataController });
        } else {
            res.status(400).json({ msg: "DAta UnSuccessful", code: 400, status: false, data: userShowDataController });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", code: 500, status: false, error: error });
    }
}


const Delete = async (req, res) => {
    // try {
    //     let userDeleteController = await userDelete(req,res)
    //     console.log(userDeleteController)
    //     if(userDeleteController){
    //         res.status(200).json({msg: "Delete Successful", code:200, status:true, data:userDeleteController});
    //     }
    //     else {
    //         res.status(400).json({msg: "Delete UnSuccessful", code:400, status:false, data:userDeleteController});
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({msg: "Internal Server Error", code:500, status:false, error:error});
    // }


    //Hard delete
    try {
        await AddPortfolio.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = { Addcontent, Update, Delete, getContent, ShowData }