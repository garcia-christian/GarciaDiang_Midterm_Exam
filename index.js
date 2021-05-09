const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.get("/GarciaDiang-2.1.1", async (req, res) => {
    try {
        const sql = `SELECT COUNT(*) from film`;
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});
app.get("/GarciaDiang-2.1.2", async (req, res) => {
    try {
        const sql = `SELECT rating, sum(rental_duration)
        from film
        group by rating
        order by rating asc`;
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.get("/GarciaDiang-2.1.3", async (req, res) => {
    try {
        const sql = `select film_id, title 
        from film
        where replacement_cost = (Select max(replacement_cost) from film)
        `;
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.get("/GarciaDiang-2.2.1", async (req, res) => {
    try {
        const sql = `select * from midterm_list_of_films`;
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.get("/GarciaDiang-2.2.2", async (req, res) => {
    try {
        const sql = `select * from midterm_total_films_per_category;`;
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.get("/GarciaDiang-2.3.1", async (req, res) => {
    try {
        const sql = `select CONCAT(cu.first_name,' ',cu.last_name) "Customer Name",
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
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.get("/GarciaDiang-2.3.2", async (req, res) => {
    try {
        const sql = `select f.title "Title",
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
order by "Total Sales" DESC;`;
        const out = await pool.query(sql);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.post("/GarciaDiang-2.4.1/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const sql = `select findStaff($1);`;
        const out = await pool.query(sql,[id]);
        res.send(out.rows)
    } catch (error) { console.error(error.message) }
});

app.post("/GarciaDiang-2.4.2", async (req, res) => {
    try {
        const data = req.body;
        const sql = ` call returnDVD($1)`;
        const out = await pool.query(sql,[data.id]);
        res.send("Returned Successfully Rent ID = " + data.id)
    } catch (error) { console.error(error.message) }
});



app.listen(5000, () => {

    console.log("Server started as localhost at port: 5000")

})