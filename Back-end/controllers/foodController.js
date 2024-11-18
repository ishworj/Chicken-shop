const asyncHandler = require("express-async-handler");
const product = require("../models/product-model");
// @desc create a food
//@route Post /api/food
//@access private
const createFood =asyncHandler( async(req, res) => {
        const { name, description, price, image,category } = req.body;
        if (!name || !description || !price || !image) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const food =  await product.create({
            name,
            description,
            price,
            image,
            category
        })
        res.status(201).json(food);
});


// @desc Get all food
//@route get /api/food
//@access public 
const getFood = asyncHandler (async(req,res) => {
    const food = await product.find();
    res.status(200).json(food);
})

// @desc Get one foodds
//@route GET /api/food/:id
//@access public 
const getOneFood =asyncHandler( async(req,res) => {
   const id=req.params.id;
    if(!id){
        res.status(400);
        throw new Error("id missing");
    }
    const food = await product.findById(id);
    if (!food) {
        res.status(404);
        throw new Error("food not found");  
    }
    res.status(200).json(food);
})

// @desc update one food
//@route PUT /api/food/:id
//@access private 
const updateFood =asyncHandler( async(req,res) => {
    const id=req.params.id;
    const food = await product.findById(id);
    if (!food) {
        res.status(404);
        throw new Error("food not found");  
    }

    const updatedFood = await product.findByIdAndUpdate(
        id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedFood);
})

// @desc delete one food
//@route DELETE /api/food/:id
//@access private 
const deleteFood =asyncHandler (async (req,res) => {
    const id=req.params.id;
    const food = await product.findById(id);
    if (!food) {
        res.status(404);
        throw new Error("food not found");  
    }

    const deletedFood = await product.findByIdAndDelete(id)
    res.status(200).json(deletedFood);
})


module.exports={getFood, getOneFood, createFood , updateFood, deleteFood}