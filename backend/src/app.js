import dotenv from "dotenv";
import express from "express";

import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';
import { dbconnect } from "./utils/db.js";

// import { isLoggedInCheck } from "./middlewares/auth.js";

// Routers
import userRouter from "./routes/user.js";
import complaintRouter from "./routes/complaint.js";


// Load environment variables
if (process.env.NODE_ENV !== "development") {
    dotenv.config();
}

const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Connection
dbconnect(MONGODB_URI);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// app.use(isLoggedInCheck);
// import cors from "cors";  
import cors from "cors";
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));



// Routes
app.get("/api", (req, res) => {
    if (!req.user) {
        return res.json({ user: null })
    }
    return res.json({ user: req.user });
});


app.use("/api/user", userRouter);
app.use("/api/complaint", complaintRouter);


// error middleware
app.use((err, req, res, next) => {
    console.log(err);
    const { status = 500, message } = err;
    res.status(status).send({ error: message, status: status });
});


// Start Server
app.listen(port, () => {
    console.log(`Interns app listening on port ${port}`);
});
