const router = require("express").Router();
const City = require("../db/click");
const moroccoCities = require("../cities");

router.get("/", async (req, res) => {
  try {
    res.render("home", { cities: moroccoCities });
  } catch (err) {
    res.json({ error: "Oops!! we can't load the cities." });
  }
});

router.post("/city", async (req, res) => {
  try {
    const userCity = await City.findOne({ cityName: req.body.cityName });
    if (userCity) {
      res.json({
        msg: "the city already exists",
        type: "success",
        userCityIs: req.body.cityName,
      });
    } else {
      await City.create({ cityName: req.body.cityName });
      res.json({
        msg: "successfully city created",
        userCityIs: req.body.cityName,
      });
    }
  } catch (err) {
    res.json({ msg: err.message });
    console.log(err);
  }
});

router.post("/playTheGame", async (req, res) => {
  res.json({ msg: "got message", redirect: "/play" });
});

router.get("/play", (req, res) => {
  res.render("play");
});

module.exports = router;
