const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const cookieParser = require("cookie-parser");
const path = require('path')
const authRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const chatRoute = require('./routes/chatRoute')


require("dotenv").config();

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  })
);

app.use('/api/auth',authRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/post',postRoute)
app.use('/api/chat',chatRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));