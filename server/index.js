require("dotenv").config();
const express = require("express");
const myDB = require("./database-sql/index.js");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var mysql = require("mysql");
// const auth= require('./auth')

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);


// myDB.con.query(`Insert into users (username, email, password ) VALUES ('hi','wow','bye')`)

//Get request to render all cars in stock db table when opening the inventory page.
app.get("/allcars", (req, res) => {
    let query = `SELECT * FROM cars`;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

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

    res.send();
})

//Login
//dealing with passwords (hashing and salting)
app.post('/users', async (req, res) => {
    console.log("Hello hashing", req.body.username)
    try {
        console.log("TRY hashing")
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //10 is the salting number
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };
        users.push(user);
        res.send(user);
    } catch {
        console.log("CATCH hashing")
        res.status(500).send();

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
} )

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


//compare users from login page with db, if the user is verified, give him a token if not, detect if the user exist or if his username matches with his hashed password
app.post('/login', async (req, res) => {

    var username = req.body.username;
    var password = req.body.password;
    let query = `SELECT * FROM users WHERE username = '${req.body.username}'`
    myDB.con.query(query, function(err, results) {
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, response) => {
                if (response) {
                    const accessToken = jwt.sign({
                        username: username
                    }, process.env.ACCESS_TOKEN_SECRET);
                    res.json({
                        accessToken: accessToken
                    });
                } else {
                    res.send("wrong username/password combination")
                }
            })
        } else {
            res.send("User doesn't exist");
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
app.post("/inventory", (req, res) => {
    var array = [];
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    var obj4 = {};
    let brand = req.body.brand;
    let year = req.body.year;
    let colour = req.body.colour;
    let price = req.body.price;
    let operation = req.body.operation;


    if (brand !== "") {
        obj1.brand = brand;
        array.push(obj1);
    }
    if (year !== "") {
        obj2.year = year;
        array.push(obj2);
    }
    if (colour !== "") {
        obj3.colour = colour;
        array.push(obj3);
    }
    if (operation !== "") {
        obj3.operation = operation;
        array.push(obj3);
    }


    console.log("array:", array);

    if (price === "lowestToHighest") {

        if (array.length === 1) {
            let query = `SELECT * FROM cars WHERE ${Object.keys(
                array[0]
            )}= '${Object.values(array[0])}' ORDER BY Price ASC`;
            myDB.con.query(query, (err, results) => {
                console.log("results1", results);
                res.send(results);
            });
        }

        if (array.length === 2) {
            let query = `SELECT * FROM cars WHERE (${Object.keys(
                array[0]
            )} = '${Object.values(array[0])}' AND ${Object.keys(
                array[1]
            )} = '${Object.values(array[1])}') ORDER BY Price ASC`;
            myDB.con.query(query, (err, results) => {
                console.log("results2", results);
                res.send(results);
            });
        }

        if (array.length === 3) {
            let query = `SELECT * FROM cars WHERE ${Object.keys(
                array[0]
            )}= '${Object.values(array[0])}' AND ${Object.keys(
                array[1]
            )}= '${Object.values(array[1])}' AND ${Object.keys(
                array[2]
            )}= '${Object.values(array[2])}'  ORDER BY Price ASC`;
            myDB.con.query(query, (err, results) => {
                console.log("results3", results);
                res.send(results);
            });
        }
    }

    if (array.length === 4) {
        let query = `SELECT * FROM cars WHERE ${Object.keys(
            array[0]
        )}= '${Object.values(array[0])}' AND ${Object.keys(
            array[1]
        )}= '${Object.values(array[1])}' AND ${Object.keys(
            array[2]
        )}= '${Object.values(array[2])}' AND ${Object.keys(
            array[2]
        )}= '${Object.values(array[3])}' ORDER BY Price ASC`;
        myDB.con.query(query, (err, results) => {
            console.log("results3", results);
            res.send(results);
        });
    }


    if (price === "highestToLowest") {
        if (array.length === 1) {
            let query = `SELECT * FROM cars WHERE ${Object.keys(
                array[0]
            )}= '${Object.values(array[0])}' ORDER BY Price DESC`;
            myDB.con.query(query, (err, results) => {
                console.log("results1", results);
                res.send(results);
            });
        }

        if (array.length === 2) {
            let query = `SELECT * FROM cars WHERE (${Object.keys(
                array[0]
            )} = '${Object.values(array[0])}' AND ${Object.keys(
                array[1]
            )} = '${Object.values(array[1])}') ORDER BY Price DESC`;
            myDB.con.query(query, (err, results) => {
                console.log("results2", results);
                res.send(results);
            });
        }

        if (array.length === 3) {
            let query = `SELECT * FROM cars WHERE ${Object.keys(
                array[0]
            )}= '${Object.values(array[0])}' AND ${Object.keys(
                array[1]
            )}= '${Object.values(array[1])}' AND ${Object.keys(
                array[2]
            )}= '${Object.values(array[2])}'  ORDER BY Price DESC`;
            myDB.con.query(query, (err, results) => {
                console.log("results3", results);
                res.send(results);
            });
        }

        if (array.length === 4) {
            let query = `SELECT * FROM cars WHERE ${Object.keys(
                array[0]
            )}= '${Object.values(array[0])}' AND ${Object.keys(
                array[1]
            )}= '${Object.values(array[1])}' AND ${Object.keys(
                array[2]
            )}= '${Object.values(array[2])}' AND ${Object.keys(
                array[2]
            )}= '${Object.values(array[3])}' ORDER BY Price DESC`;
            myDB.con.query(query, (err, results) => {
                console.log("results3", results);
                res.send(results);
            });
        }
    }
});
// Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../react-client/dist/index.html'));
// });

////// to display car info
app.get("/car/:id", (req, res) => {
    var obj = {};
    let id = parseInt(req.params.id);
    let query = `SELECT * FROM cars WHERE id = '${id}' `;
    myDB.con.query(query, (err, results) => {
        obj.carId = results[0].id;
        obj.brand = results[0].brand;
        obj.year = results[0].year;
        obj.price = results[0].price;
        obj.colour = results[0].colour;
        obj.onSale = results[0].onSale;
        obj.state = results[0].state;
        obj.operation = results[0].operation;
        obj.owner = results[0].owner;
    });

    let mySql = `SELECT * FROM feedback WHERE car = '${id}' `;
    myDB.con.query(mySql, (err, results) => {
        console.log(results);
        obj.comments = results;
        res.send(obj);
    });
});

/////// to add car
app.post("/add", (req, res) => {
    var car = {
        brand: req.body.brand,
        year: req.body.year,
        colour: req.body.colour,
        price: req.body.price,
        image: req.body.image,
        onSale: req.body.onSale,
        state: req.body.state,
        operation: req.body.operation,
        owner: req.body.owner,
    };
    var query = `INSERT INTO cars
          (
              brand, year, price, colour, image ,onSale,state,operation,owner
          )
          VALUES
           (?,?,?,?,?,?,?,? ,?) `;

    myDB.con.query(
        query,
        [
            car.brand,
            car.year,
            car.price,
            car.colour,
            car.image,
            car.onSale,
            car.state,
            car.operation,
            car.owner,
        ],
        (err, results) => {
            res.send(car);
        }
    );
});

/////// to display user profile
app.post("/profile", (req, res) => {
    obj = {};
    let userId = req.body.userId;
    let query = `SELECT * FROM users WHERE users.userId = '${userId}' `;
    myDB.con.query(query, (err, results) => {
        obj.username = results[0].username;
        obj.email = results[0].email;
        obj.image = results[0].image;
    });

    let mySql = `SELECT * FROM cars WHERE cars.owner = '${userId}' `;
    myDB.con.query(mySql, (err, results) => {
        console.log(results);
        obj.cars = results;
        res.send(obj);
    });
});

///// to display all cars for rent
app.get("/home/rent", (req, res) => {
    let query = `SELECT * FROM cars WHERE operation = 'rent' `;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

//// to display all cars for sale
app.get("/home/sale", (req, res) => {
    let query = `SELECT * FROM cars WHERE operation = 'sale'  `;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

//// to display the cars for rent for each seller
app.post("/profile/rent", (req, res) => {
    let userId = req.body.userId;
    let query = `SELECT * FROM cars WHERE operation = 'rent' AND owner = '${userId}' `;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

//// to display the cars for rent for each seller
app.post("/profile/sale", (req, res) => {
    let userId = req.body.userId;
    let query = `SELECT * FROM cars WHERE operation = 'sale' AND owner = '${userId}' `;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

//// to add for the wishlist
app.post("/wishlist", (req, res) => {
    let userId = req.body.user;
    let carId = req.body.car;

    let query = `REPLACE into wishlist (car, user) VALUES ('${carId}','${userId}')`;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

//// to get for the wishlist
app.get("/wishlist/:id", (req, res) => {
    let wishlistId = parseInt(req.params.id);
    let mySql = `SELECT * FROM cars WHERE id IN (SELECT car FROM wishlist WHERE user IN (SELECT user FROM wishlist WHERE id = '${wishlistId}'))`;
    myDB.con.query(mySql, (err, results) => {
        res.send(results);
    });
});

/// to update cars info
app.put("/update", (req, res) => {
    var car = {
        brand: req.body.brand,
        year: req.body.year,
        colour: req.body.colour,
        price: req.body.price,
        image: req.body.image,
        onSale: req.body.onSale,
        state: req.body.state,
        operation: req.body.operation,
        owner: req.body.id,
    };
    let carId = req.body.id;
    let query = `UPDATE cars SET brand = ?, year =?, price =?, colour =?, image =?,onSale=?,state=?,operation=?,owner=? WHERE id = '${carId}'`;
    myDB.con.query(
        query,
        [
            car.brand,
            car.year,
            car.price,
            car.colour,
            car.image,
            car.onSale,
            car.state,
            car.operation,
            car.owner,
        ],
        (err, results) => {
            res.send(car);
        }
    );
});

// to delete cars
app.delete("/delete/:id", (req, res) => {
    let carId = parseInt(req.params.id);
    console.log(carId);
    let query = `DELETE FROM cars WHERE id = '${carId}'`;
    myDB.con.query(query, (err, results) => {
        res.send("Deleted");
    });
});

/// add feedback
app.post("/feedback", (req, res) => {
    let userId = req.body.sender;
    let carId = req.body.car;
    let comment = req.body.comment;

    let query = `REPLACE into feedback (sender, car,comment) VALUES ('${userId}','${carId}','${comment}')`;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});

// To git the feedack
app.get("/feedback/:id", (req, res) => {
    let feedbackId = parseInt(req.params.id);
    let mySql = `SELECT * FROM feedback WHERE car IN (SELECT car FROM feedback WHERE id = '${feedbackId}')`;
    myDB.con.query(mySql, (err, results) => {
        res.send(results);
    });
});

app.post("/email", (req, res) => {
    var email = {
        carId: req.body.car,
        sender: req.body.sender,
        msg: req.body.comment,
        email: req.body.email
    };
    myDB.con.query(
        `SELECT owner FROM cars WHERE id= '${email.carId}'`,
        (err, results) => {
            console.log(results);

            console.log("sender", email.sender);
            console.log("receiver", email.receiver);
            myDB.con.query(
                `Insert into emails (sender, receiver) VALUES ('${email.sender}','${results[0].owner}')`,
                (err, results) => {
                    console.log("done", results);
                }
            );
        }
    );

    let getEmail = `SELECT email FROM users WHERE userId IN ( SELECT owner FROM cars WHERE id= '${email.carId}') `;
    myDB.con.query(getEmail, (err, results) => {
        res.send(results);

        console.log("emaiiiil:", results[0].email);

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tashmanrazan@gmail.com",
                pass: "z2013972043",
            },
        });

        var mailOptions = {
            from: "tashmanrazan@gmail.com",
            to: results[0].email,
            subject: "Car ",
            cc: email.email,
            text: email.msg,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    });

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

})




const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
