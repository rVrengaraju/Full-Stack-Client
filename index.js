
const express = require('express');
const app = express();
const { Pool, Client } = require('pg')


app.set('view engine', 'ejs');
bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))


const connectionString = 'postgresql://rubanrengaraju@localhost:5432/startuplabs'; 
  

app.get("/login", (req, res) => {
	// console.log(req.params)
    res.render('../views/login')

})

app.post("/login", (req, res) => {
	console.log(req.body)
	res.redirect("/admin/" + req.body.firstname)
    // res.render('../views/login')

})

app.get('/admin/:name', (req, res) => {
	const queryString = "SELECT * FROM data WHERE name=" +"\'" + req.params.name + "\'"
	const client = new Client({
		connectionString: connectionString	
	});
	client.connect()
	.catch(err => console.log("Connection Error: "+err))
	client.query(queryString, (err, quer) => {
		if(quer.rows.length === 0){
			res.redirect("/login")
		}
		else{
			res.render('../views/admin', {comp: quer.rows[0]})
		}
		client.end()
	})
})

app.get("/*", (req, res) => {
    res.redirect("/login")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})