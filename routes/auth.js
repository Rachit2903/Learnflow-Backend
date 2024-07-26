const { Router } = require("express");
const passport = require("passport");
const { ensureAuth } = require("../middleware/auth");
const { ensureSignup } = require("../middleware/user");

const router = new Router;

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
}),
    (req, res) => {
        const user = req.user;
        console.log(user);
        if (user.role != 0 && user.role != 1) {
            res.redirect("http://localhost:3000/signup");
        } else {
            res.redirect("http://localhost:3000/dashboard");
        }
    }
)

router.get("/success", ensureAuth, ensureSignup, async (req, res) => {
    res.status(200).json({ message: "user Login", user: req.user })
})

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:3000")
    })
})

module.exports = router;