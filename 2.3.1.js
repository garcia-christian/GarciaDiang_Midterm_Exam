

const pool = require("./db");

const sql = `
select CONCAT(cu.first_name,' ',cu.last_name) "Customer Name",
	   string_agg(r.rental_id::character varying,',')"Rental ID",
	   cu.email "Customer Email",
	   CONCAT(a.address,', ',a.district,', ',ct.city ) "Customer Address",
	   cn.country "Country",
	   count(f.title) "Number of Films",
	   GROUP_CONCAT(f.title) "Films",
	   r.rental_date "Date Rented"
from customer cu
left outer join rental r on r.customer_id = cu.customer_id
left outer join inventory i on r.inventory_id = i.inventory_id
left outer join film f on i.film_id = f.film_id
left outer join address a on a.address_id =cu.address_id
left outer join city ct on ct.city_id = a.city_id
left outer join country cn on cn.country_id = ct.country_id
where r.return_date is null
group by "Customer Name","Customer Email",a.address,a.district,ct.city,cn.country,"Date Rented" 

`;


pool.query(sql,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }

});
pool.end();
