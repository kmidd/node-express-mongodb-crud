"use strict";

// https://expressjs.com/en/guide/routing.html

const express = require("express");
const router = express.Router();
const db = require("mongodb");

router.get("/", function (req, res, next) {
  req.db
    .collection("todo")
    .find({})
    .sort({ doByDate: 1 })
    .toArray(function (err, result) {
      if (err) {
        req.flash("error", err);
        res.render("index", {
          title: "To do List",
          data: "",
        });
      } else {
        res.render("index", {
          title: "To Do List",
          data: result,
        });
      }
    });
});

router.post("/", function (req, res, next) {
  req.db.collection("todo").insertOne(
    {
      task: req.body.task,
      doByDate: req.body.doByDate,
      description: req.body.description,
      status: "TODO"
    },
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );

  res.redirect("/");
});

router.post("/done/:todoId", function (req, res, next) {
  
  req.db.collection("todo").updateOne(
    { _id: db.ObjectId(req.params.todoId) },
    { $set: {
      status: "DONE"
    }},
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
  res.sendStatus(200);
});

module.exports = router;
