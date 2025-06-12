import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function generateToken(userId){
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
}

//public
async function registerUser(req, res){
   try{
        const {name, email, password, profileImageUrl} = req.body;
    
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "User Already Exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });

   }
   catch(error){
        res.status(500).json({messsage: "Server error", error: error.message});
   }


}

//public
async function loginUser(req, res) {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(500).json({message: "Invalid Email or Password"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).json({message: "Invalid Email or Password"});
        }
    
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)

        })
    
    
    }
    catch(error){
        res.status(500).json({messsage: "Server error", error: error.message});
    }


}

//private
async function generateProfile(req, res){
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({messsage: "Server error", error: error.message});
    }



}

export {registerUser, loginUser, generateProfile}
