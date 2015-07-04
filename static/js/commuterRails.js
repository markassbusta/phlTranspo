
// Center on Philadelphia
var map = L.map('basic-map').setView([39.952299, -75.163256], 11);

/**
 * Add OpenStreetMap tiles to the map
 */
L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> |' +
        ' Neighborhoods obtained from <a href="https://github.com/azavea/geo-data">' +
        'Azavea</a>'
}).addTo(map);


// Add MFLine Shapefile	
var mfLineURL = "/static/data/MFLine.zip"

var mfLine = new L.Shapefile('mfLineURL');
mfline.addTo(map);

var broadURL = "/static/data/Broad.zip"

var broad = new L.Shapefile('broadURL');
broad.addTo(map);

// Commuter Rail Stations geojson URL

