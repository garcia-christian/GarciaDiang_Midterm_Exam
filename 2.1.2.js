

const pool = require("./db");

const sql = `
SELECT rating, sum(rental_duration)
from film
group by rating
order by rating asc`;


pool.query(sql,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }

});
pool.end();
