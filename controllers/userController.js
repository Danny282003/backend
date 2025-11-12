import User from "../models/user.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

const createUser = async(req,res)=>{
    try{
        let {fullName, email, password} = req.body;
       
        // All fields must be filled
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        //If email is already in the data base return error
        let checkEmail = await User.findOne({email});
        if(checkEmail) {
            return res.status(400).json({message: "User Already exists"})
        }
        
        // Hashing password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)


        await User.create({
            fullName,
            email,
            password: hashPassword
        });
        
        res.status(201).json({message: "User created successfully!"})

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000,
    });

    const welcomeMail = `
        <div>
            <h1>Welcome to Chef's Page</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et a aperiam repellat tenetur dolor quidem saepe nisi molestias quibusdam omnis quisquam praesentium ratione, corrupti eius illum est incidunt rerum?
            </p>
        <div>
    `;

    try {
      await transporter.sendMail({
        from: `"Chef Code" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🚨 Welcome Email",
        html: welcomeMail,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    };
}

const login = async (req,res)=>{
  try {
    let {email, password} = req.body; 
    console.log(req.body)

    let checkEmail = await User.findOne({email});

    if (!checkEmail) {
      return res.status(400).json({message:"user does not exists"});
    }

    let checkPassword = await bcrypt.compare(password, checkEmail.password);

    if (!checkPassword) {
      return res.status(400).json({message: "incorrect password."})
    }

    let token = jwt.sign({id: checkEmail._id, role: checkEmail.role}, process.env.SECRETKEY, {expiresIn:"1hr"})
    
    res.cookie('token', token,{
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE.ENV === "production",
      expires: new Date(Date.now()+ 360000), // 1 hour
    })

    res.status(200).json({message:"Login successful!"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
 // Get all data in the database
const allUsers = async (req, res) =>{
     try {
    let users = await User.find();
     if(!users) {
          return res.status(404).json({message: 'No user Found'})
         }
        res.status(200).json(users)
         } catch (e) {
                console.log(e);
                res.status(500).json({message: "Internal server error"})
            }
        }

        // To delete data 
        const deleteUser = async(req, res)=>{
            try{
                let { id } = req.params;
                let del = await User.findByIdAndDelete(id);

                if(!del) {
                    res.status(400).json({message: 'User not found'})
                }
                res.status(200).json({message: "User successfully deleted"})
            } catch (e) {
                console.log('Unable to delete User')
                res.status(500).json({message: "Internal Server error"})
            }
        }

        // To update User Information
        const updateUser = async (req, res)=> {
            try{
                let { id } = req.params;
                let updatedData = req.body

                let user = await User.findByIdAndUpdate(id, updatedData, { new: true })
                if(!user) {
                    return res.status(400).json({message: "User not found"})
                }
                res.status(200).json({message: "User info successfully updated"})
            } catch(e) {
                console.log(e)
                res.status(500).json({message: "Internal server Error"})
            }
        }

        const forgotPassword = async(req, res)=>{
          try{
            let { email } = req.body;
         

            let checkEmail = await User.findOne({email});

            if(!checkEmail) {
              return res.status(400).json({message: "Email does not exists"})
            };

            let resetToken = jwt.sign({id:checkEmail._id}, process.env.SECRET_KEY, {expiresIn:"5m"});

            let resetLink = `http://localhost:5173/reset-password/${resetToken}`;

            const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000,
    });

    const welcomeMail = `
        <div>
            <h1>RESET PASSWORD</h1>
            <p> Please on the link below to reset your password
            </p>
            <a href="${resetLink}">Reset Password Link</a>
        <div>
    `;

    try {
      await transporter.sendMail({
        from: `"Biggie's Code" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🚨 Welcome Email",
        html: welcomeMail,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    res.status(200).json({message: "Reset link Successfully sent"})


          } catch(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error in forgotPassword"})
          }
        }

export {
    createUser,
    allUsers,
    deleteUser,
    updateUser,
    login,
    forgotPassword
}