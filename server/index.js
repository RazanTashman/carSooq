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
const verify = require('./tokenVerify.js')
// const auth= require('./auth')

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: false
}));

//for all cars
app.get("/allcars", async(req, res) => {
    console.log("helllo from all carsSS")
    let query = `SELECT * FROM cars ORDER BY id DESC`;
    myDB.con.query(query, (err, results) => {
        // console.log("results.....",results)
        res.send(results);
    });
});
const users = [];



//signup
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
  console.log('Im herrre')
  console.log("hashedPassword",hashedPassword)
  const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    //   url: req.body.url
  };
  console.log('username',user.username,'email',user.email,'password',user.password,'url',user.url)
  myDB.con.query(`Insert into users (username, email, password ) VALUES ('${user.username}','${user.email}','${user.password}' )`)
  try{
      res.send(user)
      console.log("res",user)
  }
  catch(err){
      res.status(400).send(err)
      console.log("err",err)
  }}
) }
 )
 app.post('/login',  (req, res) => {
    console.log("Hellloooo from Login")
     var obj={}
  let email = req.body.email
  let password = req.body.password
  console.log(password)
  let emailExisted = `SELECT * FROM users WHERE email = '${email}'`
  myDB.con.query(emailExisted, async (err, results)=> {
      if (results.length > 0 && results[0].email === email) {
          const validPassword =await bcrypt.compare(password, results[0].password)
          console.log("results",results[0])
          obj.id= results[0].userID
        //   console.log("$2b$04$48H6TdmHonNM0bMsoZ/go.W5urQvE16L4FQAN0u5Wsyd204zL5fzO")
          if(!validPassword){
              return res.status(400).send("Password is invalid")}
          console.log(validPassword)
// try{
              const token = jwt.sign({_id: results[0].userID}, "" +  process.env.SECRET_TOKEN)
              obj.token = token
              console.log("obj.......",obj)
           res.send(obj)
           console.log(token)
       } else{
  res.status(400).send("Password or Email is invalidddd")
}
  })
})

