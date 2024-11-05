const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");


connectDb();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());



app.use("/api/food",require("./routes/foodRoutes"))
app.use("/api/users",require("./routes/userRoutes"))

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server  running on http://localhost:${port}`);
});


