const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path")


connectDb();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../Front-end')));

// Handle GET request for the root route and serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Front-end/pages', 'index.html'));
});

// Serve cart.html page when accessing /cart (without the .html extension)
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../Front-end/pages', 'cart.html'));
});

app.get('/user',(req,res)=>{
  res.sendFile(path.join(__dirname, '../Front-end/pages', 'user.html'))
})

app.get('/admin',(req,res)=>{
  res.sendFile(path.join(__dirname,"../Front-end/pages",'admin.html'))
})

app.use("/api/food",require("./routes/foodRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/suscribers",require("./routes/suscriberRoutes"))

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server  running on http://localhost:${port}`);
});




