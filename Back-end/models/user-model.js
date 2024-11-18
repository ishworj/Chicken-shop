const mongoose = require ("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required : [true, " pLEASE ADDE THE USER NAME"]
    },
    email:{
        type: String,
        required : [true, " pLEASE ADDE THE user email address"],
        unique : [true,"Emai; address already taken"]
        
    },
    password:{
        type: String,
        required : [true, " please add user password"]
    },
    subscribeStatus:{
        type:Boolean,
        required :[false]
    }
},
{timestamps: true}
)

module.exports= mongoose.model("user",userSchema)