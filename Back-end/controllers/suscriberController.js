
const asyncHandler = require("express-async-handler")
const suscribers = require("../models/suscribe-model")
// @desc suscribe the users
//@route post /api/suscribers
//@access public 

const addSuscriber = asyncHandler(async(req,res) => {
    const {firstName , lastName , email}= req.body;

    if (!firstName || !lastName || !email) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const result = await suscribers.create({
        firstName,
        lastName,
        email
    });

    res.status(201).json(result)

})


// @desc get the suscribers 
//@route get /api/suscribers
//@access public ----------------willbe private 

const getSuscriber = asyncHandler(async(req,res) => {
    const result = await suscribers.find();
    res.status(200).json(result)


})


const findEmails = asyncHandler(async(req,res) => {
    const result = await suscribers.find({}, { email: 1, _id: 0 });
    const emails = result.map(subscriber => subscriber.email);

    return emails;
})


     

module.exports={addSuscriber , getSuscriber,findEmails}