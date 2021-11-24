const router = require("express").Router();
const City = require("../db/click");
const axios = require("axios");
router.get("/", async (req, res) => {
  let citiesNames = [];
  try {
    const data = await axios
      .get(process.env.API_URL, {
        headers: {
          "X-Parse-Application-Id": process.env.APP_ID, // This is an application id
          "X-Parse-REST-API-Key": process.env.API_KEY, // This is a REST API key
        },
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });

    let citiesData = await data.data.results;
    await citiesData.forEach((city) => {
      citiesNames.push(city.name);
    });
    let moroccoCities = await citiesNames.sort();
    await res.render("home", { cities: moroccoCities });

    // let moroccoCities = await citiesNames.sort();
    // res.render("home", { cities: moroccoCities });
  } catch (err) {
    let errorMessage =
      "Oops!! we can't get the cities from another server, maybe you have slow internet connection, Try again if you want ;)";
    res.json({ error: errorMessage });
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
