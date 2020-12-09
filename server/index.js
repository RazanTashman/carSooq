
require("dotenv").config();
const express = require('express');
const myDB = require('./database-sql/index.js');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
// const auth= require('./auth')


app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/../react-client/dist'));
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

app.post('/signup', async(req, res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let emailExisted = `SELECT * FROM users WHERE email = '${email}'`
    myDB.con.query(emailExisted, async (err, results)=> {
    if (results.length > 0 && results[0].email === email) {
         return res.status(400).send("email already exist")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    };
    myDB.con.query(`Insert into users (username, email, password) VALUES ('${user.username}','${user.email}','${user.password}')`)
    try{
        res.send(user)
    }
    catch(err){

        res.status(400).send(err)
    }}
    )})

//login
app.post('/login', async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let emailExisted = `SELECT * FROM users WHERE email = '${email}'`
    myDB.con.query(emailExisted, async (err, results)=> {
        if (results.length > 0 && results[0].email === email) {

    const validPassword = await bcrypt.compare(password, results[0].password);
    if(!validPassword){
    return res.status(400).send("Password or Email is invalid")}

    const token = jwt.sign({_id: results[0]._id},  process.env.SECRET_TOKEN);

  res.send(token)}
  else{
    return res.status(400).send("Password or Email is invalid")

  }
    })})
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
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../react-client/dist/index.html'));
});



////// to display car info
app.get("/car/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let query = `SELECT * FROM cars WHERE carId = '${id}' `;
    myDB.con.query(query, (err, results) => {
      res.send(results);

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
    let userId = req.body.id;
    let query = `SELECT * FROM cars,users WHERE users.id = '${userId}' and cars.owner= '${userId}' `;
    console.log(query);
    myDB.con.query(query, (err, results) => {
      res.send(results);
    });
  });

  ///// to display all cars for rent
  app.get("/home/rent", (req, res) => {
    let query = `SELECT * FROM cars WHERE operation = 'renting' `;
    myDB.con.query(query, (err, results) => {
      res.send(results);
    });
  });

  //// to display all cars for sale
  app.get("/home/sale", (req, res) => {
    let query = `SELECT * FROM cars WHERE operation = 'saling'  `;
    myDB.con.query(query, (err, results) => {
      res.send(results);
    });
  });

  //// to display the cars for rent for each seller
  app.post("/profile/rent", (req, res) => {
    let userId = req.body.id;
    let query = `SELECT * FROM cars WHERE operation = 'renting' AND owner = '${userId}' `;
    myDB.con.query(query, (err, results) => {
      res.send(results);
    });
  });

  //// to display the cars for rent for each seller
  app.post("/profile/sale", (req, res) => {
    let userId = req.body.id;
    let query = `SELECT * FROM cars WHERE operation = 'saling' AND owner = '${userId}' `;
    myDB.con.query(query, (err, results) => {
      res.send(results);
    });
  });

  //// to add for the wishlist
  app.post("/wishlist", (req, res) => {
    let userId = req.body.id;
    let carId = req.body.carId;

    let query = `REPLACE into wishlist (car, user) VALUES ('${carId}','${userId}')`;
    myDB.con.query(query, (err, results) => {
      res.send(results);
    });
  });

  //// to get for the wishlist
  app.get("/wishlist/:id", (req, res) => {
    let wishlistId = parseInt(req.params.id);
    let mySql = `SELECT * FROM cars WHERE carId IN (SELECT car FROM wishlist WHERE user IN (SELECT user FROM wishlist WHERE id = '${wishlistId}'))`;
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
      owner: req.body.owner,
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
    let carId= parseInt(req.params.id)
    console.log(carId)
    let query = `DELETE FROM cars WHERE carId = '${carId}'`;
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
    let userId= req.body.id
    let getEmail=  `SELECT email FROM users WHERE id = '${userId}' `
    myDB.con.query(getEmail, (err, results) => {
        res.send(results);


    console.log("emaiiiil:" ,results[0].email)

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tashmanrazan@gmail.com',
      pass: 'z2013972043'
    }
  });

  var mailOptions = {
    from: 'tashmanrazan@gmail.com',
    to: results[0].email,
    subject: 'Car Sooq',
    text: 'Hello From Server ,That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});
