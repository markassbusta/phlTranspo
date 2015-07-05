/**
 * Add polygons from geojson on the map
 *
 * In addition to points, leaflet can display
 * polygons from geojson
 */

// Center on Philadelphia
var map = L.map('basic-map').setView([39.952299, -75.163256], 11);

/**
 * Add OpenStreetMap tiles to the map
 */
var OpenMapSurfer_Grayscale = L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}', {
        maxZoom: 19,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Parks geojson URL
var parksURL = "/static/data/parksPoly.geojson"
//Parks Style Function

function styleFunction(){
return {color: "green"};
        }


function newStyle(){
geoJsonLayer.setStyle({color:"blue"});
}
function oldStyle(){
geoJsonLayer.setStyle({color:"green"});
}

var geoJsonLayer = L.geoJson(parksURL,{style:styleFunction}).addTo(map);
geoJsonLayer.on('mouseover',newStyle);
geoJsonLayer.on('mouseout',function(e){geoJsonLayer.resetStyle(e.target);});
