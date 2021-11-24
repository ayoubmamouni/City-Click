const selectCity = document.querySelector("#city");
const submitBtn = document.querySelector(".submit-btn");

const sendCityToTheServer = async (theCity) => {
  const res = await fetch("/city", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ cityName: theCity }),
  });
  const data = await res.json();
  console.log(data);
  let userDetails = {
    userCity: data.userCityIs,
    userClicks: 0,
  };
  await localStorage.setItem("userCity", JSON.stringify(userDetails));
  document.location.href = "/";
};

submitBtn.addEventListener("click", () => {
  sendCityToTheServer(selectCity.value);
});

//check if user is already chosen his city
const getUserCity = localStorage.getItem("userCity");

async function userHasCity(theUserCity) {
  const play = await fetch("/playTheGame", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ city: theUserCity }),
  });
  const response = await play.json();
  document.location.href = response.redirect;
  console.log(response);
}

if (getUserCity) {
  userHasCity(getUserCity);
}
// console.log(getUserCity);
