import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;

    try {
        const checkEmail = await User.exists({email});

        if(checkEmail) return res.status(401).json({message : 'Email already exist.'})
            
        const hash = bcrypt.hashSync(password, 5);

        await User.create({
            first_name,
            last_name,
            email,
            password : hash
        })

        return res.status(201).json({message : `User ${first_name} has been created !`})

    } catch (error) {
        return res.status(500).json({message : 'Internal Server error.'})
    }
}

export const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        const checkEmail = await User.findOne({email});

        if(!checkEmail) return res.status(404).json({message : `Email or password is invalid`});

        const verifyPassword = await bcrypt.compare(password, checkEmail.password);

        if(!verifyPassword) return res.status(404).json({message : `Email or password is invalid`});

        const token = jwt.sign({id: checkEmail._id}, JWT_SECRET);

        return res.status(200).json({token : token});
    } catch (error) {
        return res.status(500).json({message : 'Internal Server error.'})
    }

}
