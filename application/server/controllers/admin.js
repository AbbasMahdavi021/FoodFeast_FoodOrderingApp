const db = require("../db.js");


const getUserList = async (req, res) => {

    try {
        const rows = [];
        const q = 'SELECT * FROM users WHERE isAdmin = 0 AND isDriver = 0 AND isRestaurantOwner = 0';
    
        db.query(q, (error, results) => {
          results.forEach(row => rows.push(row));
          res.send(rows);
        });
    
      } catch (err) {
        console.error(err);
        res.send([]);
      }
};

const getUser = async (req, res) => {

  try {
      const rows = [];
      const q = "SELECT * FROM users WHERE id = ? OR username LIKE ?";
  
      db.query(q, [req.body.searchTerm, '%'+req.body.searchTerm+'%'], (error, results) => { 

        results.forEach(row => rows.push(row));
        res.send(rows);
      });
  
    } catch (err) {
      console.error(err);
      res.send([]);
    }
};

const getRestaurant = async (req, res) => {

  try {
      const rows = [];
      const q = "SELECT * FROM restaurants WHERE id = ? OR name LIKE ?";
  
      db.query(q, [req.body.searchTerm, '%'+req.body.searchTerm+'%'], (error, results) => { 

        results.forEach(row => rows.push(row));
        res.send(rows);
      });
  
    } catch (err) {
      console.error(err);
      res.send([]);
    }
};


const deleteUser = async (req, res) => {

  console.log("Delteing user...");

  try {

      const q = 'DELETE FROM users WHERE id = ?';
  
      db.query(q, [req.body.userId], () => {

        console.log(req.body);

        console.log("Deleted user: " + req.body.userId);

        res.send({status : 200})

      });
  
    } catch (err) {
      console.error(err);
      res.send(err.message);
    }
};


const deleteRestaurant = async (req, res) => {

  console.log("Delteing restaurant...");

  try {

      const q = 'DELETE FROM restaurants WHERE id = ?';
  
      db.query(q, [req.body.restaurantId], () => {

        console.log(req.body);

        console.log("Deleted user: " + req.body.restaurantId);

        res.send({status : 200})

      });
  
    } catch (err) {
      console.error(err);
      res.send(err.message);
    }
};

const processQuery = async (req, res) => {

  console.log("Executing my SQL: " + req.body.query);

  try {

    const q = req.body.query;

    db.query(q, (error, results) => {

      console.log(req.body.query);
      
      console.log(results);

      if(error){
        res.send(error.message);
        console.log(error.message);
      }
      res.send( JSON.stringify(results) );

    });

  } catch (err) {
    console.error(err);
    res.send(err);
  }

}



module.exports = { getUserList, getUser, deleteUser, processQuery, deleteRestaurant, getRestaurant};