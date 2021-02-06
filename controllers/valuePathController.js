const express = require('express');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const ValuePath = require('../models/valuePathModel');
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
            const formData = req.body; // extract the data from POST
            console.log("form data: ", formData)

            // ********** CALCULATE VALUE PATH *****************
            const investmentGoal = parseInt(formData.investmentGoal);
            const endDate = parseISO(formData.endDate);
            const startDate = parseISO(formData.startDate);
            const cycle = formData.cycle;
            const r = parseFloat(formData.r);
            const g = parseFloat(formData.g);
            const currency = formData.currency;
            const currentValue = parseFloat(formData.currentValue);


            // calculate R
            const R = (r + g) / 2
            console.log("R: ", R)

            // calculate n

            let periodsToGo_n = null;
            if (cycle === "Monthly") {
                periodsToGo_n = differenceInMonths(endDate, startDate)
            } else if (cycle === "Quarterly") {
                periodsToGo_n = differenceInQuarters(endDate, startDate)
            } else if (cycle === "Annually") {
                periodsToGo_n = differenceInYears(endDate, startDate)
            } else {
                return res.status(StatusCodes.BAD_REQUEST).send("Invalid cycle");
            }

            // calculate T
            const finalPeriod_T = periodsToGo_n / (1 - (1 + R) ** periodsToGo_n * currentValue / investmentGoal);

            // calculate t
            const timeIndexNow_t = finalPeriod_T - periodsToGo_n;

            // calculate $C
            const C = investmentGoal / (finalPeriod_T * (1 + R) ** finalPeriod_T);

            // calculate value path

            const path = [];

            for (let i = 0; i <= periodsToGo_n; i++) {
                // calculate value for this period
                const index = i + timeIndexNow_t;
                const targetAmount = Math.round(C * index * (1 + R) ** index);

                // calculate date for this period
                let periodDate = null;// start date + index * number of months/quarters/years
                if (cycle === "Monthly") {
                    periodDate = addMonths(startDate, i)
                } else if (cycle === "Quarterly") {
                    periodDate = addQuarters(startDate, i)
                } else if (cycle === "Annually") {
                    periodDate = addYears(startDate, i)
                }

                // construct the object for that period
                periodObject = {
                    cycleDate: periodDate,
                    cycleValue: targetAmount
                }

                // construct the object for that period and add to path array
                path.push(periodObject)
            }

            const parsedFormData = {
                investmentGoal: investmentGoal,
                endDate: endDate,
                startDate: startDate,
                cycle: cycle,
                r: r,
                g: g,
                currency: currency,
                currentValue: currentValue,
            };

            const calculatedVariables = {
                R: R,
                finalPeriod_T: finalPeriod_T,
                timeIndexNow_t: timeIndexNow_t,
                C: C,
            }

            const finalData = _.clone(parsedFormData);
            finalData.valuePath = path;

            // adjustedData.valuePath = path;
            console.log("parsedFormData: ", parsedFormData)
            console.log("calculatedVariables: ", calculatedVariables)
            console.log("Final data: ", finalData);

            ValuePath.create(finalData, (error, finalData) => {
                if (error) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                }
                res.status(StatusCodes.CREATED).send(finalData, parsedFormData, calculatedVariables);
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