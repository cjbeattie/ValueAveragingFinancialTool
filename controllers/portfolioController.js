const express = require('express');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Portfolio = require('../models/portfolioModel');
const differenceInMonths = require('date-fns/differenceInMonths');
const differenceInQuarters = require('date-fns/differenceInQuarters');
const differenceInYears = require('date-fns/differenceInYears');
const addMonths = require('date-fns/addMonths');
const addQuarters = require('date-fns/addQuarters');
const addYears = require('date-fns/addYears');
const parseISO = require('date-fns/parseISO');
const _ = require('lodash');


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

    Portfolio.create(
        [
            {
                // 1. Seed category first http://localhost:4000/category/seed
                // 2. Copy your local category IDs into the correct places below
                // 3. Seed these portfolios http://localhost:4000/portfolio/seed
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
        (error, portfolios) => {
            if (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
            }
            res.status(StatusCodes.OK).send({ message: "Seed successful" });
        }
    );
});

// CRUD (OR MORE LIKE RCUD!)

// READ ALL - find all portfolios
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
    Portfolio.find({}).populate('category').exec((error, portfolios) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        console.log("this is the current user:")
        console.log(req.session.currentUser)
        res.status(StatusCodes.OK).send(portfolios);
    });
});

// READ ONE - find one value path
router.get("/:id", isAuthenticatedNormal, (req, res) => {
    Portolio.findById(req.params.id, (error, portfolio) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(portfolio);
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
            const locals = { portfolio: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            // Data from form is valid.
            const formData = req.body; // extract the data from POST
            console.log("form data: ", formData)

            Portfolio.create(formData, (error, formData) => {
                if (error) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                }
                res.status(StatusCodes.CREATED).send(formData);
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
            const locals = { portfolio: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            console.log("got here! req.body is ", req.body)


            // Portfolio.findByIdAndUpdate(
            //     req.params.id, // 1st arg - criteria => id
            //     req.body, // 2nd arg - what to update
            //     // { category: somecategory, tasks: []},
            //     { new: true }, // 3rd arg - { new : true }
            //     // { returnOriginal: false },
            //     (error, portfolio) => {
            //         if (error) {
            //             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
            //         }
            //         console.log("req.body", req.body)
            //         res.status(StatusCodes.OK).send(portfolio);
            //     }
            // );
        }
    }
);

// DELETE
router.delete("/:id", isAuthenticatedAdmin, (req, res) => {
    Portfolio.findByIdAndRemove(req.params.id, (error, portfolio) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(portfolio);
    });
});

module.exports = router;