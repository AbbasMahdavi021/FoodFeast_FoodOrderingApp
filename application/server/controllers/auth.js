const db = require("../db.js");
const bcrypt = require("bcryptjs");
const Cart = require('../config/cart.js');

const register = (req, res) => {
    //check if user already exists.
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!")

        //Hash Password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User Created!"),
                console.log("Account for " + req.body.username + " was created!")
        });
    });
};

const fetchRestaurantId = (userId, callback) => {
  const restaurantQuery = "SELECT * FROM restaurants WHERE owner_id = ?";

  db.query(restaurantQuery, [userId], (error, result) => {
    if (error) {
      return callback(error);
    }

    if (result.length > 0) {
      return callback(null, result[0].id);
    }

    return callback(null, null);
  });
};


const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length === 0) {
        return res.status(404).json("Incorrect Username or Password!");
      }

      //check password
      const correctPass = bcrypt.compareSync(req.body.password, data[0].password);
  
      if (!correctPass) {
        return res.status(400).json("Incorrect Username or Password!");
      }
  
      console.log("Logged in as " + data[0].username);
      req.session.isLoggedIn = true;
      req.session.username = req.body.username;
  
      const isDriver = data[0].isDriver;
      const username = data[0].username;
      const id = data[0].id;
      const isRestaurantOwner = data[0].isRestaurantOwner;
      const email = data[0].email;
  
      if (isRestaurantOwner) {
        fetchRestaurantId(id, (error, restaurantId) => {
          if (error) {
            return res.status(500).json("Error fetching restaurant ID");
          }
  
          return res.status(200).send({ success: true, isDriver, username, id, isRestaurantOwner, email, restaurantId });
        });
      } else {
        return res.status(200).send({ success: true, isDriver, username, id, isRestaurantOwner, email });
      }
    });
  };
  

const logout = (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.status(500).json("Could not log out.");
        }
        return res.status(200).json({ success: true });
    });
}


const adminlogin = (req, res) => {

    const q = "SELECT * FROM users WHERE ( username = ?) AND isAdmin = 1";

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 0) {
            return res.status(404).json("Incorrect Username or Password!");
        }

        //check password
        const correctPass = bcrypt.compareSync(req.body.password, data[0].password); //first item in data arr = user

        if (!correctPass) {
            return res.status(400).json("Incorrect Username or Password!");
        }

        req.session.isAdminLoggedIn = true;
        req.session.username = req.body.username;

        console.log("Logged in as Admin: " + data[0].username);
        const isAdmin = data[0].isAdmin;
        req.session.isAdmin = isAdmin;

        return res.status(200).send({ success: true });
    });
}

const restaurantOwnerRegister = (req, res) => {
  //check if user already exists.
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"

  db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists!")

      //Hash Password and create user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q = "INSERT INTO users (`username`, `email`, `password`,`isRestaurantOwner`) VALUES (?)"
      const values = [  req.body.username,  req.body.email,  hash, 1]
      
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        const owner_id = data.insertId;
        console.log("Account for " + req.body.username + " was created with ID " + owner_id);
        return res.send({owner_id: owner_id});
      });
  });
};


const getStatus = async (req, res) => {
    try {
        
        let loggedIn = req.session.isLoggedIn || false;
        let adminLoggedIn = req.session.isAdminLoggedIn || false;
        res.send({
            isLoggedIn: loggedIn,
            isAdminLoggedIn: adminLoggedIn
        });

    } catch (error) {
        res.status(500).send(error);
    }
}




module.exports = { register, login, logout, getStatus, adminlogin, restaurantOwnerRegister };