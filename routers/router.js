const router = require("express").Router();
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
  } catch (err) {
    let errorMessage = "فشل السيرفر في تحميل اسماء المدن";
    res.json({ error: errorMessage });
  }
});
module.exports = router;
