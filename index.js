const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")
mongoose.connect(process.env.DB)
  .then(() => console.log(' db is Connected!'));



const express = require("express")
const { signup } = require("./controller/user.controller")
const app = express ()





app.use(express.static("view"))

app.post('/signup',signup )

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})