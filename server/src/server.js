import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import configurePassport from "./config/passport.js";

import authRoutes from "./routes/authRouter.js";
import pickupRoutes from './routes/pickupRoutes.js';

dotenv.config();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3600000, // 1 hour
        },
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

// Routes
app.use("/api/auth", authRoutes);

app.use('/api/pickup', pickupRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server is listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});
