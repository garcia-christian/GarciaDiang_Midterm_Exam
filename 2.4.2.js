

const pool = require("./db");

const sql = `
 call returnDVD(14878)

`;


pool.query(sql,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }

});
pool.end();
