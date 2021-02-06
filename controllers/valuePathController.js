const express = require('express');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const ValuePath = require('../models/valuePathModel');


const router = express.Router();

// Authentication check middleware
// NORMAL
const isAuthenticatedNormal = (req, res, next) => {
    return next();
    // if (req.session && req.session.currentUser) {
    //     return next();
    // } else {
    //     res.status(StatusCodes.FORBIDDEN).send({ error: "forbidden" });
    // }
};
// ADMIN
const isAuthenticatedAdmin = (req, res, next) => {
    return next();
    // if (req.session && req.session.currentUser && req.session.currentUser.isAdmin === true) {
    //     return next();
    // } else {
    //     res.status(StatusCodes.FORBIDDEN).send({ error: "forbidden" });
    // }
};

// Seed database
router.get("/seed", isAuthenticatedAdmin, (req, res) => {

    // let HomeID = List.find({ "name": { $eq: "Home" } }, (err, active) => {
    //     console.log(active);
    //     res.send(active);
    // }

    ValuePath.create(
        [
            {
                // 1. Seed category first http://localhost:4000/category/seed
                // 2. Copy your local category IDs into the correct places below
                // 3. Seed these valuePaths http://localhost:4000/valuepath/seed
                category: "600646412e02284a3b302072",
                tasks: [{
                    description: "Fix window",
                    isCompleted: false,
                },
                {
                    description: "Sweep floors",
                    isCompleted: false,
                }]
            },
            {
                category: "600646412e02284a3b302073",
                tasks: [{
                    description: "Fill out exit tickets",
                    isCompleted: false,
                },
                {
                    description: "Do homework",
                    isCompleted: false,
                }]
            },
        ],
        (error, valuePaths) => {
            if (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
            }
            res.status(StatusCodes.OK).send({ message: "Seed successful" });
        }
    );
});

// CRUD (OR MORE LIKE RCUD!)

// READ ALL - find all valuepaths
// router.get("/", isAuthenticatedNormal, (req, res) => {
//     List.find({}, (error, lists) => {
//         if (error) {
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
//         }
//         res.status(StatusCodes.OK).send(lists);
//     }).populate('category');
// });

// READ ALL - WITH POPULATE
router.get("/", isAuthenticatedNormal, (req, res) => {
    ValuePath.find({}).populate('category').exec((error, valuePaths) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        console.log("this is the current user:")
        console.log(req.session.currentUser)
        res.status(StatusCodes.OK).send(valuePaths);
    });
});

// READ ONE - find one value path
router.get("/:id", isAuthenticatedNormal, (req, res) => {
    ValuePath.findById(req.params.id, (error, valuePath) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(valuePath);
    });
});

// CREATE
router.post(
    "/",
    isAuthenticatedAdmin,
    // body("category", "Min Length of 3").trim().isLength({ min: 3 }),
    // body("score", "Must be a number").trim().isNumeric().isLength({ max: 3 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Errors are returned in an array using `errors.array()`.
            const locals = { valuePath: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            // Data from form is valid.
            const valuePath = req.body; // extract the data from POST
            console.log(valuePath)
            ValuePath.create(valuePath, (error, valuePath) => {
                res.status(StatusCodes.CREATED).send(valuePath);
            });
        }
    }
);

// UPDATE
router.put(
    "/:id",
    isAuthenticatedAdmin,
    // body("name", "Min Length of 3").trim().isLength({ min: 3 }),
    // body("score", "Must be a number").trim().isNumeric().isLength({ max: 3 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Errors are returned in an array using `errors.array()`.
            const locals = { valuePath: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            ValuePath.findByIdAndUpdate(
                req.params.id, // 1st arg - criteria => id
                req.body, // 2nd arg - what to update
                // { category: somecategory, tasks: []},
                { new: true }, // 3rd arg - { new : true }
                // { returnOriginal: false },
                (error, valuePath) => {
                    if (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                    }
                    console.log("req.body", req.body)
                    res.status(StatusCodes.OK).send(valuePath);
                }
            );
        }
    }
);

// DELETE
router.delete("/:id", isAuthenticatedAdmin, (req, res) => {
    ValuePath.findByIdAndRemove(req.params.id, (error, valuePath) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(valuePath);
    });
});

module.exports = router;