import express from "express"
import { config } from "dotenv"
config()
const app = express()
const port = process.env.PORT || 4000
import cors from "cors"
import multer from "multer"
import crypto from "crypto"
import mongoose from "mongoose"
import { createUser } from "./controllers/userController.js"

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
app.listen(port, ()=>{
    console.log('MongoDB connected successfully')
    console.log(`server is running on port: ${port}`)
})
})
.catch((err)=> console.log('Error while connecting to database', err))

app.post('/api/user', createUser)
// const path = require('path')
// const fs = require('fs')

// app.use(express.urlencoded({
//     extended: false,
//     limit: 10000,
//     parameterLimit: 3,
// }))

// app.use(cors())

// const storage = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null, __dirname + '/files')
//     },
//     filename: function (req, file, callback) {
//         const filename =  `file_${crypto.randomUUID()}`;
//         callback(null, filename)
//     }
// })
// const upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 1048576,
//     },
//  })

// app.post('/upload', upload.any(), (req, res)=>{
//     console.log(req.body)
//     res.status(200).send('Data receieved')
  
// })
