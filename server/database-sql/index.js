// var mysql = require('mysql');


// //edit your user and password
// //our database called stock
// var con = mysql.createConnection({
//     host: "us-cdbr-east-02.cleardb.com",
//     user: "bd186e318fc66b",
//     password: "abc2e867",
//     database: "heroku_eb954631c73c8c4",
// });

// `Insert into users (username, email, password) VALUES ('Adam','Adam@gmail.com','123456789')`
// // //connecting mysql and creating 2 tables in our stock; called cars & users
// con.connect()
// setInterval(function () {
//     con.query('SELECT 1');
// }, 5000);
// // //fields of users table - users TABLE
// // var Users = "CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(20), email VARCHAR(30), password VARCHAR(255), image TEXT )";
// // con.query(Users, function(err, result) {
// //      if (err) throw err;
// //     console.log("users Table created!");
// //   });
// // //fields of cars table - cars TABLE
// // var Cars = "CREATE TABLE IF NOT EXISTS cars ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  brand VARCHAR(20), year YEAR, price INT, colour VARCHAR(20), image TEXT, onSale VARCHAR(20), state VARCHAR(20), operation VARCHAR(20), owner INT NOT NULL REFERENCES users(id) )";
// // con.query(Cars, function(err, result) {
// //     if (err) throw err;
// //     console.log("cars Table created!");
// // });
// // //fields of emails table - emails TABLE
// // var Emails = "CREATE TABLE IF NOT EXISTS emails ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  sender INT NOT NULL REFERENCES users(id),  receiver INT NOT NULL REFERENCES users(id) )";
// // con.query(Emails, function(err, result) {
// //     if (err) throw err;
// //     console.log("emails table created!");
// // });
// // //fields of wishlist table - wishlist TABLE
// // var Wishlist = "CREATE TABLE IF NOT EXISTS wishlist ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  user INT NOT NULL REFERENCES users(id),  car INT NOT NULL REFERENCES cars(id)  )";
// // con.query(Wishlist, function(err, result) {
// //     if (err) throw err;
// //     console.log("wishlist table created!");
// // });
// // //fields of feedback table - feedback TABLE
// // var Feedback = "CREATE TABLE IF NOT EXISTS feedback ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  car INT NOT NULL REFERENCES cars(id),  sender INT NOT NULL REFERENCES users(id), comment VARCHAR(20) )";
// // con.query(Feedback, function(err, result) {
// //     if (err) throw err;
// //     console.log("feedback table created!");
// // });
// // });

// // //save function to see our cars dummy data in the mysql terminal (insert data in the columns) so we can deal directly with the database
// // // for (var i = 0; i < data.length; i++) {
// // //     var inserting = "REPLACE INTO cars (brand, year, price, colour, description, image,id) VALUES (?, ?, ?, ?, ?, ?, ?) ";
// // //     let rows = [data[i].brand, data[i].year, data[i].price, data[i].colour, data[i].description, data[i].image, i + 1];
// // //     con.query(inserting, rows, function(err, results, fields) {
// // //         if (err) throw err;
// // //     });
// // // }

// module.exports.con = con;

//////////////////////////////////////////////////////////////////////////////////////////////

var mysql = require('mysql');


//edit your user and password
//our database called stock
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "stock",
});

//connecting mysql and creating 2 tables in our stock; called cars & users
con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL Connected!!!");
//fields of users table - users TABLE
var Users = "CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(20), email VARCHAR(30), password VARCHAR(255), image TEXT )";
con.query(Users, function(err, result) {
     if (err) throw err;
    console.log("users Table created!");
  });
//fields of cars table - cars TABLE
var Cars = "CREATE TABLE IF NOT EXISTS cars ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  brand VARCHAR(20), year YEAR, price INT, colour VARCHAR(20), image TEXT, onSale VARCHAR(20), state VARCHAR(20), operation VARCHAR(20), owner INT NOT NULL REFERENCES users(id) )";
con.query(Cars, function(err, result) {
    if (err) throw err;
    console.log("cars Table created!");
});
//fields of emails table - emails TABLE
var Emails = "CREATE TABLE IF NOT EXISTS emails ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  sender INT NOT NULL REFERENCES users(id),  receiver INT NOT NULL REFERENCES users(id) )";
con.query(Emails, function(err, result) {
    if (err) throw err;
    console.log("emails table created!");
});
//fields of wishlist table - wishlist TABLE
var Wishlist = "CREATE TABLE IF NOT EXISTS wishlist ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  user INT NOT NULL REFERENCES users(id),  car INT NOT NULL REFERENCES cars(id)  )";
con.query(Wishlist, function(err, result) {
    if (err) throw err;
    console.log("wishlist table created!");
});
//fields of feedback table - feedback TABLE
var Feedback = "CREATE TABLE IF NOT EXISTS feedback ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  car INT NOT NULL REFERENCES cars(id),  sender INT NOT NULL REFERENCES users(id), comment VARCHAR(20) )";
con.query(Feedback, function(err, result) {
    if (err) throw err;
    console.log("feedback table created!");
});
});

//save function to see our cars dummy data in the mysql terminal (insert data in the columns) so we can deal directly with the database
// for (var i = 0; i < data.length; i++) {
//     var inserting = "REPLACE INTO cars (brand, year, price, colour, description, image,id) VALUES (?, ?, ?, ?, ?, ?, ?) ";
//     let rows = [data[i].brand, data[i].year, data[i].price, data[i].colour, data[i].description, data[i].image, i + 1];
//     con.query(inserting, rows, function(err, results, fields) {
//         if (err) throw err;
//     });
// }

module.exports.con = con;