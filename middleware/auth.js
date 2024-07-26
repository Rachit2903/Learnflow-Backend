const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log("unauth")
        res.status(401).send({ message: "Unauthorized" });
    }
}

const ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("http://localhost:3000/dashboard")
    }
    next();
}

module.exports = {
    ensureAuth,
    ensureGuest,
}