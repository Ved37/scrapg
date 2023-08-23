const router = require("express").Router();
// const { response } = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware"); 
//new user registration this is an api

router.post("/register", async (req, res) => {
  //calback function will always be async
  try {
    //part 1 check if user already exists
    const user = await User.find({ email: req.body.email });
    if (user.length) {
      throw new Error("User already exists");
    }
    //part 2 if user does not exists, Hash the password

    const salt = await bcrypt.genSalt(10); //10 is the number of rounds
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword; //replacing the hashed password with the original password

    //part 3 save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    //part 1 user does not exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    //if user's status is active or not
    if(user.status !== "active"){
      throw new Error("The user account is blocked, please contact admin");
    }
    //part 2 compare password
    const validpassword =await bcrypt.compare(
      //.compare is an inbuild method of bcrypt
      req.body.password,
      user.password
    );
    if (!validpassword) {
      throw new Error("Invalid password");
    }
    //in login we have to send token to then client then only we can login
    //create and assign token
      const token = jwt.sign({ userId: user._id }, process.env.jwt_secret , {expiresIn: "1h"}); //we are encrypting the user id
      //send response
      res.send({
        success: true,
        message: "User logged in successfully",
        data: token,
      });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// protected apis- related to middleware
//get current user

router.get("/get-current-user",authMiddleware,async(req,res)=>{
  try {
    const user=await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user, 
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
})

//get-all-users
router.get("/get-users",authMiddleware,async(req,res)=>{
  try {
    const users=await User.find();
    res.send({
      success:true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({
        success: false,
        message: error.message,
      });
  }
});

//update user status

router.put("/update-user-status/:id",authMiddleware,async(req,res)=>{
  try {
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;

//change password
router.post('/change-password',authMiddleware, async (req,res)=>{
  try {
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!validPassword) {
      throw new Error('Current password is incorrect');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.newpassword, salt);
    user.password = hashedNewPassword;
    await user.save();
    res.send({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
})