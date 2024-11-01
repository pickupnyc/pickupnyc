import "../config/dotenv.js";

export default function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`${process.env.CLIENT_URL}/login`);
}
