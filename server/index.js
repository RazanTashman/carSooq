require("dotenv").config();
const express = require('express');
const myDB = require('./database-sql/index.js');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '../my-app/src/index.js'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Get request to render all cars in stock db table when opening the inventory page.
app.get("/allcars", (req, res) => {
    let query = `SELECT * FROM cars`
    myDB.con.query(query, (err, results) => {
        res.send(results)
    })
})

const users = [];

//save data from signup page to users table in mysql
app.post('/signup', async(req, res) => {
    console.log('aaaa')
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let url = req.body.url
    let emailExisted = `SELECT * FROM users WHERE email = '${email}'`
    myDB.con.query(emailExisted, async (err, results)=> {
    if (results.length > 0 && results[0].email === email) {
         return res.status(400).send("email already exist")
    }
    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        url: req.body.url
    };
    myDB.con.query(`Insert into users (username, email, password ) VALUES ('${user.username}','${user.email}','${user.password}' )`)
    try{
        res.send(user)
    }
    catch(err){
        res.status(400).send(err)
    }}
  ) }
   )
   app.post('/login', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    console.log(password)
    let emailExisted = `SELECT * FROM users WHERE email = '${email}'`
    myDB.con.query(emailExisted, async (err, results)=> {
        if (results.length > 0 && results[0].email === email) {
            const validPassword =await bcrypt.compare(password, results[0].password)
            console.log(results[0].password)
            console.log("$2b$04$48H6TdmHonNM0bMsoZ/go.W5urQvE16L4FQAN0u5Wsyd204zL5fzO")
            if(!validPassword){
                return res.status(400).send("Password is invalid")}
            console.log(validPassword)
// try{
                const token = jwt.sign({_id: results[0].userID}, "" +  process.env.SECRET_TOKEN)
             res.send(token)
             console.log(token)
         } else{
    res.status(400).send("Password or Email is invalidddd")
}

    })
})

//verify the token before let the user enter a private route
// function authenticateToken(req, res, next) {
//     const token = req.query.token.accessToken;
//     if (!token)
//         res.status(400).send("we need a token");
//     else {
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if (err) res.status(400).send("you failed to authenticate")
//             req.userId = user;
//             next()
//         })
//     }
// }

// app.get('/posts', authenticateToken, (req, res) => {
//     res.status(200).send("you are Authenticated");
// })

//search a car by filtering code
app.post('/inventory', (req, res) => {
    let brand = req.body.object.brand;
    let year = req.body.object.year;
    let colour = req.body.object.colour;
    let price = req.body.object.price;

    if (brand !== "" && year !== "" && colour !== "" && price !== "" && price == "lowestToHighest") {
        let query = `SELECT * FROM cars WHERE brand = '${brand}' AND year = '${year}' AND colour = '${colour}' ORDER BY Price ASC`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand == "all") {
        let query = `SELECT * FROM cars`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year !== "" && colour !== "" && price !== "" && price == "highestToLowest") {
        let query = `SELECT * FROM cars WHERE brand = '${brand}' AND year = '${year}' AND colour = '${colour}' ORDER BY Price DESC`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year === "" && colour === "" && price === "") {
        let query = `SELECT * FROM cars WHERE  brand = '${brand}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
            console.log(results)
        })
    } else if (brand !== "" && year !== "" && colour === "" && price === "") {
        let query = `SELECT * FROM cars WHERE  brand = '${brand}' AND year = '${year}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year !== "" && colour !== "" && price === "") {
        let query = `SELECT * FROM cars WHERE  brand = '${brand}' AND year = '${year}' AND colour = '${colour}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    } else if (brand !== "" && year === "" && colour !== "" && price === "") {
        let query = `SELECT * FROM cars WHERE brand = '${brand}' AND colour = '${colour}'`
        myDB.con.query(query, (err, results) => {
            res.send(results)
        })
    }
});
// app.use(express.static(__dirname + '/dist/demo'));

// // PathLocationStrategy
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '../index.html'));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../my-app/src/index.js'));
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});