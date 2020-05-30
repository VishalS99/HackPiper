function algo() {
  const threshold = 20;
  var zone_priority = {
    red: {
      medical: 7,
      food: 3,
      others: 1,
    },
    orange: {
      medical: 5,
      food: 4,
      others: 2,
    },
    normal: {
      medical: 3,
      food: 3,
      others: 2,
    },
  };

  distance = 300; //some function to get nearest warehouse distance from billing address.
  zone = "red"; //get zone from billing address
  category = "medical"; //get item category
  distace_priority = 0;

  if (distance < 100) {
    distance_priority = 50;
  } else if (100 < distance < 500) {
    distance_priority = 30;
  } else {
    distace_priority = 10;
  }
  final_priority = distance_priority * zone_priority[zone][category];
  alert(final_priority);
  if (final_priority < threshold) {
    alert("Cannot deliver");
  }
  if (final_priority > threshold) {
    alert("Order booked");
  }
}
