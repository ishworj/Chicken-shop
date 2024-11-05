const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")
const user = require("../models/user-model");
// @desc Register the user
//@route get /api/users/register
//@access public 
const registerUser = asyncHandler (async(req,res)=>{
    const {username , email, password}= req.body;
    if (!username || !email || !password) {
        res.status(404);
        throw new Error("All fields are mandatory");  
    }

    const userAvailable = await user.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered");  
    }

    // hash pasword
    const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword)
    const newUser = await user.create({
        username,
        email,
       password:hashedPassword
    });
    if (newUser) {
        res.status(201).json({id:newUser.id,email:newUser.email})
    }else{
        res.status(400);
        throw new console.error("user data was not valid");
    }
})

// @desc login the user
//@route get /api/users/login
//@access public 
const loginUser = asyncHandler( async(req,res)=>{
    const {email , password}= req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandarory");    
    }

    const userAvailable = await user.findOne({email});
    //compare password with hashedpaswprd
    
    if(userAvailable && (bcrypt.compare(password,userAvailable.password))){
        // CREATING ACCESS TOKEn USING jwt.SIGN METHoD (PAYLOAD , SECRET,expriationtme)
        const accessToken = jwt.sign({
            userAvailable:{
                username: userAvailable.username,
                email: userAvailable.email,
                id : userAvailable.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "5m"}
    );

    res.status(200).json({accessToken});    

    }else{
        res.status(401);
        throw new Error("email or passwprd is not valid");  
    }
    });

// @desc current the user data info
//@route get /api/users/current
//@access private
const currentUser = asyncHandler (async(req,res)=>{
    res.json(req.userAvailable)
})

module.exports={registerUser,loginUser,currentUser}