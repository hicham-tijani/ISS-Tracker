/* Displaying position of ISS */

const myMap = L.map('ISSmap').setView([51.5074, -0.1278], 5);
const myMarker = L.marker([0, 0]).addTo(myMap).bindPopup(`<b>Hello, I am the ISS!</b><br>Latitude: ${51.5074}<br>Longitude: ${-0.1278}`, {autoPan: false}).openPopup();
const myCircle = L.circle([0, 0], {color: '#2d3142', fillColor: '#22333b', fillOpacity: 0.5, radius: 10000}).addTo(myMap);
const polyLines = L.polyline([], {color: "teal"}).addTo(myMap);

function setup() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/dark-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2lyZm91cmllciIsImEiOiJja2dheG93d28wYm0wMnpwZHd4eWc3MmFuIn0.zyjkFt9TN-jvU2isE28xrg'
    }).addTo(myMap);
}


async function getISS() {
    const ISS_API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
    const response = await fetch(ISS_API_URL);
    return await response.json(); 
}

async function update() {
    const {latitude, longitude} = await getISS();
    myMarker.setLatLng([latitude, longitude]);
    myCircle.setLatLng([latitude, longitude]);
    myMarker.setPopupContent(`<b>Hello, I am the ISS!</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}<br> <img class="gif" src="assets/space-station.gif">`);
    
    if (document.getElementById("centerOnISS").checked) {
        myMap.flyTo([latitude, longitude]);
    }

    polyLines.addLatLng([latitude, longitude]);
}

document.getElementById("displayPath").oninput = () => {
    if (document.getElementById("displayPath").checked) {
        polyLines.addTo(myMap);
    }  else {
        polyLines.remove();
    }
}

setup();
update();
setInterval(update, 2000);


// button active
function activeText() {
    let header = document.querySelector('.be-active')
    header.classList.toggle('active');
};

function activeText1() {
    let header = document.querySelector('.be-active1')
    header.classList.toggle('active');
};