//search a car by filtering code
app.post("/inventory", (req, res) => {
  var array = [];
  var obj1 = {};
  var obj2 = {};
  var obj3 = {};
  var obj4 = {};
  let brand = req.body.brand;
  let year = req.body.year;
  let color = req.body.color;
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
  if (color !== "") {
      obj3.color = color;
      array.push(obj3);
  }
  if (operation !== "") {
      obj4.operation = operation;
      array.push(obj4);
  }
//   console.log("array:", array);
//   console.log("Object:", Object.keys(array[0])[0])
//   console.log("values:", Object.values(array[0])[0])
//   console.log("price:", price)
  if (price !== "highestToLowest" ) {
    if (array.length === 0) {
        let query = `SELECT * FROM cars ORDER BY price ASC`;
        myDB.con.query(query, (err, results) => {
        res.send(results);
    });
    }
      if (array.length === 1) {
          let query = `SELECT * FROM cars WHERE ${Object.keys(
              array[0]
          )[0]}= '${Object.values(array[0])[0]}' ORDER BY price ASC`;
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
          )} = '${Object.values(array[1])}') ORDER BY price ASC`;
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
          )}= '${Object.values(array[2])}'  ORDER BY price ASC`;
          myDB.con.query(query, (err, results) => {
              console.log("results3", results);
              res.send(results);
          });
          if (array.length === 4) {
            let query = `SELECT * FROM cars WHERE ${Object.keys(
                array[0]
            )}= '${Object.values(array[0])}' AND ${Object.keys(
                array[1]
            )}= '${Object.values(array[1])}' AND ${Object.keys(
                array[2]
            )}= '${Object.values(array[2])}' AND ${Object.keys(
                array[2]
            )}= '${Object.values(array[3])}' ORDER BY price ASC`;
            myDB.con.query(query, (err, results) => {
                console.log("results3", results);
                res.send(results);
            });
        }
      }
  }

  else {
    if (array.length === 0) {
        let query = `SELECT * FROM cars ORDER BY price DESC`;
        myDB.con.query(query, (err, results) => {
        res.send(results);
    });
    }
      if (array.length === 1) {
          let query = `SELECT * FROM cars WHERE ${Object.keys(
              array[0]
          )}= '${Object.values(array[0])}' ORDER BY price DESC`;
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
          )} = '${Object.values(array[1])}') ORDER BY price DESC`;
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
          )}= '${Object.values(array[2])}'  ORDER BY price DESC`;
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
          )}= '${Object.values(array[3])}' ORDER BY price DESC`;
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
app.get("/car/:id", verify,(req, res) => {
  var array = []
  var obj={}
  let id = parseInt(req.params.id);
  let query = `SELECT * FROM cars WHERE id = '${id}' `;
  myDB.con.query(query, (err, results) => {
      console.log("resultssss:",results)
      obj.carId = results[0].id;
      obj.brand = results[0].brand;
      obj.year = results[0].year;
      obj.price = results[0].price;
      obj.color = results[0].color;

      obj.operation = results[0].operation;
      obj.owner = id
      array.push(obj)
  });
  let mySql = `SELECT * FROM feedback WHERE car = '${id}' `;
  myDB.con.query(mySql, (err, results) => {
      console.log(results);
      array.push(results) ;
      res.send(array);
  });
});


/////// to add car
app.post("/add", (req, res) => {
    console.log("hello from adding cars ")
    var car = {
        brand: req.body.brand,
        year: req.body.year,
        color: req.body.color,
        price: req.body.price,
        image: req.body.image,
        operation: req.body.operation,
        descreption: req.body.descreption,
        owner: req.body.id
    };
    console.log("res",car)
    var query = `INSERT INTO cars
          (
              brand, year, price, color,image,operation,description,owner
          )
          VALUES
           (?,?,?,?,?,?,?,? )`;
    myDB.con.query(
        query,
        [
            car.brand,
            car.year,
            car.price,
            car.color,
            car.image,
            car.operation,
            car.descreption,
            car.owner
        ],
        (err, results) => {
            try{
                res.send(car);
                // console.log("res",car)
            }
            catch(err){
                res.status(400).send(err)
                console.log("err",err)
            }

        }
    );
});
/////// to display user profile



/////// to display user profile
app.get("/profile/:id", (req, res) => {
    console.log("hiii from profile")
    obj = {};
    // let userId = req.user;
    userId = req.params.id
    console.log("req.params",req.params)
    console.log("req.user",req.user)
    let query = `SELECT * FROM users WHERE userId = '${userId}' `;
    myDB.con.query(query, (err, results) => {
        obj.username = results[0].username;
        obj.email = results[0].email;
        obj.image = results[0].image;
    });
    let mySql = `SELECT * FROM cars WHERE owner = '${userId}' ORDER BY id DESC`;
    myDB.con.query(mySql, (err, results) => {
        console.log("results",results);
        obj.cars = results;
        console.log("Profile Result",obj)
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
    let userId = req.user;
    let query = `SELECT * FROM cars WHERE operation = 'rent' AND owner = '${userId}' `;
    myDB.con.query(query, (err, results) => {
        res.send(results);
    });
});



//// to display the cars for rent for each seller
app.post("/profile/sale", (req, res) => {
    let userId =req.user;
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
app.get("/wishlist/:id", async(req, res) => {
    let userId = await  req.params.id
    console.log(`userId ${userId}`)
    let mySql = `SELECT * FROM cars WHERE id IN (SELECT car FROM wishlist WHERE user = ${userId})`;
       myDB.con.query(mySql, (err, results) => {
        console.log("results",results)
        res.send(results);
    });
});



/// to update cars info
// app.put("/update", (req, res) => {
//     var car = {
//         brand: req.body.brand,
//         year: req.body.year,
//         color: req.body.color,
//         price: req.body.price,
//         url: req.body.url,
//         operation: req.body.operation,
//         owner: req.body

//         image: req.body.image,

//         operation: req.body.operation,
//         owner: req.body.id,
//     };
//     let carId = req.body.id;
//     let query = `UPDATE cars SET brand = ?, year =?, price =?, color =?, image =?,operation=?,owner=? WHERE id = '${carId}'`;
//     myDB.con.query(
//         query,
//         [
//             car.brand,
//             car.year,
//             car.price,
//             car.color,
//             car.image,

//             car.operation,
//             car.owner,
//         ],
//         (err, results) => {
//             res.send(car);
//         }
//     );
// });
// to delete cars



// to delete cars
app.delete("/delete/", (req, res) => {
    let carId = req.body.car;
    let userId = req.body.user;
    console.log(carId);

    let query = `DELETE FROM wishlist WHERE car = '${carId}'`;
    myDB.con.query(query, (err, results) => {
        // res.send("Deleted");


    let mySql = `SELECT * FROM cars WHERE id IN (SELECT car FROM wishlist WHERE user = ${userId})`;
    myDB.con.query(mySql, (err, results) => {
     console.log("results",results)
     res.send(results);
 });
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
    console.log("Emaiiiiiil");
  var email = {
      sender: req.body.sender,
      carId: req.body.carID,
      msg: req.body.comment,
    //   email: req.body.email
  };
  console.log("email:",email);
  myDB.con.query(
      `SELECT owner FROM cars WHERE id= '${email.carId}'`,
      (err, results) => {
          console.log(results);
          let query = `SELECT email FROM users WHERE userID = '${email.sender}' `;
          myDB.con.query(query, (err, result1) => {
            console.log("sender11", result1);


        //   console.log("receiver", email.receiver);
          myDB.con.query(
              `Insert into emails (sender, receiver) VALUES ('${result1[0].email}','${results[0].owner}')`,
              (err, results) => {
                  console.log("done", results);
              }
          );
        });
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
              pass: "Z2013972043",
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

})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});