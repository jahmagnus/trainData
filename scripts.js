//no API key or ID in this version
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

    //get destination name
    let dest = document.querySelector('.services-wh .destination-0');
    dest.innerText = trainData.departures.all[0].destination_name;

    //get departure time
    let time =document.querySelector('.services-wh .time-0');
    time.innerText =trainData.departures.all[0].aimed_departure_time;

    //get service status - is train on time or running late/cancelled?
    let status = document.querySelector('.services-wh .service-status-0');
    status.innerHTML = `<span>Status: </span>${trainData.departures.all[0].status}`;

    //expected departure time
    let expected = document.querySelector('.services-wh .expected-0');
    expected.innerHTML = `<span>Expected: </span>${trainData.departures.all[0].expected_departure_time}`;
     

}