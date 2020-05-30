// const p=require("./priority-js");

var queue=new PriorityQueue();
var global=this;
function algo(id,city1,street1,city2,street2,zone,category){
    const threshold=20;
    var zone_priority={
        red:{
            medical:7,
            food:3,
            other:1,
        },
        orange:{
           medical:5,
          food:4,
             other:2	
        },
        normal:{
            medical:3,
            food:3,
            other:2
        }
    }

// we are using MapQuest's Nominatim service
let latlng1,latlng2;
var sf=this;
var geocode ='https://nominatim.openstreetmap.org/search?q='+city1+',+'+street1+'&format=json&polygon=1&addressdetails=1'

// use jQuery to call the API and get the JSON results

$.getJSON(geocode, function(data) {
  // get lat + lon from first match
  this.latlng1 = [data[0].lat, data[0].lon]
  console.log(latlng1);
});
var geocode ='https://nominatim.openstreetmap.org/search?q='+city2+',+'+street2+'&format=json&polygon=1&addressdetails=1'

// use jQuery to call the API and get the JSON results

$.getJSON(geocode, function(data) {
  // get lat + lon from first match
  this.latlng2 = [data[0].lat, data[0].lon]
  console.log(latlng2);
});
console.log(this.latlng2);

    window.onload = function() {

        var ghRouting = new GraphHopper.Routing({
          key: "d4ce0060-bfe8-4e77-843d-1172d1438be1",
          vehicle: "car",
          elevation: false
        });
        console.log(global.latlng1);
        console.log(sf.latlng2);
        ghRouting.addPoint(new GHInput(global.latlng1[0], global.latlng1[1]));
        ghRouting.addPoint(new GHInput(global.latlng2[0],global.latlng2[1]));
    
        ghRouting.doRequest()
          .then(function(json) {
            // Add your own result handling here
            console.log(json);
          })
          .catch(function(err) {
            console.error(err.message);
          });
    
    
      };
      distance=
    distace_priority=0;
    
    if(distance<100){
        distance_priority=50
    }
    else if(100<distance<500){
        distance_priority=30
    }
    else{
        distace_priority=10
    }
    final_priority=distance_priority*zone_priority[zone][category];
    console.log(final_priority)
    if(final_priority<threshold){
        
    }
    if(final_priority>threshold){
        queue.queue(final_priority);
        console.log("priority added");
    }
}   
algo(1,"delhi","","bhopal","",'red','medical');