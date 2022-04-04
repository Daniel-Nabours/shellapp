import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../../models/User'

const router = Router()

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(31);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
const handleLogin = async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !user || !validPassword && res.status(404).json("incorrect login information"); 

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}


router.post("/login", handleLogin);
router.post("/signup", handleSignup);

export default router