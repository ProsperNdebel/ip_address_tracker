"use strict";

let APIURL =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_YrX0DcidsARNDJH5CzCQAJpprIZMJ&ipAddress=";

//selecting the necessary DOM elememts
const form = document.querySelector(".text-form");
const formInput = document.getElementById("text-field");
const infoContainer = document.querySelector(".info-container");

// creating the map
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// creatting the html to display in the description section
function createHTML(data) {
  const editedHTML = `<div class="addres">
    <p class="ip-adders">IP ADRESS</p>
    <h2 class="address">${data.ip}</h2>
  </div>
  <div class="addres">
    <p class="ip-adders">LOCATION</p>
    <h2 class="address">
      ${data.location.city}, ${data.location.region}<br />
      ${data.location.postalCode}
    </h2>
  </div>
  <div class="addres">
    <p class="ip-adders">TIMEZONE</p>
    <h2 class="address">UTC${data.location.timezone}</h2>
  </div>
  <div class="addres">
    <p class="ip-adders">ISP</p>
    <h2 class="address">
      ${data.isp}
    </h2>
  </div>`;
  return editedHTML;
}
//L.marker([yCoord, xCoord]).addTo(map)
//this shows the location of the ip address by marking it on the map
function showLocation(xCoord, yCoord) {
  var marker = L.marker([yCoord, xCoord], 40).addTo(map);
  marker
    .bindPopup("<b>This ip address</b><br><b>is located here</b>")
    .openPopup();
}

// this function gets the ipaddress's infor
function getLocation(ipaddress) {
  fetch(ipaddress)
    .then((res) => {
      if (!res.ok) {
        throw Error("NO SUCH ADDRESS EXISTS");
      }
      return res.json();
    })
    .then((data) => {
      // from here I can call a function that inserts the html into the div
      const insertIntoHTML = createHTML(data);
      infoContainer.innerHTML = insertIntoHTML;
      //destructuring the object created
      const { longitude: x, latitude: y } = {
        latitude: data.location.lat,
        longitude: data.location.lng,
      };
      showLocation(x, y);
    });
}

const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", (e) => {
  //prevents the form from submitting itself and refreshing the browser
  e.preventDefault();
  let enteredAddress = formInput.value;
  APIURL = APIURL + enteredAddress;

  getLocation(APIURL);

  formInput.value = "";
  //after all this I need a way to reset the API url
  APIURL =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_YrX0DcidsARNDJH5CzCQAJpprIZMJ&ipAddress=";
});

// var popup = L.popup()
//   .setLatLng([51.513, -0.09])
//   .setContent("I am a standalone popup.")
//   .openOn(map);

//this gives the latititude and longitude of the point clicked on the map
function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on("click", onMapClick);
