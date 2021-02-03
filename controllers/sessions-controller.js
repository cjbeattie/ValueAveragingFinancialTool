const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");
const { StatusCodes } = require("http-status-codes");
// const { reset } = require("nodemon");

// on sessions form submit (log in)
sessions.post("/", (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "Oops, there's a problem with the database" });
        } else if (!foundUser) {
            res.status(401).send({ error: "Sorry, no user found" });
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.status(200).send(foundUser);
            } else {
                res.status(401).send({ error: "Password doesn't match" })
            }
        }
    });
});

sessions.get('/', (req, res) => {
    res.send({ currentUser: req.session.currentUser })
    // res.send(req.session.currentUser)

    console.log(req.session.currentUser)
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid", { path: "/" });
        res.status(StatusCodes.OK).send({ msg: "Logging out" });
    });
});

module.exports = sessions;
