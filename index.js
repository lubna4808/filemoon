const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const { v4: uniqueId } = require("uuid")
const cors = require("cors")

const { verifyToken } = require("./controller/token.controller")
const { signup, login } = require("./controller/user.controller")
const { createFile, fetchFiles, deleteFile, downloadFile } = require("./controller/file.controller")
const { fetchDashboard } = require("./controller/dashboard.controller")
const app = express()

mongoose.connect(process.env.DB)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("view"))
app.use(cors({
  origin:'http://127.0.0.1:5502'
}))

/* Multer Storage */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files")
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop()
    cb(null, uniqueId() + "." + ext)
  }
})

const upload = multer({ storage })

/* Routes */

app.post("/login", login)
app.post("/signup", signup)

app.post("/file", upload.single("file"), createFile)

app.get("/file", fetchFiles)

app.delete("/file/:Id", deleteFile)
app.get('/file/download/:Id',downloadFile)
app.get("/dashboard", fetchDashboard)
app.post('/token/verify',verifyToken)
/* Server */

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port", process.env.PORT || 8080)
})

console.log("redirecting...")
