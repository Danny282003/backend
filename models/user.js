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
    }
}, {timeStamps: true})

const User = mongoose.model('user', userSchema)

export default User