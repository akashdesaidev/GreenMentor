const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db")
const { UserModel } = require("./models/userModel");
const { Authenticate } = require('./middleware/Authenticate');
const { router } = require('./routes/taskRoutes');

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send(`Base API endpoint !!!`);
})

app.post("/signup", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            await UserModel.create({ name, email, password: hash });
            res.send({ message: "User signed up successfully ..." });
        });
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//         res.send({ message: "Signup first" });
//     }
//     const hashed_password = user?.password;
//     bcrypt.compare(password, hashed_password, async function (err, result) {
//         if (result) {
//             const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN);
//             res.send({ message: "Login successfull", token: token })
//         } else {
//             res.send({ message: "Login failed" });
//         }
//     });
// })

app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Signup first" });
        }
console.log(user)
        const hashedPassword = user.password;

        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (result) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN);
                return res.json({ message: "Login successful", token });
            } else {
                return res.status(401).json({ message: "Login failed" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.use(Authenticate);

app.use("/tasks", router);

app.listen(PORT, async() => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on port ${PORT}`);
})