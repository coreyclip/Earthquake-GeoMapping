
// earthquake geojson
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
//var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" + "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";


// API link to fetch our geojson data of earthquakes
var APIlink_plates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// define a function to scale the magnitdue
function markerSize(magnitude) {
    return magnitude * 3;
};

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
   console.log(data);
   createFeatures(data.features);
  });

  // function for color based on magnitude
  function adjustColor(magnitude){
    let GreenScaler = 300 - Math.round(magnitude * 40)
    return `rgb(62, ${GreenScaler}, 88)`
  }

function createFeatures(earthquakeData){
    
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
      "</h3><hr><p>" + "Magnitude: " + feature.properties.mag + "</p>");
    
        };

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(geoJsonPoint, latlng){
        return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
    },

    style: function (geoJsonFeature) {
        return {
            fillColor: adjustColor(geoJsonFeature.properties.mag),
            fillOpacity: 0.7,
            weight: 0.1,
            color: 'black'

        }
    },

    onEachFeature: onEachFeature,
    
  });

  // Sending our earthquakes layer to the createMap function
createMap(earthquakes);

};

// create a layer group for faultlines




function createMap(earthquakes){
    console.log('creating map...')

    let accessToken = "access_token=pk.eyJ1IjoiYnJ5YW5sb3dlIiwiYSI6ImNqZ3p2bThxNTA4M3Yyd25vdGQxY2xqeXQifQ.URpIhwM_YJcAJYOyzbZEdQ"

    let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" + 
            accessToken);
    
    let darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" + 
            accessToken);
    
    let highContrastMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" + 
            accessToken);
    
    let SatelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" + 
            accessToken);



    let baseMaps = {
        "Street Map": streetmap,
        "Dark map": darkMap,
        "Satellite map": SatelliteMap,
        "High Contrast map": highContrastMap
    };

    console.log("baseMaps", baseMaps)
    
    let overlayMaps = {
        Earthquakes: earthquakes, 
        
    };
    console.log('overlayMaps', overlayMaps)

    // Create a map object
    let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });

    // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

};





