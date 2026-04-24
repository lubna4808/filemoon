const dotenv = require("dotenv")
dotenv.config()
const root = process.cwd()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const multer = require("multer")
const { v4: uniqueId } = require("uuid")
const cors = require("cors")

const { verifyToken } = require("./controller/token.controller")
const { signup, login } = require("./controller/user.controller")
const { createFile, fetchFiles, deleteFile, downloadFile } = require("./controller/file.controller")
const { fetchDashbord } = require("./controller/dashbord.controller")
const { shareFile } = require("./controller/share.controller")
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

//Ui endpoint
const getPath = (filename)=>{
   return path.join (root,"view",filename)
}
app.get("/signup",(req,res)=>{
 const p = getPath("signup.html")
  res.sendFile(p)
})

app.get("/login",(req,res)=>{
 const p = getPath("index.html")
  res.sendFile(p)
})

app.get("/",(req,res)=>{
 const p = getPath("index.html")
  res.sendFile(p)
})

app.get("/dashbord",(req,res)=>{
 const p = getPath("/app/dashbord.html")
  res.sendFile(p)
})
app.get("/history",(req,res)=>{
 const p = getPath("app/history.html")
  res.sendFile(p)
})
app.get("/files",(req,res)=>{
 const p = getPath("app/files.html")
  res.sendFile(p)
})

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

const upload = multer({ storage:storage,
  limits:{
    fileSize :200 * 1000 * 1000
  }

 })

/* Routes */
// kaam kr raha hu ruko thoda
//api endpoint
app.post("/api/login", login)
app.post("/api/signup", signup)
app.post("/api/file", upload.single("file"), createFile)
app.get("/api/file", fetchFiles)
app.delete("/api/file/:id", deleteFile)
app.get('/api/file/download/:id',downloadFile)
app.get("/api/dashbord", fetchDashbord)
app.post('/api/token/verify',verifyToken)
app.post('/api/share',shareFile)
/* Server */

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port", process.env.PORT || 8080)
})

console.log("redirecting...")
//console.log("PATH:", getPath("app/dashbord.html"))