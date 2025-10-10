import User from "../models/user.js";

const createUser = async(req,res)=>{
    try{
        let {fullName, email, password} = req.body;

        await User.create({
            fullName,
            email,
            password
        });

        res.status(201).json({message: "User created successfully!"})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export {
    createUser
}