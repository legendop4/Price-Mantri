function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBath");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1;
}
function getBhkValue() {
  var uiBhk = document.getElementsByName("uiBHK");
  for (var i in uiBhk) {
    if (uiBhk[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1;
}
function onClickEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBhkValue();
  var Bathrooms = getBathValue();
  var location = document.getElementById("uiLocation");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: Bathrooms,
      location: location.value,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function (data, status) {
    console.log("got response for Location Names");
    if (data) {
      var locations = data.locations;
      var uiLocation = document.getElementById("uiLocation");
      $("#uiLocation").empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $("#uiLocation").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
