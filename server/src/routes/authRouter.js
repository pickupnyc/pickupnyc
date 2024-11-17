import express from "express";
import passport from "passport";
import "../config/dotenv.js";

const router = express.Router();

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({ success: true, user: req.user });
    } else {
        res.redirect("/api/auth/login/failure");
    }
});

router.get("/login/failure", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Authentication failed. Please try again.",
    });
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie("connect.sid");
            res.redirect(process.env.CLIENT_URL);
        });
    });
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: "/api/auth/login/failure",
    }),
);

export default router;
