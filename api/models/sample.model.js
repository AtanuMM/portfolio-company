import { Sequelize } from "sequelize";
import db from "../_helpers/sample.helpers.js";
 
const { DataTypes } = Sequelize;

const Users = db.define("users",{
        name:{
            type: DataTypes.STRING,
            required:true
        },
        email:{
            type: DataTypes.STRING,
            required:true
        },
        password:{
            type: DataTypes.STRING,
            required:true
    
        },
        refresh_token:{
            type: DataTypes.TEXT
        }
    },{
        freezeTableName:true
    });
     
    (async () => {
        await db.sync();
    })();
     
    export default Users;

 
   

