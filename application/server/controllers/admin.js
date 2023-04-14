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




module.exports = { getUserList, deleteUser };