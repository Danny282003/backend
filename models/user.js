import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
}, {timeStamps: true})


const User = mongoose.model('user', userSchema)

export default User