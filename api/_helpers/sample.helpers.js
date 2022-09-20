import { Sequelize } from "sequelize";
 
const db = new Sequelize('Portfolio', 'admin', 'Matrix@2022', {
    host: "localhost",
    dialect: "mysql"
});
 
db.authenticate()
.then(()=>{
    console.log("connected");
})
.catch(err=>{
    console.log("Error"+err);
});

export default db;
