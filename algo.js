function algo(id,distance,zone,category){
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
    console.log()
    if(final_priority<threshold){
        alert("Cannot deliver");
    }
    if(final_priority>threshold){
        //add to priority queue.
        alert("Order booked");
    }
}
    