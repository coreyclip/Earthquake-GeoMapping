let mapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoiY29yZXljbGlwIiwiYSI6ImNqaDFhaTBnejAxczMyd2xpamI0dXV0Y2MifQ.kEHm4wSEA0hhGmCBXvjPCw";

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
   console.log(data);
   createFeatures(data.features);
  });


function createFeatures(earthquakeData){
    
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  };

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

};

// Create a map object
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer(mapBox).addTo(myMap);



