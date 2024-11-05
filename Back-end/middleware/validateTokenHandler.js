const asyncHandler = require("express-async-handler")
const jwt = require ("jsonwebtoken")

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; 
        }

    if (!token) {
        res.status(401)
        throw new Error("token not present in request ");    
    }

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if (err) {
                res.status(401);
                throw new Error("userrr is not authorized")
                
            }
        req.userAvailable=decoded.userAvailable;
            next();
        });
    }  
)

module.exports= validateToken;