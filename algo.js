// const p=require("./priority-js");

var queue = new PriorityQueue();
var global = this;
function algo(
  id,
  city1,
  street1,
  city2,
  street2,
  city3,
  street3,
  zone,
  category
) {
  const threshold = 20;
  var zone_priority = {
    red: {
      medical: 7,
      food: 3,
      other: 1,
    },
    orange: {
      medical: 5,
      food: 4,
      other: 2,
    },
    normal: {
      medical: 3,
      food: 3,
      other: 2,
    },
  };

  // we are using MapQuest's Nominatim service
  this.latlng1 = [];
  this.latlng2 = [];
  this.latlng3 = [];
  // var sf=this;

  // use jQuery to call the API and get the JSON results
  var geocode =
    "https://nominatim.openstreetmap.org/search?q=" +
    city1 +
    ",+" +
    street1 +
    "&format=json&polygon=1&addressdetails=1";

  $.getJSON(geocode).done(function (data) {
    var geocode =
      "https://nominatim.openstreetmap.org/search?q=" +
      city2 +
      ",+" +
      street2 +
      "&format=json&polygon=1&addressdetails=1";
    this.latlng1 = [data[0].lat, data[0].lon];
    console.log(this.latlng1);
    sf1 = this;
    $.getJSON(geocode).done(function (data) {
      var geocode =
        "https://nominatim.openstreetmap.org/search?q=" +
        city3 +
        ",+" +
        street3 +
        "&format=json&polygon=1&addressdetails=1";
      this.latlng2 = [data[0].lat, data[0].lon];
      console.log(this.latlng2);
      sf2 = this;
      $.getJSON(geocode).done(function (data) {
        this.latlng3 = [data[0].lat, data[0].lon];
        sf3 = this;
        console.log(sf1.latlng1);
        console.log(sf2.latlng2);
        console.log(sf3.latlng3);
        onload(sf1, sf2, sf3);
      });
    });
  });

  function onload(sf1, sf2, sf3) {
    var ghRouting = new GraphHopper.Routing({
      key: "d4ce0060-bfe8-4e77-843d-1172d1438be1",
      vehicle: "car",
      elevation: false,
    });
    console.log(sf1.latlng1);
    console.log(sf2.latlng2);
    console.log(sf3.latlng3);
    ghRouting.addPoint(new GHInput(sf1.latlng1[0], sf1.latlng1[1]));
    ghRouting.addPoint(new GHInput(sf2.latlng2[0], sf2.latlng2[1]));
    ghRouting.addPoint(new GHInput(sf3.latlng3[0], sf3.latlng3[1]));

    ghRouting
      .doRequest()
      .then(function (json) {
        // Add your own result handling here
        // myjson=json;

        console.log(json);
        distance = json.paths[0].distance;
        console.log(distance);
        distace_priority = 0;

        if (distance < 100) {
          distance_priority = 50;
        } else if (100 < distance < 500) {
          distance_priority = 30;
        } else {
          distace_priority = 10;
        }
        final_priority = distance_priority * zone_priority[zone][category];
        console.log(final_priority);
        if (final_priority < threshold) {
        }
        if (final_priority > threshold) {
          queue.queue(final_priority);
          console.log("priority added");
        }
        return json;
      })
      .catch(function (err) {
        console.error(err.message);
      });
  }
  // use jQuery to call the API and get the JSON results
}
algo(1, "delhi", "", "bhopal", "", "mumbai", "", "red", "medical");
