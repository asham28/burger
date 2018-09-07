// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");
require("dotenv").config();


//Dependencies 
var express = require("express");
var router = express.Router();


// Create  routes and logic within those routes 
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burger: data
        };
        // console.log("\nHBSOBJECT " , hbsObject);
        res.render("index", hbsObject)
    });
});

// INSERT NEW BURGER INTO DATABASE
router.post("/burgers", function (req, res) {
    burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {
            res.redirect("/");
    });
});

// UPDATE BURGER: DEVOURED CHANGED TO TRUE
router.post("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("Condition: ", condition);

    burger.updateOne({
            devoured: true
        },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                //if no rows were changed, then no ID, so 404
                return res.status(404).end();
            }
            res.redirect("/");
        }
    );
});


// Export routes for server.js to use.
module.exports = router;
