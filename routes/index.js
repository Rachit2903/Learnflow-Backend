const { Router } = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Post = mongoose.model("posts");

const { ensureAuth, ensureGuest } = require("../middleware/auth")
const { ensureNewUser, ensureSignup } = require("../middleware/user");


const router = new Router;




router.patch("/user/update/role", ensureAuth, async (req, res) => {
    try {
        console.log('hi');
        const { role } = req.body;
        console.log("role ", role);
        const user = req.user;
        console.log(user);
        user.role = Number(role);
        await user.save();
        res.status(200).send({ message: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "something went wrong",
        })
    }
})

router.get("/login", (req, res) => {

    if (req.isAuthenticated()) {
        const user = req.user;
        if (user.role == 0 || user.role == 1) {
            res.json({ isLogin: true, isSignup: true });
        }
        else {
            res.json({ isLogin: true, isSignup: false });
        }
    }
    else {
        res.json({ isLogin: false });
    }
})


module.exports = router;