

const pool = require("./db");

const sql = `
select film_id, title 
from film
where replacement_cost = (Select max(replacement_cost) from film)

`;


pool.query(sql,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }

});
pool.end();
