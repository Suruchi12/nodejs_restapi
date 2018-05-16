//load our app server using express

const express = require('express')  //call the express library
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')


app.use(bodyParser)

app.use(express.static('./public'))

app.use(morgan('short'))


app.post('/user_create', (req, res) => {

  console.log("Trying to create new user...");
  res.end()
})

app.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id) //fetch users with id
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysql_basics'
  })

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



//set root route
app.get("/", (req, res) => {
  console.log("Responding to root route") //will print on the console
  res.send("Hello from Root") //will print on the localhost
})

//another route
//modify route of users to return JSON
app.get("/users", (req, res) => {

  var user1 = {firstName: "Sherlock", lastName: "Holmes"}
  const user2 = {firstName: "James", lastName: "Watson"}

  res.json([user1,user2])

  //res.send("Nodemon auto updates when I save this file")
})

//ping the server at localhost at 3003
app.listen('3003', () => {
 console.log("Server is up and listening on 3003...")

})
