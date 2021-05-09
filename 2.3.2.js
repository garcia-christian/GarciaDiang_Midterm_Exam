

const pool = require("./db");

const sql = `
select f.title "Title",
		cat.name "Category",
		count(i.film_id) "Total Rents",
		sum(p.amount) "Total Sales"
from film f
join inventory i on i.film_id = f.film_id
join rental r on r.inventory_id = i.inventory_id
join payment p on p.rental_id = r.rental_id
join film_category fc on fc.film_id = f.film_id
join category cat on fc.category_id = cat.category_id
group by f.title, cat.name
order by "Total Sales" DESC;

`;


pool.query(sql,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }

});
pool.end();
