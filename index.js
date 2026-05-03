const dotenv = require("dotenv")
dotenv.config()
const root = process.cwd()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const multer = require("multer")
const { v4: uniqueId } = require("uuid")


const AuthMiddleware = require("./.vscode/middleware/auth.middleware")
const { verifyToken } = require("./controller/token.controller")
const { signup, login } = require("./controller/user.controller")
const { createFile, fetchFiles, deleteFile, downloadFile } = require("./controller/file.controller")
const { fetchDashbord } = require("./controller/dashbord.controller")
const { shareFile, fetchShared } = require("./controller/share.controller")

const app = express()

mongoose.connect(process.env.DB)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/favicon.ico", (req, res) => res.status(204))
 
/* Routes */
//api endpoint

app.use(express.static("view"))



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


app.post("/api/login", login)
app.post("/api/signup", signup)
app.post("/api/file", AuthMiddleware,upload.single("file"), createFile)
app.get("/api/file",AuthMiddleware,fetchFiles)
app.get("/api/file/:id",AuthMiddleware,deleteFile)
//app.delete("/api/file/:id", AuthMiddleware, deleteFile) 
app.delete("/api/file/:id", deleteFile)
app.get('/api/file/download/:id',downloadFile)
app.get("/api/dashbord", AuthMiddleware,fetchDashbord)
app.post('/api/token/verify',AuthMiddleware, verifyToken)

app.post('/api/share', AuthMiddleware,shareFile)
app.get('/api/share', AuthMiddleware,fetchShared)
/* Server */

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port", process.env.PORT || 8080)
})

console.log("redirecting...")
//Not found
app.use((req,res)=>{
  res.status(400).json({message:'Endpoint not found'})
})