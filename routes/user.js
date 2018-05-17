//user related routes

const express = require('express')  //call the express library
//const app = express()
const mysql = require('mysql')

const router = express.Router()
router.get('/messages', (req, res) => {

  console.log("Show some messages")
  res.end()

})

//another route
//modify route of users to return JSON
router.get("/users", (req, res) => {

    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err,rows, fields) => {
      if(err){
        console.log("Failed to fetch users" + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
    
    //var user1 = {firstName: "Sherlock", lastName: "Holmes"}
    //const user2 = {firstName: "James", lastName: "Watson"}
  
    //res.json([user1,user2])
  
    //res.send("Nodemon auto updates when I save this file")
  })

//create a pool so don't have to connect to server repeatedly
const pool = mysql.createPool({
    
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'mysql_basics'
})

//connecting repeatedly to database puts a lot of load on the server
function getConnection(){

    return pool
}

router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id) //fetch users with id
    const connection = getConnection()
  
    const userID = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userID] , (err, rows, fields) => {
  
      if (err){
          console.log("Failed to query for users:" + err)
          res.sendStatus(500)
          //throw err
          return
      }
  
      console.log("Fetched users successfuly")
  
      const users = rows.map((row) => {
  
          return {firstName: row.first_name, lastName: row.last_name}
      })
  
      res.json(users)
  
    })
    //res.end()
  })


module.exports = router