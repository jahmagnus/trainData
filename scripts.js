const apiKey = "54bdf4f550b10116a1c4b9863f3652f4";
const appID = "b74798d6";
const stationCRS = "WHP"; //west hampstead thameslink
const destinationCRS = "STP"; //St Pancras
const baseURL = "https://transportapi.com/v3/uk/train/station/WHP/live.json?";
document.addEventListener('DOMContentLoaded', getResults());


function getResults(){

    fetch(`${baseURL}calling_at=${destinationCRS}&app_id=${appID}&app_key=${apiKey}`).then(trainData =>{
        return trainData.json();
    }).then(displayResults);
}



function displayResults(trainData){
    console.log(trainData);
    let arrayLength = trainData.departures.all.length;
    let dataArray = [];

    //pluck the relevent values from the departures array in the JSON data and turn into an object called service
    for(i = 0; i < arrayLength ;i++){
        let service = {destination: `${trainData.departures.all[i].destination_name}`
    , departureTime: `${trainData.departures.all[i].aimed_departure_time}`
    , statusValue: `${trainData.departures.all[i].status}`
    , expectedDeparture: `${trainData.departures.all[i].expected_departure_time}`}
        
        //add the service object to the dataArray
        dataArray.push(service);
    }

    //loop through data array objects and attach relevent data to nodes
    for(service in dataArray){
        
        let serviceNode = document.createElement('div'); //this will be the parent node for newly created service from data array
                
            let destinationNode = document.createElement('div');
                destinationNode.innerHTML = dataArray[service].destination;
                serviceNode.appendChild(destinationNode);

                      
                        
           
           
            let departureNode = document.createElement('div');
                departureNode.innerHTML = dataArray[service].departureTime;
                serviceNode.appendChild(departureNode);


            let statusNode = document.createElement('div');
                statusNode.innerHTML = dataArray[service].statusValue;
                serviceNode.appendChild(statusNode);
            
            let expectedDepartureNode = document.createElement('div');
                expectedDepartureNode.innerHTML = `Expected: ${dataArray[service].expectedDeparture}`;
                serviceNode.appendChild(expectedDepartureNode);
            
            
            document.querySelector('.services-wh').appendChild(serviceNode);

            serviceNode.style.margin = '1rem';
            serviceNode.style.backgroundColor = 'green';

            if(statusNode.innerHTML == "LATE"){
                serviceNode.style.backgroundColor = "red";
            }

    }    

    //styling

    
    
   
    //This code is for the testing of access to the transport web service

    //get destination name
    // let dest = document.querySelector('.services-wh .destination-0');
    // dest.innerText = trainData.departures.all[0].destination_name;

    //get departure time
    // let time =document.querySelector('.services-wh .time-0');
    // time.innerText = trainData.departures.all[0].aimed_departure_time;

    //get service status - is train on time or running late/cancelled?
    // let status = document.querySelector('.services-wh .service-status-0');
    // status.innerHTML = `<span>Status: </span>${trainData.departures.all[0].status}`;

    //expected departure time
    // let expected = document.querySelector('.services-wh .expected-0');
    // expected.innerHTML = `<span>Expected: </span>${trainData.departures.all[0].expected_departure_time}`;
}



