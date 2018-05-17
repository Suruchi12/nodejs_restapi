//load our app server using express

const express = require('express')  //call the express library
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))


app.post('/user_create', (req, res) => {

  console.log("Trying to create new user...")

  console.log("firstName " + req.body.create_first_name)

  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const queryString = "INSERT INTO users(first_name, last_name) VALUES (?, ?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if(err){
      console.log("Failed to add user" + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: " + results.insertedId);
    res.end()

  })

  res.end()
})







const router = require('./routes/user.js')

app.use(router)




//set root route
app.get("/", (req, res) => {
  console.log("Responding to root route") //will print on the console
  res.send("Hello from Root") //will print on the localhost
})


//ping the server at localhost at 3003
app.listen('3003', () => {
 console.log("Server is up and listening on 3003...")

})
