const ensureSignup = (req, res, next) => {
    const user = req.user;
    if (user.role == 0 || user.role == 1) {
        return next();
    }
    res.redirect("http://localhost:3000/signup");
}

const ensureNewUser = (req, res, next) => {
    const user = req.user;
    if (!(user.role == 0 || user.role == 1)) {
        return next();
    }
    res.redirect("http://localhost:3000/dashboard");
}

const ensureCreator = (req, res, next) => {
    const user = req.user;
    if (user.role === 0) return next();
    res.redirect("http://localhost:3000/dashboard");
}
module.exports = {
    ensureSignup,
    ensureNewUser,
    ensureCreator,
}