const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL } = process.env;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((error) => console.log(error));

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

