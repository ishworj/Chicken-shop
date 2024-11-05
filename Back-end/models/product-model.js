const  mongoose  = require("mongoose");


const productSchema =  mongoose.Schema({
    name: {
        type : String,
        required : [true , "Please add the product name"]
    },
    description: {
        type : String,
        required : [true , "Please add the description "]
    },
    price: {
        type : String,
        required : [true , "Please add the price "]
    },
    image: {
        type: String, // URL of the image, or path if storing locally
        required: [true, "Please add the image URL"]
    },category: {
        type: String,
        immutable: false, // Ensure this is set to false, or remove this line if it exists
    }
},
{
    timestamps:true
} )

module.exports = mongoose.model("product",productSchema)
