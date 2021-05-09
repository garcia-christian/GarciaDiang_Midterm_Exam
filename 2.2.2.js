

const pool = require("./db");

const sql = `
select * from midterm_total_films_per_category;

`;


pool.query(sql,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }

});
pool.end();
