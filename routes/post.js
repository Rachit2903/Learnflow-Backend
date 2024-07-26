const { Router } = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const { ensureAuth } = require("../middleware/auth");
const { ensureSignup, ensureCreator } = require("../middleware/user");

const Post = mongoose.model("posts");
const User = mongoose.model("users");
const Comment = mongoose.model("comments")

const router = new Router();
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ posts: posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }

})


router.post("/create", ensureAuth, ensureSignup, ensureCreator, async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body,
            userId: req.user._id,
        });
        console.log(post);
        res.status(201).send({
            id: post._id,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Something went wrong",
        })
    }
})

router.get("/view/:postId", async (req, res) => {
    try {

        const postId = req.params.postId;

        const post = await Post.findById(postId);
        if (!post) {
            res.redirect("/post-not-found");
        }
        const userId = post.userId;

        const author = await User.findById(userId);

        const postDate = moment(post.createdAt).format("dddd, MMMM Do YYYY");

        const commentList = await Comment.find({ postId, depth: 1 });
        const user = req.user;
        res.status(200).json({ post, postDate, author, commentList, user });


    } catch (error) {
        console.log(error);
        res.redirect("/internal-server-error");
    }
});

module.exports = router;