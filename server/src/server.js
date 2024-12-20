import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import path from "path";
import configurePassport from "./config/passport.js";

import authRoutes from "./routes/authRouter.js";
import pickupRoutes from "./routes/pickupRoutes.js";
import pickupParticipantRoutes from "./routes/pickupParticipantsRouter.js";
import postRoutes from "./routes/postsRouter.js";

dotenv.config();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"));
}

app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        cookie: {
            // secure means an HTTPS connection is required, must be used in production
            secure: process.env.NODE_ENV === "production" ? true : "auto",
            sameSite: "lax",
            maxAge: 3600000, // 1 hour
            httpOnly: true,
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

app.use("/api/pickup", pickupRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/participants", pickupParticipantRoutes);

if (process.env.NODE_ENV === "production") {
    app.get("/*", (_, res) => {
        res.sendFile(path.resolve("public", "index.html"));
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server is listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});
