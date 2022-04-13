import bcrypt from 'bcrypt' 
import { UserModel } from '../../models/User.js' 
import { Router } from "express" 

const router = Router()
//REGISTER
const handleSignup = async (req, res) => {
  try { 
    //generate new password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};



router.post("/userlogin", handleLogin)
router.post("/signup", handleSignup)

export default router