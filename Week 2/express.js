// load the environment variables from the .env file
const dotenv = require("dotenv").config(); 
// check if the environment variables are loaded
if (dotenv.error) {
    console.log("Error loading .env file");
}

// import express and mongoose
const express = require("express");
const mongoose = require("mongoose");

// export routes
const userRoute = require("./routes/users");

const app = express();
// parse in the incoming json;
app.use(express.json());

app.use("/users", userRoute);

// connect to mongo db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
    // start the server
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.get("/", (req, res) => {
    res.send(`Coding in Node and getting bitches!!!`);
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});