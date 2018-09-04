# EarthQuake GeoMapping

In this project we utilize the javascript library (leaflet)[https://leafletjs.com/] to create an interactive web-based map showing us 
historical data on earthquakes collected by the US Geological Survey. 

## Demoing the app

First you'll need a mapbox api key. We use mapbox to create the tiles that give us our map overlays
Get an API key (here)[https://www.mapbox.com/help/how-access-tokens-work/]

Then before running the app place your api key in the variable in **logic.js** at line 132
```javascript
    let accessToken = "access_token=...."
```

to demo this app, you'll want to open a terminal in the downloaded repo and run the command 
```bash 
python -m http.server
```
If you're running python 2.X
```bash
# If your Python version is 2.X
python -m SimpleHTTPServer
```

And in the open webbrowser navigate to the url: http://localhost:8000/
if the map page doesn't render then just click on the folder **GeoMapping** and it should render then

# index.html

Leaflet js works by targeting elements by id or class. Our html is simply just a <div> with the id: "map"
  
But do note the scrips being imported in the <head>
  
```html
<head>
  <meta charset="utf-8">
  <title>Markers</title>

  <!-- Leaflet CSS & JS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- Latest compiled and minified CSS & JS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


  <!-- Our CSS -->
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
```

# logic.js 


