const { json } = require("express");
const express = require("express");
const { rawListeners } = require("../app");
const { count, update } = require("../models/country");
const router = express.Router();
const Country = require("../models/country");
const State = require("../models/states");
//create a country
router.post("/", async (req, res) => {
  try {
    let country = await Country.create(req.body);
    console.log(typeof req.body.population);
    res.status(202).json(country);
  } catch (err) {
    res.json(err);
  }
});

// get all the countries in the ascending order
router.get("/ascending", async (req, res) => {
  try {
    let coutryinAsc = await Country.aggregate([{ $sort: { name: 1 } }]);
    res.status(202).json(coutryinAsc);
  } catch (err) {
    res.json(err);
  }
});

// get all the countries in the decending order
router.get("/decending", async (req, res) => {
  try {
    let coutryinDec = await Country.aggregate([{ $sort: { name: -1 } }]);
    res.status(202).json(coutryinDec);
  } catch (err) {
    res.json(err);
  }
});

// update a country
router.put("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updatecountry = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(202).json(updatecountry);
  } catch (err) {
    res.json(err);
  }
});
// delete a coutry document
router.put("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deletecountry = await Country.findByIdAndDelete(id);
    res.status(202).json(deletecountry);
  } catch (err) {
    res.json(err);
  }
});

// add a state
router.post("/state", async (req, res) => {
  try {
    let countryname = req.body.countryname;
    let country = await Country.findOne({ name: countryname });
    req.body.country = country._id;
    let state = await State.create(req.body);
    let updatecountry = await Country.findByIdAndUpdate(
      country._id,
      {
        $push: { states: state._id },
      },
      { new: true }
    );
    res.status(202).json(state);
  } catch (err) {
    res.json(err);
  }
});

// list all states for a country in ascending/descending order
router.get("/:countryname/states/ascending", async (req, res) => {
  try {
    let countryname = req.params.countryname;
    console.log(countryname);
    let statesinAscending = await State.aggregate([
      { $match: { countryname: countryname } },
      { $sort: { name: 1 } },
    ]);
    res.status(202).json(statesinAscending);
  } catch (err) {
    res.json(err);
  }
});
// list all states in an ascending order of their population
router.get("/:countryname/states/decending", async (req, res) => {
  try {
    let countryname = req.params.countryname;
    console.log(countryname);
    let statesinDecending = await State.aggregate([
      { $match: { countryname: countryname } },
      { $sort: { name: -1 } },
    ]);
    res.status(202).json(statesinDecending);
  } catch (err) {
    res.json(err);
  }
});

// db.users.aggregate([{$match : {gender : "female" , tags :"amet"}} ,{$group : {_id : '$gender' , count : {$sum : 1}}}])

// list countries based on religions.
router.get("/religions", async (req, res) => {
  try {
    let allcoutry = await Country.aggregate([
      { $group: { _id: "$ethinicity" } },
    ]);
    res.status(202).json(allcoutry);
  } catch (err) {
    res.json(err);
  }
});
// list countries based on continent.
router.get("/continents", async (req, res) => {
  try {
    let allcoutry = await Country.aggregate([
      { $group: { _id: "$continent" } },
    ]);
    res.status(202).json(allcoutry);
  } catch (err) {
    res.json(err);
  }
});
// list countries based on population.
router.get("/population", async (req, res) => {
  try {
    let allcoutry = await Country.aggregate([
      { $group: { _id: "$populations" } },
    ]);
    res.status(202).json(allcoutry);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;